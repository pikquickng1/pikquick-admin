"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { PayoutStats } from "../types/payout.types";

export function usePayoutStats() {
  const { data: dashboardStats } = useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: () => dashboardService.getStats(),
  });

  const stats: PayoutStats = {
    pendingRequests: dashboardStats?.withdrawals?.pending_count ?? 0,
    approvedThisWeek: 0,
    totalPendingAmount: 0,
  };

  return { stats, loading: false, error: null, refetch: () => {} };
}
