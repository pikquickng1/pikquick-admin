"use client";

import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "../api/transactionApi";
import { TRANSACTION_PAGE_SIZE } from "@/lib/config/pagination";
import { DEFAULT_PAGE } from "@/lib/config/pagination";
import type { TransactionListFilters } from "../types/transaction.types";

export function useTransactionList(filters: TransactionListFilters, page: number = DEFAULT_PAGE) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["transactions", filters, page],
    queryFn: () => transactionApi.getTransactionsList(filters, page),
  });

  return {
    transactions: data?.data ?? [],
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination: data?.pagination ?? {
      currentPage: page,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: TRANSACTION_PAGE_SIZE,
    },
    refetch: () => {
      void refetch();
    },
  };
}
