import type {
  CreateNotificationPayload,
  NotificationLogResponse,
} from "../types/notifications.types";
import { adminService } from "@/lib/services/admin.service";

export const notificationsApi = {
  async getNotificationsLog(
    params: { page: number; limit: number },
  ): Promise<NotificationLogResponse> {
    return (await adminService.getNotifications(
      params as unknown as Record<string, unknown>,
    )) as NotificationLogResponse;
  },

  async createNotification(payload: CreateNotificationPayload): Promise<void> {
    await adminService.createNotification(
      payload as unknown as Record<string, unknown>,
    );
  },
};
