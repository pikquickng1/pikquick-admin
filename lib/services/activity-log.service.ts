import { apiClient } from "@/lib/api/client";

export const activityLogService = {
  getLogs(params?: Record<string, unknown>) {
    return apiClient.get("/admin/activity-logs", { params }).then((r) => r.data);
  },
};
