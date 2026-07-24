/**
 * Minimal JWT helpers for client-side expiry checks. These never verify the
 * signature (the server does that) — they only read the `exp` claim so the app
 * can proactively refresh or log out instead of waiting for a request to 401.
 */

interface JwtPayload {
  exp?: number; // seconds since epoch
  [key: string]: unknown;
}

function decodePayload(token: string): JwtPayload | null {
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const json =
      typeof atob === "function"
        ? atob(padded)
        : Buffer.from(padded, "base64").toString("binary");
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

/** Returns the token's expiry time in ms since epoch, or null if unknown. */
export function getTokenExpiryMs(token: string | null | undefined): number | null {
  if (!token) return null;
  const payload = decodePayload(token);
  if (!payload?.exp) return null;
  return payload.exp * 1000;
}

/**
 * True when the token is missing, unreadable, or expires within `skewMs`.
 * A readable-but-no-exp token is treated as NOT expired (fail open) so we don't
 * log out on non-JWT/opaque tokens.
 */
export function isTokenExpired(
  token: string | null | undefined,
  skewMs = 5000,
): boolean {
  if (!token) return true;
  const expiry = getTokenExpiryMs(token);
  if (expiry === null) return false;
  return Date.now() >= expiry - skewMs;
}
