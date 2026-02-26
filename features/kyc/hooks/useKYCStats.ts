"use client";

import { useState, useEffect } from "react";
import { KYCStats } from "../types/kyc.types";
import { kycApi } from "../api/kycApi";

export function useKYCStats() {
  const [stats, setStats] = useState<KYCStats>({
    pendingVerifications: 0,
    resubmissionRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await kycApi.getKYCStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch KYC stats:", err);
      setError("Failed to load KYC statistics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
}
