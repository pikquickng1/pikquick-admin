"use client";

import { useState, useEffect } from "react";
import { WalletStats } from "../types/wallet.types";
import { walletApi } from "../api/walletApi";

export function useWalletStats() {
  const [stats, setStats] = useState<WalletStats>({
    totalRequesterBalance: 0,
    totalRunnerBalance: 0,
    totalWallets: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await walletApi.getWalletStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch wallet stats:", err);
      setError("Failed to load wallet statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}
