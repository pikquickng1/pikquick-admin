"use client";

import { useState, useEffect } from "react";
import { FlaggedActivityDetails } from "../types/compliance.types";
import { complianceApi } from "../api/complianceApi";

export function useFlaggedActivityDetails(activityId: string | null) {
  const [activity, setActivity] = useState<FlaggedActivityDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    if (!activityId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await complianceApi.getFlaggedActivityById(activityId);
      setActivity(data);
    } catch (err) {
      console.error("Failed to fetch activity details:", err);
      setError("Failed to load activity details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [activityId]);

  return { activity, loading, error, refetch: fetchDetails };
}
