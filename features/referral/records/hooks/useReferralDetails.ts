"use client";

import { useQuery } from "@tanstack/react-query";
import { referralDetailApi } from "../api/referralDetailApi";
import type { ReferralDetails } from "../types/referral-detail.types";

export function useReferralDetails(id: string | null) {
  const query = useQuery({
    queryKey: ["referral-detail", id],
    queryFn: () => referralDetailApi.getReferralDetails(id!),
    enabled: !!id,
  });

  return {
    details: (query.data ?? null) as ReferralDetails | null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
