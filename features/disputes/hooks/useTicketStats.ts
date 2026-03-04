"use client";

import { useState, useEffect } from "react";
import { TicketStats } from "../types/dispute.types";
import { disputeApi } from "../api/disputeApi";

export function useTicketStats() {
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await disputeApi.getTicketStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch ticket stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading };
}
