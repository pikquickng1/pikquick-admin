"use client";

import { useState, useEffect } from "react";
import { EliteRewardStats } from "../types/elite-reward.types";
import { eliteRewardApi } from "../api/eliteRewardApi";

export function useEliteRewardStats() {
  const [stats, setStats] = useState<EliteRewardStats>({
    awaitingReview: 0,
    approvedMTD: 0,
    totalElitePayouts: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await eliteRewardApi.getEliteRewardStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch elite reward stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, refetch: fetchStats };
}
