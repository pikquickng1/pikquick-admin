"use client";

import { useQuery } from "@tanstack/react-query";
import { eliteRewardApi } from "../api/eliteRewardApi";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import type { EliteRewardFilters } from "../types/elite-reward.types";

const LIMIT = DEFAULT_PAGE_SIZE;

export function useEliteRewardList(filters: EliteRewardFilters, page: number) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["elite-rewards", filters, page],
    queryFn: () => eliteRewardApi.getEliteRewards(filters, page),
  });

  const rewards = data?.data ?? [];
  const total = data?.pagination.totalItems ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.pagination.currentPage ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.pagination.itemsPerPage ?? LIMIT,
  };

  return {
    rewards,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
    refetch: () => {
      void refetch();
    },
  };
}
