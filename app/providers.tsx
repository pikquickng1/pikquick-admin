"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AuthProvider, useOptionalAuth } from "@/lib/context/AuthContext";
import { setTokenGetter } from "@/lib/api/client";
import { queryClient } from "@/lib/query/query-client";

function TokenSync() {
  const auth = useOptionalAuth();
  useEffect(() => {
    setTokenGetter(() => auth?.accessToken ?? null);
  }, [auth?.accessToken]);
  return null;
}

function InnerProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TokenSync />
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <InnerProviders>{children}</InnerProviders>;
}
