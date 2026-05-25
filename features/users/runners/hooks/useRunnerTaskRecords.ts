"use client";

import { useState, useEffect } from "react";
import { runnerApi } from "../api/runnerApi";
import { RunnerTaskHistory } from "../types/runner.types";

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface UseRunnerTaskRecordsResult {
  data: RunnerTaskHistory[];
  pagination: Pagination;
  loading: boolean;
  error: string | null;
  setPage: (page: number) => void;
}

export function useRunnerTaskRecords(runnerId: string, initialPage = 1): UseRunnerTaskRecordsResult {
  const [data, setData] = useState<RunnerTaskHistory[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: initialPage,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Assume runnerApi.getRunnerTasksPaginated returns { data, pagination }
        const response = await runnerApi.getRunnerTasksPaginated(runnerId, page);
        if (!cancelled) {
          setData(response.data);
          setPagination(response.pagination);
        }
      } catch (err: any) {
        if (!cancelled) setError(err?.message || "Failed to fetch task records");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, [runnerId, page]);

  return { data, pagination, loading, error, setPage };
}