"use client";

import { useQuery } from "@tanstack/react-query";
import { referralSettingsApi } from "../api/referralSettingsApi";
import type { ReferralSettings } from "../types/referral-settings.types";

export function useReferralSettings() {
  const query = useQuery({
    queryKey: ["referral-settings"],
    queryFn: () => referralSettingsApi.getSettings(),
  });

  return {
    settings: (query.data ?? null) as ReferralSettings | null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
  };
}
