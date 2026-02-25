"use client";

import { useState, useEffect } from "react";
import { PayoutRequest, PayoutListFilters } from "../types/payout.types";
import { payoutApi } from "../api/payoutApi";

export function usePayoutList(filters: PayoutListFilters, page: number) {
  const [payouts, setPayouts] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6,
  });

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const response = await payoutApi.getPayoutsList(filters, page);
      setPayouts(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch payout requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, [filters, page]);

  return { payouts, loading, pagination, refetch: fetchPayouts };
}
