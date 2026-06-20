import type {
  AdminNotification,
  NotificationsResponse,
} from "../types/notifications.types";
import { notificationsService } from "@/lib/services/notifications.service";

export const notificationsApi = {
  async getNotifications(): Promise<NotificationsResponse> {
    const body = (await notificationsService.getAll()) as
      | { data?: { notifications?: AdminNotification[]; unreadCount?: number } }
      | { notifications?: AdminNotification[]; unreadCount?: number }
      | undefined;
    const inner = (body && "data" in body && body.data ? body.data : body) ?? {};
    const list = (inner as { notifications?: AdminNotification[] }).notifications ?? [];
    const unreadCount = (inner as { unreadCount?: number }).unreadCount ?? 0;
    return { notifications: list, unreadCount };
  },

  async markAsRead(notificationId: string): Promise<void> {
    await notificationsService.markAsRead(notificationId);
  },

  async markAllAsRead(): Promise<void> {
    await notificationsService.markAllAsRead();
  },
};
