"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { AuthProvider, useOptionalAuth } from "@/lib/context/AuthContext";
import { setTokenGetter, setRefreshHandler } from "@/lib/api/client";
import { queryClient } from "@/lib/query/query-client";
import { authService } from "@/lib/services";

function TokenSync() {
  const auth = useOptionalAuth();
  const refreshTokenRef = useRef<string | null>(null);
  const setTokensRef = useRef<((access: string, refresh: string) => void) | null>(null);

  refreshTokenRef.current = auth?.refreshToken ?? null;
  setTokensRef.current = auth?.setTokens ?? null;

  useEffect(() => {
    setTokenGetter(() => auth?.accessToken ?? null);
  }, [auth?.accessToken]);

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
    const handleUnauthorized = () => {
      auth?.logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [auth?.logout]);

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
