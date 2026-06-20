"use client";

import { useQuery } from "@tanstack/react-query";
import { eliteRewardApi } from "../api/eliteRewardApi";
import type { EliteRewardStats } from "../types/elite-reward.types";

export function useEliteRewardStats() {
  const query = useQuery({
    queryKey: ["elite-reward-stats"],
    queryFn: () => eliteRewardApi.getEliteRewardStats(),
  });

  return {
    stats: query.data ?? { awaitingReview: 0, approvedMTD: 0, totalElitePayouts: 0 },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
