import { apiClient } from "@/lib/api/client";
import type {
  ManualDeductionResultDto,
  RunnerSubscriptionStats,
} from "@/lib/types";

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
};
