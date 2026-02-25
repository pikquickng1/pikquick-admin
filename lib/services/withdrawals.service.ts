import { apiClient } from "@/lib/api/client";
import type {
  AdminWithdrawal,
  AdminWithdrawalsListParams,
  PaginatedResponse,
} from "@/lib/types";

export const withdrawalsService = {
  list(
    params?: AdminWithdrawalsListParams
  ): Promise<PaginatedResponse<AdminWithdrawal>> {
    return apiClient.get("/admin/withdrawals", { params }).then((r) => r.data);
  },
};
