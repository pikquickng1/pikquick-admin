"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { AuthProvider, useOptionalAuth } from "@/lib/context/AuthContext";
import { setTokenGetter, setRefreshHandler, apiClient } from "@/lib/api/client";
import { queryClient } from "@/lib/query/query-client";
import { authService } from "@/lib/services";

function TokenSync() {
  const auth = useOptionalAuth();
  const refreshTokenRef = useRef<string | null>(null);
  const setTokensRef = useRef<((access: string, refresh: string) => void) | null>(null);

  

  useEffect(() => {
    setTokenGetter(() => auth?.accessToken ?? null);
    refreshTokenRef.current = auth?.refreshToken ?? null;
  setTokensRef.current = auth?.setTokens ?? null;
  }, [auth, auth?.accessToken, auth?.refreshToken,auth?.setTokens]);

  useEffect(() => {
    setRefreshHandler(async () => {
      const refreshToken = refreshTokenRef.current;
      const setTokens = setTokensRef.current;
      if (!refreshToken || !setTokens) return null;
      try {
        const { access_token, refresh_token } = await authService.refresh(refreshToken);
        setTokens(access_token, refresh_token);
        return access_token;
      } catch {
        return null;
      }
    });
    return () => setRefreshHandler(null);
  }, []);

  useEffect(() => {
    if (!auth?.isAuthenticated) return;
    // Verify the stored token is valid on mount using a reliable endpoint.
    // If the token is expired the server returns 401, the interceptor triggers
    // refresh, and if that also fails auth:unauthorized fires → logout.
    // This catches expired tokens even when other pages only hit endpoints that
    // crash with 500 (which never trigger the 401 refresh path).
    apiClient.get("/admin/profile").catch(() => {
      // Non-401 errors (e.g., 500 server crashes) are ignored here.
      // Auth failures are handled by the response interceptor in client.ts.
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- intentionally runs once on mount

  useEffect(() => {
    const handleUnauthorized = () => {
      auth?.logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [auth, auth?.logout]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TokenSync />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}
