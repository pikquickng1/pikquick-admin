"use client";

import { useQuery } from "@tanstack/react-query";
import { runnersService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { statusToApi } from "@/lib/utils/status";
import type { RunnerListFilters } from "../types/runner-list.types";

const LIMIT = DEFAULT_PAGE_SIZE;

export function useRunnerList(filters: RunnerListFilters, page: number = 1) {
  const status = statusToApi(filters.status);
  const verification = statusToApi(filters.verification);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.runners.list({
      page,
      limit: LIMIT,
      search: filters.search || undefined,
      status,
      verification,
    }),
    queryFn: async () =>
      runnersService.getRunners({
        page,
        limit: LIMIT,
        search: filters.search || undefined,
        status,
        verification,
      }),
  });

  const runners = data?.data ?? [];
  const total = data?.pagination?.totalItems ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.pagination?.currentPage ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.pagination?.itemsPerPage ?? LIMIT,
  };

  return {
    runners,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
  };
}
