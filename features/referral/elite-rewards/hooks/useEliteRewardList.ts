"use client";

import { useState, useEffect } from "react";
import { EliteReward, EliteRewardFilters } from "../types/elite-reward.types";
import { eliteRewardApi } from "../api/eliteRewardApi";

export function useEliteRewardList(filters: EliteRewardFilters, page: number) {
  const [rewards, setRewards] = useState<EliteReward[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8,
  });

  const fetchRewards = async () => {
    try {
      setLoading(true);
      const response = await eliteRewardApi.getEliteRewards(filters, page);
      setRewards(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch elite rewards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, [filters.search, filters.status, page]);

  return { rewards, loading, pagination, refetch: fetchRewards };
}
