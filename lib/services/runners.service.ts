import { apiClient } from "@/lib/api/client";
import type {
  ManualDeductionResultDto,
  RunnerSubscriptionStats,
} from "@/lib/types";

export interface RunnerListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  verification?: string;
}

export const runnersService = {
  triggerManualAutoDeduction(): Promise<ManualDeductionResultDto> {
    return apiClient
      .post("/admin/runners/auto-deduction/manual-trigger")
      .then((r) => r.data);
  },

  getSubscriptionStats(): Promise<RunnerSubscriptionStats> {
    return apiClient
      .get("/admin/runners/subscriptions/stats")
      .then((r) => r.data);
  },

  getRunners(params: RunnerListParams) {
    return apiClient.get("/admin/runners", { params }).then((r) => r.data);
  },

  getRunnerById(id: string) {
    return apiClient.get(`/admin/runners/${id}`).then((r) => r.data);
  },

  getRunnerWallet(id: string) {
    return apiClient.get(`/admin/runners/${id}/wallet`).then((r) => r.data);
  },

  getRunnerTasks(id: string, params?: { page?: number; limit?: number }) {
    return apiClient.get(`/admin/runners/${id}/tasks`, { params }).then((r) => r.data);
  },

  suspendRunner(id: string) {
    return apiClient.post(`/admin/runners/${id}/suspend`).then((r) => r.data);
  },

  activateRunner(id: string) {
    return apiClient.post(`/admin/runners/${id}/activate`).then((r) => r.data);
  },

  adjustWallet(id: string, data: { type: "credit" | "debit"; amount: number }) {
    return apiClient.post(`/admin/runners/${id}/adjust-wallet`, data).then((r) => r.data);
  },

  resetPassword(id: string) {
    return apiClient.post(`/admin/runners/${id}/reset-password`).then((r) => r.data);
  },

  sendMessage(id: string, data: { subject: string; message: string }) {
    return apiClient.post(`/admin/runners/${id}/message`, data).then((r) => r.data);
  },
};
