"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { analyticsApi } from "../api/analyticsApi";
import type { AnalyticsData } from "../types/analytics.types";

export function useAnalyticsData() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.analytics.data(),
    queryFn: () => analyticsApi.getAnalyticsData(),
  });

  return {
    data: (data ?? null) as AnalyticsData | null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}
