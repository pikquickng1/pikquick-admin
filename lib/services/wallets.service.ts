import { apiClient } from "@/lib/api/client";
import type {
  AdminWalletsResponse,
  AdminWalletDetail,
  AdminWalletStats,
  AdminWalletTransactionsResponse,
} from "@/lib/types";

export const walletsService = {
  list(params?: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<AdminWalletsResponse> {
    return apiClient.get("/admin/wallets", { params }).then((r) => r.data);
  },

  stats(): Promise<AdminWalletStats> {
    return apiClient.get("/admin/wallets/stats").then((r) => r.data);
  },

  getById(id: string): Promise<AdminWalletDetail> {
    return apiClient.get(`/admin/wallets/${id}`).then((r) => r.data);
  },

  transactions(
    id: string,
    params?: { page?: number; limit?: number }
  ): Promise<AdminWalletTransactionsResponse> {
    return apiClient
      .get(`/admin/wallets/${id}/transactions`, { params })
      .then((r) => r.data);
  },
};
