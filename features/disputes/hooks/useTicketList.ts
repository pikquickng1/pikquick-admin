"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { disputeApi } from "../api/disputeApi";
import type {
  DisputeTicket,
  DisputeTicketListFilters,
  DisputeTicketStats,
} from "../types/dispute.types";

const EMPTY_TICKETS: DisputeTicket[] = [];

export function useTicketList(
  filters: DisputeTicketListFilters,
  page: number,
  pageSize: number,
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.disputes.list({ filters, page, pageSize }),
    queryFn: () => disputeApi.getTickets(filters, page, pageSize),
  });

  return {
    tickets: data?.tickets ?? EMPTY_TICKETS,
    loading: isLoading,
    total: data?.total ?? 0,
    pageSize: data?.pageSize ?? pageSize,
    totalPages: data?.totalPages ?? 1,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}

export function useTicketStats() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.disputes.stats(),
    queryFn: () => disputeApi.getTicketStats(),
  });

  const fallback: DisputeTicketStats = {
    openTickets: 0,
    inProgress: 0,
    resolved: 0,
  };

  return {
    stats: data ?? fallback,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}
