/**
 * Auth service. Backend: POST /auth/login, POST /auth/refresh-token.
 * Success responses are wrapped { success, data }; client unwraps in interceptor.
 */

import { apiClient } from "@/lib/api/client";
import type { AuthUser } from "@/lib/context/AuthContext";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export const authService = {
  login(credentials: LoginCredentials): Promise<LoginResponse> {
    return apiClient
      .post<LoginResponse>("/auth/login", credentials)
      .then((r) => r.data);
  },

  refresh(refreshToken: string): Promise<RefreshResponse> {
    return apiClient
      .post<RefreshResponse>("/auth/refresh-token", { refresh_token: refreshToken })
      .then((r) => r.data);
  },
};
