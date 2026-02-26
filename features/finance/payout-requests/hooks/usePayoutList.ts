"use client";

import { useQuery } from "@tanstack/react-query";
import { withdrawalsService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { PayoutListFilters } from "../types/payout.types";
import { mapWithdrawalToPayoutRequest } from "../lib/mapWithdrawalToPayoutRequest";

const LIMIT = 20;

function statusToApi(status: string): string | undefined {
  if (!status || status === "All Status") return undefined;
  switch (status) {
    case "Pending":
      return "pending";
    case "Completed":
      return "successful";
    case "Rejected":
      return "failed";
    default:
      return undefined;
  }
}

export function usePayoutList(filters: PayoutListFilters, page: number) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.withdrawals.list({
      page,
      limit: LIMIT,
      status: statusToApi(filters.status),
    }),
    queryFn: async () => {
      const res = await withdrawalsService.list({
        page,
        limit: LIMIT,
        status: statusToApi(filters.status),
      });
      return res;
    },
  });

  const payouts = (data?.data ?? []).map(mapWithdrawalToPayoutRequest);
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.page ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.limit ?? LIMIT,
  };

  return {
    payouts,
    loading: isLoading,
    pagination,
    refetch: () => refetch(),
  };
}
