"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { complianceApi } from "../api/complianceApi";
import type { ComplianceStats } from "../types/compliance.types";

export function useComplianceStats() {
  const query = useQuery({
    queryKey: queryKeys.compliance.stats(),
    queryFn: () => complianceApi.getComplianceStats(),
  });

  return {
    stats: query.data ?? { kycSummaryCount: 0, flaggedTransactions: 0, suspendedAccounts: 0 },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
