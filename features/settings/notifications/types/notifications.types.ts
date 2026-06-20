import { NotificationAudience, NotificationMessageType } from "@/lib/types/enums";

/** Audience display labels used by the admin send-notification UI. */
export type NotificationAudienceLabel =
  | "All Users"
  | "Runners"
  | "Requesters";

/** Display labels for the notification type column (System / Custom). */
export type NotificationTypeLabel = "System" | "Custom";

export interface AdminNotificationLogItem {
  id: string;
  date: string;
  audience: NotificationAudienceLabel;
  type: NotificationTypeLabel;
  messagePreview: string;
  sentBy: string;
}

export interface NotificationLogFilters {
  page: number;
  limit: number;
}

export interface NotificationLogResponse {
  notifications: AdminNotificationLogItem[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateNotificationPayload {
  audience: NotificationAudience;
  messageType: NotificationMessageType;
  message: string;
  scheduleTime?: Date;
}
