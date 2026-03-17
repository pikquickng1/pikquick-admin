import { NotificationsResponse } from "../types/notifications.types";
import { notificationsService } from "@/lib/services/notifications.service";

export const notificationsApi = {
  getNotifications: async (): Promise<NotificationsResponse> => {
    try {
      const response = await notificationsService.getAll();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      throw error;
    }
  },

  markAsRead: async (notificationId: string): Promise<void> => {
    try {
      await notificationsService.markAsRead(notificationId);
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      throw error;
    }
  },

  markAllAsRead: async (): Promise<void> => {
    try {
      await notificationsService.markAllAsRead();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
      throw error;
    }
  },
};
