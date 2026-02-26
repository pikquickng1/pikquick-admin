"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/dashboard";

/**
 * Root page: redirect to dashboard if authenticated admin, otherwise to login.
 * Keeps all app pages behind auth; only /login is public.
 */
export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      router.replace(DASHBOARD_PATH);
    } else {
      router.replace(LOGIN_PATH);
    }
  }, [isAuthenticated, isAdmin, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
