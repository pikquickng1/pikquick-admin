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
      // Backend wraps success responses as { success: true, data: <payload>, timestamp }
      const body = response.data;
      if (body && body.success === true && "data" in body) {
        response.data = body.data;
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retried?: boolean;
      };

      if (error.response?.status === 401 && originalRequest && !originalRequest._retried) {
        originalRequest._retried = true;
        const newToken = await tryRefresh();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return client(originalRequest);
        }
      }

      if (error.response?.status === 401 && typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("auth:unauthorized"));
      }
      return Promise.reject(error);
    }
  );

  return client;
}

export const apiClient = createClient();
