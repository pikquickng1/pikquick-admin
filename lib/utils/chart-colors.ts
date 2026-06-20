/**
 * Centralized chart colors. Replaces 50+ inline hex literals scattered
 * across analytics, revenue-reports and referral modules.
 *
 * Names follow Recharts prop conventions: `stroke`, `fill`, `dot.fill`.
 */

export const CHART_COLORS = {
  axis: "#6B7280",
  grid: "#E5E7EB",
  tooltipBg: "#FFFFFF",
  tooltipBorder: "#E5E7EB",
  primary: "#3B82F6",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  pie: "#8884d8",
  pink: "#EC4899",
  teal: "#14B8A6",
} as const;

/** Weekday palette for bar charts (Mon → Sun). */
export const CHART_WEEKDAY_PALETTE = [
  "#3B82F6", // Mon — primary
  "#10B981", // Tue — success
  "#F59E0B", // Wed — warning
  "#8B5CF6", // Thu — purple
  "#EF4444", // Fri — danger
  "#EC4899", // Sat — pink
  "#14B8A6", // Sun — teal
] as const;

export const CHART_PIE_PALETTE = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
] as const;

export const CHART_LINE_DEFAULT_WIDTH = 2;
export const CHART_DOT_DEFAULT_RADIUS = 4;
export const CHART_ACTIVE_DOT_DEFAULT_RADIUS = 6;
export const CHART_PIE_DEFAULT_OUTER_RADIUS = 90;
export const CHART_BAR_DEFAULT_SIZE = 40;
