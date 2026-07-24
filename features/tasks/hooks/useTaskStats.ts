"use client";

import { useQuery } from "@tanstack/react-query";
import { tasksService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";

/** Task dashboard counters from GET /tasks/admin/stats. */
export function useTaskStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.tasks.stats(),
    queryFn: () => tasksService.getStats(),
  });

  return {
    stats: {
      activeTasks: data?.activeTasks ?? 0,
      approvedRefunds: data?.approvedRefunds ?? 0,
      activeRunners: data?.activeRunners ?? 0,
    },
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
  };
}
