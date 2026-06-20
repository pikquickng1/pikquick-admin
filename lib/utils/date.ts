/**
 * Date helpers. Single locale across the admin app.
 *
 * NOTE: previously components mixed `en-NG` and `en-US` — pick one (en-NG) and
 * centralize so dates render consistently.
 */

export const LOCALE = "en-NG" as const;

export function formatDate(value: string | number | Date | null | undefined): string {
  if (value === null || value === undefined || value === "") return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(d);
}

export function formatDateTime(
  value: string | number | Date | null | undefined,
): string {
  if (value === null || value === undefined || value === "") return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function formatTime(value: string | number | Date | null | undefined): string {
  if (value === null || value === undefined || value === "") return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

const RELATIVE_THRESHOLDS = [
  { unit: "year", seconds: 60 * 60 * 24 * 365 },
  { unit: "month", seconds: 60 * 60 * 24 * 30 },
  { unit: "day", seconds: 60 * 60 * 24 },
  { unit: "hour", seconds: 60 * 60 },
  { unit: "minute", seconds: 60 },
] as const;

const RELATIVE_RTF = new Intl.RelativeTimeFormat(LOCALE, { numeric: "auto" });

/**
 * Formats a timestamp as a relative time string (e.g. "5 minutes ago",
 * "in 2 days"). Returns the em-dash placeholder for invalid inputs.
 *
 * Use `formatRelative` for "X minutes ago" feeds, badges, and notification
 * timestamps — not for headers (use formatDate / formatDateTime instead).
 */
export function formatRelative(value: string | number | Date | null | undefined): string {
  if (value === null || value === undefined || value === "") return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  const diffSeconds = (d.getTime() - Date.now()) / 1000;
  const abs = Math.abs(diffSeconds);
  for (const { unit, seconds } of RELATIVE_THRESHOLDS) {
    if (abs >= seconds) {
      return RELATIVE_RTF.format(Math.round(diffSeconds / seconds), unit);
    }
  }
  return RELATIVE_RTF.format(Math.round(diffSeconds), "second");
}
