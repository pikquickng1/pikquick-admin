"use client";

import { useState, useEffect } from "react";
import { ReferralData } from "../types/referral.types";
import { referralApi } from "../api/referralApi";

export function useReferralData() {
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const referralData = await referralApi.getReferralData();
      setData(referralData);
    } catch (err) {
      console.error("Failed to fetch referral data:", err);
      setError("Failed to load referral data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error, refetch: fetchData };
}
