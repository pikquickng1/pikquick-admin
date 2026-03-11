"use client";

import { useState, useEffect } from "react";
import { ActivityLog } from "../types/activity-log.types";
import { activityLogApi } from "../api/activityLogApi";

export function useActivityLog() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const response = await activityLogApi.getActivityLogs({ page, limit });
        setLogs(response.logs);
        setTotalPages(response.totalPages);
        setTotal(response.total);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [page]);

  return {
    logs,
    loading,
    page,
    setPage,
    totalPages,
    total,
    limit,
  };
}
