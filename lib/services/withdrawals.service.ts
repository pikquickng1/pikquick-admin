import { apiClient } from "@/lib/api/client";
import type {
  AdminWithdrawal,
  AdminWithdrawalDetail,
  AdminWithdrawalsListParams,
  PaginatedResponse,
} from "@/lib/types";

export const withdrawalsService = {
  list(
    params?: AdminWithdrawalsListParams
  ): Promise<PaginatedResponse<AdminWithdrawal>> {
    return apiClient.get("/admin/withdrawals", { params }).then((r) => r.data);
  },

  getById(id: string): Promise<AdminWithdrawalDetail> {
    return apiClient.get(`/admin/withdrawals/${id}`).then((r) => r.data);
  },

  approve(id: string): Promise<unknown> {
    return apiClient.post(`/admin/withdrawals/${id}/approve`, {}).then((r) => r.data);
  },

  reject(id: string, reason?: string): Promise<unknown> {
    return apiClient
      .post(`/admin/withdrawals/${id}/reject`, { reason })
      .then((r) => r.data);
  },

  /** Streams the CSV export as a Blob. */
  exportCsv(params?: { status?: string; user_id?: string }): Promise<Blob> {
    return apiClient
      .get("/admin/withdrawals/export", { params, responseType: "blob" })
      .then((r) => r.data as Blob);
  },
};
