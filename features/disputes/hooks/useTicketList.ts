"use client";

import { useState, useEffect } from "react";
import { Ticket, TicketListFilters } from "../types/dispute.types";
import { disputeApi } from "../api/disputeApi";

export function useTicketList(filters: TicketListFilters, page = 1, pageSize = 10) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await disputeApi.getTickets(filters, page, pageSize);
        setTickets(response.tickets);
        setTotal(response.total);
      } catch (error) {
        console.error("Failed to fetch tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [filters.search, filters.priority, filters.category, filters.dateFrom, filters.dateTo, page, pageSize]);

  return { tickets, loading, total };
}
