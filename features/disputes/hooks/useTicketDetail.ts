"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { disputeApi } from "../api/disputeApi";
import type { DisputeTicketDetail } from "../types/ticket-detail.types";

export function useTicketDetail(ticketId: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.disputes.detail(ticketId ?? ""),
    queryFn: () => disputeApi.getTicketById(ticketId!),
    enabled: !!ticketId,
  });

  return {
    ticket: (data ?? null) as DisputeTicketDetail | null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}
