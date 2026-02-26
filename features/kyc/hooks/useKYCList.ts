"use client";

import { useState, useEffect } from "react";
import { KYCVerification, KYCListFilters } from "../types/kyc.types";
import { kycApi } from "../api/kycApi";

export function useKYCList(
  status: "pending" | "resubmission",
  filters: KYCListFilters,
  page: number
) {
  const [verifications, setVerifications] = useState<KYCVerification[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8,
  });

  const fetchVerifications = async () => {
    try {
      setLoading(true);
      const response = await kycApi.getKYCList(status, filters, page);
      setVerifications(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch KYC verifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, [status, filters, page]);

  return { verifications, loading, pagination, refetch: fetchVerifications };
}
