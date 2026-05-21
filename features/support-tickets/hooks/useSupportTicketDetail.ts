"use client";

import { useState, useEffect } from "react";
import { supportTicketsService } from "@/lib/services";
import type { SupportTicketDetailResponse } from "@/lib/types";

export function useSupportTicketDetail(ticketId: string | null) {
  const [ticket, setTicket] = useState<SupportTicketDetailResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!ticketId) {
      setTicket(null);
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        const data = await supportTicketsService.getTicketById(ticketId);
        setTicket(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch support ticket detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  return { ticket, loading, error };
}