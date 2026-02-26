"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const LOGIN_PATH = "/login";

interface RequireAuthProps {
  children: ReactNode;
}

/**
 * Protects dashboard routes: redirects to /login if not authenticated or not admin.
 * Renders children only when user is authenticated and has admin role.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      const redirect = `${LOGIN_PATH}?redirect=${encodeURIComponent(pathname ?? "/dashboard")}`;
      router.replace(redirect);
    }
  }, [isAuthenticated, isAdmin, router, pathname]);

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
