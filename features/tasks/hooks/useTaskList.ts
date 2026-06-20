"use client";

import { useQuery } from "@tanstack/react-query";
import { tasksService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { statusToApi } from "@/lib/utils/status";
import { mapAdminTaskToListItem } from "../lib/mapAdminTaskToListItem";
import type { TaskListFilters } from "../types/task.types";

const LIMIT = DEFAULT_PAGE_SIZE;

export function useTaskList(filters: TaskListFilters, page: number = 1) {
  const status = statusToApi(filters.status);

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.tasks.list({
      page,
      limit: LIMIT,
      status,
      search: filters.search || undefined,
    }),
    queryFn: async () =>
      tasksService.listAll({
        page,
        limit: LIMIT,
        status,
        search: filters.search || undefined,
      }),
  });

  const tasks = (data?.data ?? []).map(mapAdminTaskToListItem);
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.page ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.limit ?? LIMIT,
  };

  return {
    tasks,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
  };
}
