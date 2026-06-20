"use client";

import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "../api/transactionApi";

export function useTransactionStats() {
  const query = useQuery({
    queryKey: ["transaction-stats"],
    queryFn: () => transactionApi.getTransactionStats(),
  });

  return {
    stats: query.data ?? {
      totalPlatformEarnings: 0,
      dailyAccessPayments: 0,
      taskPayments: 0,
      refunds: 0,
    },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
