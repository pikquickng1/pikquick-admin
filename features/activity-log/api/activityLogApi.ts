import { ActivityLog, ActivityLogListResponse, ActivityLogFilters } from "../types/activity-log.types";

export const activityLogApi = {
  getActivityLogs: async (filters: ActivityLogFilters): Promise<ActivityLogListResponse> => {
    // Mock API call
    const allLogs: ActivityLog[] = [
      {
        id: "1",
        admin: "Super Admin",
        adminName: "Akeem",
        action: "Approved Payout",
        affectedUser: "Runner #233",
        timestamp: "2025-10-30 14:23",
      },
      {
        id: "2",
        admin: "Support",
        adminName: "Akeem",
        action: "Approved Payout",
        affectedUser: "Runner #233",
        timestamp: "2025-10-30 14:23",
      },
      {
        id: "3",
        admin: "Finance",
        adminName: "Akeem",
        action: "Approved Payout",
        affectedUser: "Runner #233",
        timestamp: "2025-10-30 14:23",
      },
      {
        id: "4",
        admin: "Super Admin",
        adminName: "Akeem",
        action: "Approved Payout",
        affectedUser: "Runner #233",
        timestamp: "2025-10-30 14:23",
      },
      {
        id: "5",
        admin: "Super Admin",
        adminName: "Akeem",
        action: "Approved Payout",
        affectedUser: "Runner #233",
        timestamp: "2025-10-30 14:23",
      },
    ];

    // Simulate pagination
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    const paginatedLogs = allLogs.slice(start, end);

    return {
      logs: paginatedLogs,
      total: 100, // Mock total
      page: filters.page,
      totalPages: Math.ceil(100 / filters.limit),
    };
  },
};
