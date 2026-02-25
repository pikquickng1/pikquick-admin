"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { setTokenGetter } from "@/lib/api/client";
import type { UserRole } from "@/lib/types";

const AUTH_STORAGE_KEY = "pikquick_admin_auth";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  status: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthContextValue extends AuthState {
  login: (accessToken: string, refreshToken: string, user: AuthUser) => void;
  logout: () => void;
  setUser: (user: AuthUser | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredAuth(): AuthState {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as {
      accessToken: string;
      refreshToken?: string;
      user: AuthUser;
    };
    const { accessToken, user } = parsed;
    const refreshToken = parsed.refreshToken ?? null;
    if (!accessToken || !user) return initialState;
    const isAdmin = user.role === "admin";
    return {
      accessToken,
      refreshToken,
      user,
      isAuthenticated: true,
      isAdmin,
    };
  } catch {
    return initialState;
  }
}

function persistAuth(
  accessToken: string,
  refreshToken: string,
  user: AuthUser
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ accessToken, refreshToken, user })
    );
  } catch {
    // ignore
  }
}

function clearStoredAuth() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(loadStoredAuth);

  const login = useCallback(
    (accessToken: string, refreshToken: string, user: AuthUser) => {
      const isAdmin = user.role === "admin";
      setState({
        accessToken,
        refreshToken,
        user,
        isAuthenticated: true,
        isAdmin,
      });
      persistAuth(accessToken, refreshToken, user);
      setTokenGetter(() => accessToken);
    },
    []
  );

  const setTokens = useCallback((accessToken: string, refreshToken: string) => {
    setState((prev) => {
      if (!prev.user) return prev;
      return { ...prev, accessToken, refreshToken };
    });
    setTokenGetter(() => accessToken);
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed.accessToken = accessToken;
          parsed.refreshToken = refreshToken;
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(parsed));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const logout = useCallback(() => {
    setState(initialState);
    clearStoredAuth();
    setTokenGetter(() => null);
  }, []);

  const setUser = useCallback((user: AuthUser | null) => {
    setState((prev) => {
      if (!prev.accessToken) return prev;
      const next = { ...prev, user };
      if (user) next.isAdmin = user.role === "admin";
      return next;
    });
    if (user && typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(AUTH_STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          parsed.user = user;
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(parsed));
        }
      } catch {
        // ignore
      }
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login,
      logout,
      setUser,
      setTokens,
    }),
    [state, login, logout, setUser, setTokens]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export function useOptionalAuth(): AuthContextValue | null {
  return useContext(AuthContext);
}
