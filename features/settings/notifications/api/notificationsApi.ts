import type {
  AdminNotificationLogItem,
  CreateNotificationPayload,
  NotificationAudienceLabel,
  NotificationLogResponse,
  NotificationTypeLabel,
} from "../types/notifications.types";
import { adminService } from "@/lib/services/admin.service";
import { formatDate } from "@/lib/utils/date";

/** Raw item shape returned by GET /admin/notifications. */
interface RawLogItem {
  id: string;
  title?: string;
  description?: string;
  timestamp?: string;
  type?: string | null;
  audience?: string | null;
  sentBy?: string | null;
  createdBy?: string | null;
}

interface RawLogResponse {
  notifications?: RawLogItem[];
  total?: number;
  page?: number;
  totalPages?: number;
}

function toAudienceLabel(raw?: string | null): NotificationAudienceLabel {
  const a = (raw ?? "").toLowerCase();
  if (a.includes("runner")) return "Runners";
  if (a.includes("requester") || a.includes("client")) return "Requesters";
  return "All Users";
}

function toTypeLabel(item: RawLogItem): NotificationTypeLabel {
  // Admin-authored broadcasts (have a creator) are "Custom"; the rest are
  // system-generated.
  return item.createdBy ? "Custom" : "System";
}

function mapItem(item: RawLogItem): AdminNotificationLogItem {
  return {
    id: item.id,
    date: formatDate(item.timestamp),
    audience: toAudienceLabel(item.audience),
    type: toTypeLabel(item),
    messagePreview: item.description ?? item.title ?? "",
    sentBy: item.sentBy ?? "System",
  };
}

export const notificationsApi = {
  async getNotificationsLog(params: {
    page: number;
    limit: number;
  }): Promise<NotificationLogResponse> {
    const res = (await adminService.getNotifications(
      params as unknown as Record<string, unknown>,
    )) as RawLogResponse;

    return {
      notifications: (res.notifications ?? []).map(mapItem),
      total: res.total ?? 0,
      page: res.page ?? params.page,
      totalPages: res.totalPages ?? 1,
    };
  },

  async createNotification(payload: CreateNotificationPayload): Promise<void> {
    await adminService.createNotification(
      payload as unknown as Record<string, unknown>,
    );
  },
};
