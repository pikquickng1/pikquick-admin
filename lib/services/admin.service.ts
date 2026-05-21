import { apiClient } from "@/lib/api/client";

export const adminService = {
  getAdminUsers() {
    return apiClient.get("/admin/admins").then((r) => r.data);
  },
  deleteAdminUser(id: string) {
    return apiClient.delete(`/admin/admins/${id}`).then((r) => r.data);
  },
  getRoles() {
    return apiClient.get("/admin/roles").then((r) => r.data);
  },
  getAdminProfile() {
    return apiClient.get("/admin/profile").then((r) => r.data);
  },
  updateAdminProfile(data: Record<string, unknown>) {
    return apiClient.patch("/admin/profile", data).then((r) => r.data);
  },
  changePassword(data: Record<string, unknown>) {
    return apiClient.post("/admin/profile/change-password", data).then((r) => r.data);
  },
  logoutAllDevices() {
    return apiClient.post("/admin/profile/logout-all").then((r) => r.data);
  },
  getAdminActivityLogs() {
    return apiClient.get("/admin/profile/activity-logs").then((r) => r.data);
  },
  getNotifications(params: Record<string, unknown>) {
    return apiClient.get("/admin/notifications", { params }).then((r) => r.data);
  },
  createNotification(data: Record<string, unknown>) {
    return apiClient.post("/admin/notifications", data).then((r) => r.data);
  },
  getPlatformSettings() {
    return apiClient.get("/admin/platform/settings").then((r) => r.data);
  },
  updatePlatformSettings(settings: Record<string, unknown>) {
    return apiClient.patch("/admin/platform/settings", settings).then((r) => r.data);
  },
  getTaskCategories() {
    return apiClient.get("/admin/task-categories").then((r) => r.data);
  },
  addTaskCategory(category: Record<string, unknown>) {
    return apiClient.post("/admin/task-categories", category).then((r) => r.data);
  },
  updateTaskCategory(id: string, category: Record<string, unknown>) {
    return apiClient.patch(`/admin/task-categories/${id}`, category).then((r) => r.data);
  },
  deleteTaskCategory(id: string) {
    return apiClient.delete(`/admin/task-categories/${id}`).then((r) => r.data);
  },
};
