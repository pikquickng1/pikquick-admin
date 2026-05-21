import { apiClient } from "@/lib/api/client";
import type { DashboardStatsResponse, DashboardTrendsResponse } from "@/lib/types";

export const dashboardService = {
  getStats(): Promise<DashboardStatsResponse> {
    return apiClient.get("/admin/dashboard/stats").then((r) => r.data);
  },
  getTrends(): Promise<DashboardTrendsResponse> {
    return apiClient.get("/admin/dashboard/trends").then((r) => r.data);
  },
};
