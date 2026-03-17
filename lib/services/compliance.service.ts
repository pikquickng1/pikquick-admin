import { apiClient } from "@/lib/api/client";

export const complianceService = {
  getFlaggedActivities(params?: Record<string, unknown>) {
    return apiClient.get("/admin/compliance/flagged", { params }).then((r) => r.data);
  },
  getFlaggedActivityById(id: string) {
    return apiClient.get(`/admin/compliance/flagged/${id}`).then((r) => r.data);
  },
  getStats() {
    return apiClient.get("/admin/compliance/stats").then((r) => r.data);
  },
  updateFlagStatus(id: string, status: string) {
    return apiClient.patch(`/admin/compliance/flagged/${id}/status`, { status }).then((r) => r.data);
  },
};
