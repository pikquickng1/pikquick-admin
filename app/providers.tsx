"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { AuthProvider, useOptionalAuth } from "@/lib/context/AuthContext";
import {
  setTokenGetter,
  setRefreshHandler,
  runTokenRefresh,
  emitUnauthorized,
} from "@/lib/api/client";
import { queryClient } from "@/lib/query/query-client";
import { authService } from "@/lib/services";
import { isTokenExpired } from "@/lib/utils/jwt";

/** How often to proactively verify the access token has not expired. */
const EXPIRY_CHECK_INTERVAL_MS = 30_000;

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

    // Proactively watch the access token's `exp` client-side so an expired
    // session is cleared even when the user is idle or only hits endpoints that
    // crash with 500 (which never produce the 401 that drives the reactive
    // logout path). When the access token is expired we attempt a refresh; if
    // that fails (refresh token also expired/invalid) we force a logout.
    let cancelled = false;

    const check = async () => {
      if (cancelled) return;
      const token = auth?.accessToken;
      if (!token) return;
      if (!isTokenExpired(token)) return;

      const newToken = await runTokenRefresh();
      if (!newToken && !cancelled) {
        emitUnauthorized();
      }
    };

    void check();
    const intervalId = window.setInterval(() => void check(), EXPIRY_CHECK_INTERVAL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    window.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
      window.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [auth, auth?.isAuthenticated, auth?.accessToken]);

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
