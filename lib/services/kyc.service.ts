import { apiClient } from "@/lib/api/client";

export const kycService = {
  getList(params?: Record<string, unknown>) {
    return apiClient.get("/admin/kyc", { params }).then((r) => r.data);
  },
  getById(id: string) {
    return apiClient.get(`/admin/kyc/${id}`).then((r) => r.data);
  },
  getStats() {
    return apiClient.get("/admin/kyc/stats").then((r) => r.data);
  },
  approve(id: string, adminId: string) {
    return apiClient.post(`/admin/kyc/${id}/approve`, { adminId }).then((r) => r.data);
  },
  reject(id: string, reason: string, adminId: string) {
    return apiClient.post(`/admin/kyc/${id}/reject`, { reason, adminId }).then((r) => r.data);
  },
};
