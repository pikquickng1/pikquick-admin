"use client";

import { useState, useEffect } from "react";
import { ComplianceStats } from "../types/compliance.types";
import { complianceApi } from "../api/complianceApi";

export function useComplianceStats() {
  const [stats, setStats] = useState<ComplianceStats>({
    kycSummaryCount: 0,
    flaggedTransactions: 0,
    suspendedAccounts: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await complianceApi.getComplianceStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch compliance stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, refetch: fetchStats };
}
