import { apiClient } from "@/lib/api/client";
import type { AdminWalletsResponse } from "@/lib/types";

export const walletsService = {
  list(params?: { page?: number; limit?: number }): Promise<AdminWalletsResponse> {
    return apiClient.get("/admin/wallets", { params }).then((r) => r.data);
  },
};
