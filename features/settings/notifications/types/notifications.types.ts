export interface Notification {
  id: string;
  date: string;
  audience: "All" | "Runners" | "Requesters";
  type: "System" | "Custom";
  messagePreview: string;
  sentBy: string;
}

export interface NotificationFilters {
  page: number;
  limit: number;
}

export interface NotificationListResponse {
  notifications: Notification[];
  total: number;
  page: number;
  totalPages: number;
}
