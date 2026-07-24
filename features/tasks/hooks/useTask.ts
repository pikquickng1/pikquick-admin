"use client";

import { useQuery } from "@tanstack/react-query";
import { tasksService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { mapAdminTaskToDetail } from "../lib/mapAdminTaskToDetail";

export function useTask(id: string) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: () => tasksService.getById(id),
    enabled: Boolean(id),
  });

  return {
    task: data ? mapAdminTaskToDetail(data) : null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
}
