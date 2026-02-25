import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
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
    (error) => {
      if (error.response?.status === 401) {
        // Optional: trigger logout / redirect to login
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("auth:unauthorized"));
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
}

export const apiClient = createClient();
