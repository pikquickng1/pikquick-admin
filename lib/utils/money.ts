/**
 * Money helpers. Backend amounts are in kobo; divide by 100 for NGN display.
 */

export function koboToNgn(kobo: number): number {
  return kobo / 100;
}

export function ngnToKobo(ngn: number): number {
  return Math.round(ngn * 100);
}

export function formatNgn(ngn: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(ngn);
}

export function formatNgnFromKobo(kobo: number): string {
  return formatNgn(koboToNgn(kobo));
}
