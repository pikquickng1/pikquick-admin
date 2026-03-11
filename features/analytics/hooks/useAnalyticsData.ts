"use client";

import { useState, useEffect } from "react";
import { AnalyticsData } from "../types/analytics.types";
import { analyticsApi } from "../api/analyticsApi";

export function useAnalyticsData() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const analyticsData = await analyticsApi.getAnalyticsData();
        setData(analyticsData);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading };
}
