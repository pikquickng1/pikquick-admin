"use client";

import { useState, useEffect } from "react";
import { RunnerListItem, RunnerListFilters } from "../types/runner-list.types";
import { runnerApi } from "../api/runnerApi";

export function useRunnerList(filters: RunnerListFilters, page: number = 1) {
  const [runners, setRunners] = useState<RunnerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchRunners = async () => {
      try {
        setLoading(true);
        const response = await runnerApi.getRunnersList(filters, page);
        setRunners(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch runners");
      } finally {
        setLoading(false);
      }
    };

    fetchRunners();
  }, [filters.search, filters.status, filters.sortBy, page]);

  return { runners, loading, error, pagination };
}
