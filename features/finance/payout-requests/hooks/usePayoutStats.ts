"use client";

import { useState, useEffect } from "react";
import { PayoutStats } from "../types/payout.types";
import { payoutApi } from "../api/payoutApi";

export function usePayoutStats() {
  const [stats, setStats] = useState<PayoutStats>({
    pendingRequests: 0,
    approvedThisWeek: 0,
    totalPendingAmount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await payoutApi.getPayoutStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch payout stats:", err);
      setError("Failed to load payout statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}
