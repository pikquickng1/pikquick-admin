"use client";

import { useState, useEffect } from "react";
import { supportTicketsService } from "@/lib/services";
import type { SupportTicket, SupportTicketsListParams, SupportTicketsListResponse } from "@/lib/types";

export function useSupportTicketsList(
  filters: SupportTicketsListParams = {},
  page = 1,
  pageSize = 10
) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response: SupportTicketsListResponse = await supportTicketsService.getTickets({
          ...filters,
          page,
          limit: pageSize,
        });
        setTickets(response.data);
        setTotal(response.total);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch support tickets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [filters.status, filters.priority, filters.assigned_to, filters.search, page, pageSize]);

  return { tickets, loading, total, error };
}