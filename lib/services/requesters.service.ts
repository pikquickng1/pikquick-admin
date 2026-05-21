import { apiClient } from "@/lib/api/client";

export interface RequesterListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const requestersService = {
  getRequesters(params: RequesterListParams) {
    return apiClient.get("/admin/requesters", { params }).then((r) => r.data);
  },

  getRequesterById(id: string) {
    return apiClient.get(`/admin/requesters/${id}`).then((r) => r.data);
  },

  getRequesterWallet(id: string) {
    return apiClient.get(`/admin/requesters/${id}/wallet`).then((r) => r.data);
  },

  getRequesterTasks(id: string, params?: { page?: number; limit?: number; status?: string }) {
    return apiClient.get(`/admin/requesters/${id}/tasks`, { params }).then((r) => r.data);
  },

  getRequesterPayments(id: string, params?: { page?: number; limit?: number }) {
    return apiClient.get(`/admin/requesters/${id}/payments`, { params }).then((r) => r.data);
  },

  suspendRequester(id: string) {
    return apiClient.post(`/admin/requesters/${id}/suspend`).then((r) => r.data);
  },

  activateRequester(id: string) {
    return apiClient.post(`/admin/requesters/${id}/activate`).then((r) => r.data);
  },

  adjustWallet(id: string, data: { type: "credit" | "debit"; amount: number }) {
    return apiClient.post(`/admin/requesters/${id}/adjust-wallet`, data).then((r) => r.data);
  },

  resetPassword(id: string) {
    return apiClient.post(`/admin/requesters/${id}/reset-password`).then((r) => r.data);
  },

  sendMessage(id: string, data: { subject: string; message: string }) {
    return apiClient.post(`/admin/requesters/${id}/message`, data).then((r) => r.data);
  },
};
