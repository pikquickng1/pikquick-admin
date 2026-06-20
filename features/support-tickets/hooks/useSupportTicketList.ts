"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { supportTicketsService } from "@/lib/services/support-tickets.service";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/lib/config/pagination";
import { statusToApi } from "@/lib/utils/status";
import type {
  SupportTicket,
  SupportTicketsListParams,
} from "@/lib/types";
import {
  ALL_FILTER,
  SupportTicketStatus,
  SupportTicketPriority,
} from "@/lib/types/enums";
import type { AllFilter } from "@/lib/types/enums";

export interface SupportTicketFilters {
  search: string;
  status?: SupportTicketStatus | AllFilter;
  priority?: SupportTicketPriority | AllFilter;
  assigned_to?: string;
}

const EMPTY_TICKETS: SupportTicket[] = [];

export function useSupportTicketsList(
  filters: SupportTicketFilters = { search: "" },
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE,
) {
  const params: SupportTicketsListParams = {
    page,
    limit: pageSize,
    search: filters.search || undefined,
    status: statusToApi(filters.status as string | undefined) as SupportTicketStatus | undefined,
    priority: statusToApi(filters.priority as string | undefined) as SupportTicketPriority | undefined,
    assigned_to: filters.assigned_to,
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.supportTickets.list(params),
    queryFn: () => supportTicketsService.getTickets(params),
  });

  return {
    tickets: data?.data ?? EMPTY_TICKETS,
    loading: isLoading,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 1,
    page: data?.page ?? page,
    pageSize: data?.limit ?? pageSize,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}

export function useSupportTicketStats() {
  // Not yet supported by the backend endpoint; surface zeroed stats until then.
  return {
    stats: { open: 0, in_progress: 0, resolved: 0, closed: 0, total: 0 },
    loading: false,
    error: null,
    refetch: () => {},
  };
}

export const DEFAULT_SUPPORT_TICKET_FILTERS: SupportTicketFilters = {
  search: "",
  status: ALL_FILTER,
  priority: ALL_FILTER,
};
