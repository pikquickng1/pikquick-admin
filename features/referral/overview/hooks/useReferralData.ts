"use client";

import { useQuery } from "@tanstack/react-query";
import { referralApi } from "../api/referralApi";
import { queryKeys } from "@/lib/query/keys";

export function useReferralData() {
  const query = useQuery({
    queryKey: queryKeys.referral.overview(),
    queryFn: () => referralApi.getReferralData(),
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
