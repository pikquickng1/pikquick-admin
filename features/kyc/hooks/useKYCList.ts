"use client";

import { useQuery } from "@tanstack/react-query";
import { kycApi } from "../api/kycApi";
import { queryKeys } from "@/lib/query/keys";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { KycTab } from "../types/kyc.types";

const LIMIT = DEFAULT_PAGE_SIZE;

export function useKYCList(
  status: KycTab,
  filters: { search: string },
  page: number,
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.kyc.list({ status, search: filters.search, page }),
    queryFn: () => kycApi.getKYCList(status, filters, page),
  });

  const pagination = {
    currentPage: data?.pagination.currentPage ?? page,
    totalPages: data?.pagination.totalPages ?? 1,
    totalItems: data?.pagination.totalItems ?? 0,
    itemsPerPage: data?.pagination.itemsPerPage ?? LIMIT,
  };

  return {
    verifications: data?.data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
    refetch: () => {
      void refetch();
    },
  };
}
