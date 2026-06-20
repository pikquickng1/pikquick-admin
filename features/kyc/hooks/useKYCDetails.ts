"use client";

import { useQuery } from "@tanstack/react-query";
import { kycApi } from "../api/kycApi";
import { queryKeys } from "@/lib/query/keys";
import type { KYCVerification } from "../types/kyc.types";

export function useKYCDetails(verificationId: string | null) {
  const query = useQuery({
    queryKey: queryKeys.kyc.detail(verificationId ?? ""),
    queryFn: () => kycApi.getKYCById(verificationId!),
    enabled: !!verificationId,
  });

  return {
    verification: (query.data ?? null) as KYCVerification | null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
