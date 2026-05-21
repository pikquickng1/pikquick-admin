"use client";

import { useQuery } from "@tanstack/react-query";
import { runnersService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { RunnerListFilters } from "../types/runner-list.types";

const LIMIT = 20;

function statusToApi(status: string): string | undefined {
  if (!status || status === "All Status") return undefined;
  switch (status) {
    case "Available":
      return "available";
    case "Suspended":
      return "suspended";
    case "Unavailable":
      return "unavailable";
    default:
      return undefined;
  }
}

export function useRunnerList(filters: RunnerListFilters, page: number = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.runners.list({
      page,
      limit: LIMIT,
      search: filters.search || undefined,
      status: statusToApi(filters.status),
      verification: filters.verification,
    }),
    queryFn: async () => {
      const res = await runnersService.getRunners({
        page,
        limit: LIMIT,
        search: filters.search || undefined,
        status: statusToApi(filters.status),
        verification: filters.verification,
      });
      return res;
    },
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
