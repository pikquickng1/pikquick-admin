import { AnalyticsData } from "../types/analytics.types";
import { analyticsService } from "@/lib/services/analytics.service";

export const analyticsApi = {
  async getAnalyticsData(): Promise<AnalyticsData> {
    try {
      const response = await analyticsService.getAnalytics();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      throw error;
    }
  },
};
