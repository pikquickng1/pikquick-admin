import { apiClient } from "@/lib/api/client";
import type { DashboardStatsResponse } from "@/lib/types";

export const dashboardService = {
  getStats(): Promise<DashboardStatsResponse> {
    return apiClient.get("/admin/dashboard/stats").then((r) => r.data);
  },
};
