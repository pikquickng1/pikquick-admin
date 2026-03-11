"use client";

import { useState, useEffect } from "react";
import { ReferralRecord, ReferralRecordFilters } from "../types/referral-record.types";
import { referralRecordApi } from "../api/referralRecordApi";

export function useReferralRecordList(filters: ReferralRecordFilters, page: number) {
  const [records, setRecords] = useState<ReferralRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 5,
  });

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await referralRecordApi.getReferralRecords(filters, page);
      setRecords(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch referral records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [filters.search, filters.dateFrom, filters.dateTo, filters.status, page]);

  return { records, loading, pagination, refetch: fetchRecords };
}
