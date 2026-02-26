"use client";

import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { RunnerListFilters } from "../types/runner-list.types";
import { mapAdminUserToRunner } from "../lib/mapAdminUserToRunner";

const LIMIT = 20;

function statusToApi(status: string): string | undefined {
  if (!status || status === "All Status") return undefined;
  switch (status) {
    case "Available":
      return "active";
    case "Suspended":
      return "suspended";
    case "Unavailable":
      return "inactive";
    default:
      return undefined;
  }
}

export function useRunnerList(filters: RunnerListFilters, page: number = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.users.list({
      role: "runner",
      page,
      limit: LIMIT,
      search: filters.search || undefined,
      status: statusToApi(filters.status),
    }),
    queryFn: async () => {
      const res = await usersService.list({
        page,
        limit: LIMIT,
        role: "runner",
        search: filters.search || undefined,
        status: statusToApi(filters.status),
      });
      return res;
    },
  });

  const runners = (data?.data ?? []).map(mapAdminUserToRunner);
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.page ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.limit ?? LIMIT,
  };

  return {
    runners,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
  };
}
