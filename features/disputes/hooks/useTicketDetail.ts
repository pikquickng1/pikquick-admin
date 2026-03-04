"use client";

import { useState, useEffect } from "react";
import { TicketDetail } from "../types/ticket-detail.types";
import { ticketDetailApi } from "../api/ticketDetailApi";

export function useTicketDetail(ticketId: string | null) {
  const [ticket, setTicket] = useState<TicketDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ticketId) {
      setTicket(null);
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        const data = await ticketDetailApi.getTicketDetail(ticketId);
        setTicket(data);
      } catch (error) {
        console.error("Failed to fetch ticket detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  return { ticket, loading };
}
