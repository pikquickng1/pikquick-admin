"use client";

import { useState, useEffect } from "react";
import { RevenueData } from "../types/revenue.types";
import { revenueApi } from "../api/revenueApi";

export function useRevenueData() {
  const [data, setData] = useState<RevenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const revenueData = await revenueApi.getRevenueData();
      setData(revenueData);
    } catch (err) {
      console.error("Failed to fetch revenue data:", err);
      setError("Failed to load revenue data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
