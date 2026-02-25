"use client";

import { useState, useEffect } from "react";
import { TransactionStats } from "../types/transaction.types";
import { transactionApi } from "../api/transactionApi";

export function useTransactionStats() {
  const [stats, setStats] = useState<TransactionStats>({
    totalPlatformEarnings: 0,
    dailyAccessPayments: 0,
    taskPayments: 0,
    refunds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionApi.getTransactionStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch transaction stats:", err);
      setError("Failed to load transaction statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}
