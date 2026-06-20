"use client";

import { useQuery } from "@tanstack/react-query";
import { referralRecordApi } from "../api/referralRecordApi";
import { queryKeys } from "@/lib/query/keys";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import type { ReferralRecordFilters } from "../types/referral-record.types";

const LIMIT = DEFAULT_PAGE_SIZE;

export function useReferralRecordList(filters: ReferralRecordFilters, page: number) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.referral.records.list({ page, limit: LIMIT, search: filters.search }),
    queryFn: () => referralRecordApi.getReferralRecords(filters, page),
  });

  const records = data?.data ?? [];
  const total = data?.pagination.totalItems ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.pagination.currentPage ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.pagination.itemsPerPage ?? LIMIT,
  };

  return {
    records,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
    refetch: () => {
      void refetch();
    },
  };
}
