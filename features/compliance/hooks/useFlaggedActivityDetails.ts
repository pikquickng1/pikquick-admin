"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { complianceApi } from "../api/complianceApi";
import type { FlaggedActivityDetails } from "../types/compliance.types";

export function useFlaggedActivityDetails(activityId: string | null) {
  const query = useQuery({
    queryKey: queryKeys.compliance.detail(activityId ?? ""),
    queryFn: () => complianceApi.getFlaggedActivityById(activityId!),
    enabled: !!activityId,
  });

  return {
    activity: (query.data ?? null) as FlaggedActivityDetails | null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
