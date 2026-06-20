"use client";

import { useQuery } from "@tanstack/react-query";
import { revenueApi } from "../api/revenueApi";

export function useRevenueData() {
  const query = useQuery({
    queryKey: ["revenue"],
    queryFn: () => revenueApi.getRevenueData(),
  });

  return {
    data: query.data ?? null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
