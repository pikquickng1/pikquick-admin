import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import { apiConfig } from "./config";

export type GetAccessToken = () => string | null;

let getAccessToken: GetAccessToken = () => null;

/**
 * Register how to obtain the access token (e.g. from AuthContext).
 * Call this once when the app mounts (e.g. in a provider).
 */
export function setTokenGetter(fn: GetAccessToken) {
  getAccessToken = fn;
}

/** Called on 401 to refresh tokens. Returns new access token or null if refresh failed. */
export type RefreshTokensFn = () => Promise<string | null>;

let refreshTokensFn: RefreshTokensFn | null = null;

/**
 * Register the refresh-token handler. Call from the app (e.g. in providers) so that
 * on 401 the client can try to refresh and retry the request.
 */
export function setRefreshHandler(fn: RefreshTokensFn | null) {
  refreshTokensFn = fn;
}

let refreshPromise: Promise<string | null> | null = null;

async function tryRefresh(): Promise<string | null> {
  if (!refreshTokensFn) return null;
  if (refreshPromise) return refreshPromise;
  refreshPromise = refreshTokensFn();
  try {
    const token = await refreshPromise;
    return token;
  } finally {
    refreshPromise = null;
  }
}

/**
 * Proactively run a token refresh (used by the client-side expiry watcher).
 * Returns the new access token, or null if refresh failed / is unavailable.
 */
export async function runTokenRefresh(): Promise<string | null> {
  return tryRefresh();
}

/** True for the auth endpoints that must NOT trigger the 401 refresh/retry loop. */
function isAuthEndpoint(url?: string): boolean {
  if (!url) return false;
  return url.includes("/auth/login") || url.includes("/auth/refresh-token");
}

/** Fire the global "logged out" signal so the app can clear state + redirect. */
export function emitUnauthorized(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:unauthorized"));
  }
}

function createClient(): AxiosInstance {
  const client = axios.create({
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    headers: apiConfig.headers,
  });

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      // Backend wraps success responses as { success: true, data: <payload>, timestamp }.
      // Some controllers double-wrap (also returning { success: true, data: ... } at the
      // next layer). Recursively unwrap until the payload is no longer envelope-shaped
      // so callers always receive the real payload regardless of how many wrappers the
      // controller added.
      response.data = unwrapEnvelope(response.data);
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retried?: boolean;
      };
      const status = error.response?.status;
      const authEndpoint = isAuthEndpoint(originalRequest?.url);

      // Try a single refresh + retry on 401 — but NEVER for the auth endpoints
      // themselves. Refreshing on a failed /auth/refresh-token call would
      // re-enter this interceptor and await its own in-flight promise (deadlock),
      // which is why expired sessions previously hung instead of logging out.
      if (
        status === 401 &&
        originalRequest &&
        !originalRequest._retried &&
        !authEndpoint
      ) {
        originalRequest._retried = true;
        const newToken = await tryRefresh();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        }
      }

      // A 401 that we could not recover from means the session is dead. Signal a
      // logout — except for a failed login attempt (the user is already on the
      // login page and should just see the error).
      if (
        status === 401 &&
        !originalRequest?.url?.includes("/auth/login")
      ) {
        emitUnauthorized();
      }
      return Promise.reject(error);
    }
  );

  return client;
}

export const apiClient = createClient();

/**
 * Recursively strips `{ success: true, data: ... }` envelopes.
 *
 * The backend has historically wrapped controller responses in a success
 * envelope (`{ success: true, data: <payload>, timestamp }`). A handful
 * of controllers double-wrap (their body is itself `{ success, data, … }`).
 * This helper unwraps as long as the value looks like an envelope, so all
 * services receive the same shape.
 *
 * Only unwraps when `success === true` to avoid stripping error envelopes
 * (those use `statusCode` / `message`, not `success`).
 */
function unwrapEnvelope(value: unknown): unknown {
  const MAX_DEPTH = 5;
  let current = value;
  for (let i = 0; i < MAX_DEPTH; i++) {
    if (
      current !== null &&
      typeof current === "object" &&
      (current as { success?: unknown }).success === true &&
      "data" in (current as Record<string, unknown>)
    ) {
      current = (current as { data: unknown }).data;
      continue;
    }
    break;
  }
  return current;
}
