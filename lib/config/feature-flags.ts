/**
 * Feature flags driven by env vars at build time.
 * Defaults to safe production values; flip locally for offline work.
 */

const flag = (envValue: string | undefined, fallback: boolean) =>
  envValue === undefined ? fallback : envValue === "true" || envValue === "1";

/**
 * When true, list/detail screens in users/tasks/finance may serve mock data
 * instead of calling the backend. Useful for offline UI work and demos.
 *
 * Set NEXT_PUBLIC_USE_MOCKS=true in .env.local to enable.
 */
export const USE_MOCKS = flag(
  process.env.NEXT_PUBLIC_USE_MOCKS,
  false,
);

/** Default payment gateway used for receipt fallbacks. */
export const PAYMENT_GATEWAY = "Paystack" as const;

/** Maximum rating value for the review UI (5-star system). */
export const MAX_RATING = 5;

/** Currency symbol displayed in labels (paired with formatNgn for values). */
export const CURRENCY_SYMBOL = "\u20A6" as const;

/**
 * Background color for the unread-notification badge in the top header.
 * Centralized here so future re-skins don't have to grep for `bg-[#FF5C5C]`.
 * Pair with `text-white` in usage.
 */
export const UNREAD_BADGE_BG_CLASS = "bg-red-500" as const;
