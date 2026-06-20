import { ReadStatus } from "@/lib/types/enums";

export interface AdminNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isNew: boolean;
  icon: "shield" | "users" | "alert" | "dollar";
  iconColor: "blue" | "green" | "red" | "purple";
  status?: ReadStatus;
}

export interface NotificationsResponse {
  notifications: AdminNotification[];
  unreadCount: number;
}
