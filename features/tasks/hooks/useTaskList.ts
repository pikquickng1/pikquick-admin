"use client";

import { useQuery } from "@tanstack/react-query";
import { tasksService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { TaskListFilters } from "../types/task.types";
import { mapAdminTaskToListItem } from "../lib/mapAdminTaskToListItem";

const LIMIT = 20;

function statusToApi(status: string): string | undefined {
  if (!status || status === "All Status") return undefined;
  switch (status) {
    case "In Progress":
      return "task_assigned";
    case "Completed":
      return "completed";
    case "Pending":
      return "pending";
    case "Cancelled":
      return "cancelled";
    default:
      return undefined;
  }
}

export function useTaskList(filters: TaskListFilters, page: number = 1) {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.tasks.list({
      page,
      limit: LIMIT,
      status: statusToApi(filters.status),
      search: filters.search || undefined,
    }),
    queryFn: async () => {
      const res = await tasksService.listAll({
        page,
        limit: LIMIT,
        status: statusToApi(filters.status),
        search: filters.search || undefined,
      });
      return res;
    },
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
