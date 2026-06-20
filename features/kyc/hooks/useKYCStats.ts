"use client";

import { useQuery } from "@tanstack/react-query";
import { kycApi } from "../api/kycApi";
import { queryKeys } from "@/lib/query/keys";
import type { KYCStats } from "../types/kyc.types";

export function useKYCStats() {
  const query = useQuery({
    queryKey: queryKeys.kyc.stats(),
    queryFn: () => kycApi.getKYCStats(),
  });

  return {
    stats: query.data ?? { pendingVerifications: 0, resubmissionRequests: 0 },
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
