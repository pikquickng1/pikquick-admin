"use client";

import { useQuery } from "@tanstack/react-query";
import { requestersService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { RequesterListFilters } from "../types/requester-list.types";

const LIMIT = 20;

export function useRequesterList(filters: RequesterListFilters, page: number = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.requesters.list({
      page,
      limit: LIMIT,
      search: filters.search || undefined,
      status: filters.status !== "All Status" ? filters.status?.toLowerCase() : undefined,
    }),
    queryFn: async () => {
      const res = await requestersService.getRequesters({
        page,
        limit: LIMIT,
        search: filters.search || undefined,
        status: filters.status !== "All Status" ? filters.status?.toLowerCase() : undefined,
      });
      return res;
    },
  });

  const requesters = data?.data ?? [];
  const total = data?.pagination?.totalItems ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.pagination?.currentPage ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.pagination?.itemsPerPage ?? LIMIT,
  };

  return {
    requesters,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
  };
}
