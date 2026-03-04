export interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  isNew: boolean;
  icon: string;
  iconColor: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}
