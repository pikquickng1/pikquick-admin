"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { complianceApi } from "../api/complianceApi";
import type { ComplianceListFilters } from "../types/compliance.types";

export function useComplianceList(filters: ComplianceListFilters, page: number) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.compliance.list({ ...filters, page }),
    queryFn: () => complianceApi.getFlaggedActivities(filters, page),
  });

  const fallbackPagination = {
    currentPage: page,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  };

  return {
    activities: data?.data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination: data?.pagination ?? fallbackPagination,
    refetch: () => {
      void refetch();
    },
  };
}
