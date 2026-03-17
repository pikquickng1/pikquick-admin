import { ActivityLog, ActivityLogListResponse, ActivityLogFilters } from "../types/activity-log.types";
import { activityLogService } from "@/lib/services/activity-log.service";

export const activityLogApi = {
  getActivityLogs: async (filters: ActivityLogFilters): Promise<ActivityLogListResponse> => {
    try {
      const response = await activityLogService.getLogs(filters as unknown as Record<string, unknown>);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
      throw error;
    }
  },
};
