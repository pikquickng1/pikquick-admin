/**
 * API configuration. Base URL from env; no global prefix.
 * Set NEXT_PUBLIC_API_BASE_URL in .env.local (e.g. https://api.pikquick.com)
 */
const API_BASE_URL =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001")
    : (process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.API_BASE_URL ?? "http://localhost:3001");

export const apiConfig = {
  baseURL: API_BASE_URL.replace(/\/$/, ""),
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
  },
} as const;
