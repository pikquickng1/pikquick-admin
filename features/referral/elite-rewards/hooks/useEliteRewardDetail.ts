"use client";

import { useQuery } from "@tanstack/react-query";
import { eliteRewardDetailApi } from "../api/eliteRewardDetailApi";
import type { EliteRewardDetail } from "../types/elite-reward-detail.types";

export function useEliteRewardDetail(id: string | null) {
  const query = useQuery({
    queryKey: ["elite-reward-detail", id],
    queryFn: () => eliteRewardDetailApi.getEliteRewardDetail(id!),
    enabled: !!id,
  });

  return {
    detail: (query.data ?? null) as EliteRewardDetail | null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
