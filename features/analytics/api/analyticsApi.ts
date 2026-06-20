import type { AnalyticsData } from "../types/analytics.types";
import { analyticsService } from "@/lib/services/analytics.service";

export const analyticsApi = {
  async getAnalyticsData(): Promise<AnalyticsData> {
    return (await analyticsService.getAnalytics()) as AnalyticsData;
  },
};
