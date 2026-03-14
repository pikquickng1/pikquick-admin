"use client";

import { useState, useEffect } from "react";
import { FlaggedActivity, ComplianceListFilters } from "../types/compliance.types";
import { complianceApi } from "../api/complianceApi";

export function useComplianceList(filters: ComplianceListFilters, page: number) {
  const [activities, setActivities] = useState<FlaggedActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8,
  });

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await complianceApi.getFlaggedActivities(filters, page);
      setActivities(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch flagged activities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [filters.search, filters.dateFrom, filters.dateTo, filters.status, page]);

  return { activities, loading, pagination, refetch: fetchActivities };
}
