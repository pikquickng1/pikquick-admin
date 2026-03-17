import { apiClient } from "@/lib/api/client";

export const analyticsService = {
  getAnalytics() {
    return apiClient.get("/admin/analytics").then((r) => r.data);
  },
};
