import type {
  AnalyticsData,
  AnalyticsStats,
  UserMetrics,
} from "../types/analytics.types";
import { analyticsService } from "@/lib/services/analytics.service";

const EMPTY_STATS: AnalyticsStats = {
  totalTasks: 0,
  avgCompletionTime: 0,
  retentionRate: 0,
  activeUsers: 0,
};

const EMPTY_USER_METRICS: UserMetrics = {
  repeatUserRate: 0,
  newUserRate: 0,
  monthlyData: [],
};

/**
 * The backend builds the analytics payload with `Promise.allSettled`, so any
 * sub-metric whose query rejects comes back as `null` (e.g. `stats`,
 * `completionTrend`). Coerce those to safe defaults here so the dashboard —
 * which expects non-null fields — never crashes on a partial response.
 */
function normalize(raw: Partial<AnalyticsData> | null | undefined): AnalyticsData {
  return {
    stats: raw?.stats ?? EMPTY_STATS,
    tasksByCategory: raw?.tasksByCategory ?? [],
    completionTrend: raw?.completionTrend ?? [],
    topCities: raw?.topCities ?? [],
    monthlyEarnings: raw?.monthlyEarnings ?? [],
    revenueBreakdown: raw?.revenueBreakdown ?? [],
    peakUsageHours: raw?.peakUsageHours ?? [],
    userMetrics: raw?.userMetrics ?? EMPTY_USER_METRICS,
  };
}

export const analyticsApi = {
  async getAnalyticsData(): Promise<AnalyticsData> {
    const raw = (await analyticsService.getAnalytics()) as
      | Partial<AnalyticsData>
      | null;
    return normalize(raw);
  },
};
