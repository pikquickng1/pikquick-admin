"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { supportTicketsService } from "@/lib/services/support-tickets.service";
import type { SupportTicketDetailResponse } from "@/lib/types";

export function useSupportTicketDetail(ticketId: string | null) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.supportTickets.detail(ticketId ?? ""),
    queryFn: () => supportTicketsService.getTicketById(ticketId!),
    enabled: !!ticketId,
  });

  return {
    ticket: (data ?? null) as SupportTicketDetailResponse | null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}
