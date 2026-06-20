"use client";

import { useQuery } from "@tanstack/react-query";
import { requestersService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { statusToApi } from "@/lib/utils/status";
import type { RequesterListFilters } from "../types/requester-list.types";

const LIMIT = DEFAULT_PAGE_SIZE;

export function useRequesterList(filters: RequesterListFilters, page: number = 1) {
  const status = statusToApi(filters.status);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.requesters.list({
      page,
      limit: LIMIT,
      search: filters.search || undefined,
      status,
    }),
    queryFn: async () =>
      requestersService.getRequesters({
        page,
        limit: LIMIT,
        search: filters.search || undefined,
        status,
      }),
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
