import { Notification, NotificationListResponse, NotificationFilters } from "../types/notifications.types";
import { adminService } from "@/lib/services";

export const notificationsApi = {
  getNotifications: async (filters: NotificationFilters): Promise<NotificationListResponse> => {
    try {
      const response = await adminService.getNotifications({
        page: filters.page,
        limit: filters.limit,
      });
      return response;
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      throw error;
    }
  },

  createNotification: async (notification: Omit<Notification, "id" | "date">): Promise<void> => {
    try {
      await adminService.createNotification(notification);
    } catch (error) {
      console.error("Failed to create notification:", error);
      throw error;
    }
  },
};
