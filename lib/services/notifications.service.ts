import { apiClient } from "@/lib/api/client";

export const notificationsService = {
  getAll() {
    return apiClient.get("/admin/notifications").then((r) => r.data);
  },
  markAsRead(id: string) {
    return apiClient.patch(`/admin/notifications/${id}/read`).then((r) => r.data);
  },
  markAllAsRead() {
    return apiClient.post("/admin/notifications/read-all").then((r) => r.data);
  },
};
