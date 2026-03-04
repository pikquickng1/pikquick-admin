import { Notification, NotificationListResponse, NotificationFilters } from "../types/notifications.types";

export const notificationsApi = {
  getNotifications: async (filters: NotificationFilters): Promise<NotificationListResponse> => {
    // Mock API call
    const allNotifications: Notification[] = [
      {
        id: "1",
        date: "2025-10-30",
        audience: "All",
        type: "System",
        messagePreview: "Platform maintenance scheduled for Nov 1st",
        sentBy: "System",
      },
      {
        id: "2",
        date: "2025-10-30",
        audience: "Runners",
        type: "Custom",
        messagePreview: "New payout schedule announced",
        sentBy: "Aisha Mohammed",
      },
      {
        id: "3",
        date: "2025-10-30",
        audience: "Requesters",
        type: "Custom",
        messagePreview: "New payout schedule announced",
        sentBy: "Aisha Mohammed",
      },
    ];

    // Simulate pagination
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    const paginatedNotifications = allNotifications.slice(start, end);

    return {
      notifications: paginatedNotifications,
      total: 100, // Mock total
      page: filters.page,
      totalPages: Math.ceil(100 / filters.limit),
    };
  },

  createNotification: async (notification: Omit<Notification, "id" | "date">): Promise<void> => {
    // Mock API call
    console.log("Creating notification:", notification);
  },
};
