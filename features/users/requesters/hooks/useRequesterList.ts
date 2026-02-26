"use client";

import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { RequesterListFilters } from "../types/requester-list.types";
import { mapAdminUserToRequester } from "../lib/mapAdminUserToRequester";

const LIMIT = 20;

export function useRequesterList(filters: RequesterListFilters, page: number = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.users.list({
      role: "client",
      page,
      limit: LIMIT,
      search: filters.search || undefined,
      status: filters.status !== "All Status" ? filters.status?.toLowerCase() : undefined,
    }),
    queryFn: async () => {
      const res = await usersService.list({
        page,
        limit: LIMIT,
        role: "client",
        search: filters.search || undefined,
        status: filters.status !== "All Status" ? filters.status?.toLowerCase() : undefined,
      });
      return res;
    },
  });

  const requesters = (data?.data ?? []).map(mapAdminUserToRequester);
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.page ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.limit ?? LIMIT,
  };

  return {
    requesters,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
  };
}
