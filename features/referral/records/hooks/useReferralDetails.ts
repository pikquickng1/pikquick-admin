"use client";

import { useState, useEffect } from "react";
import { ReferralDetails } from "../types/referral-detail.types";
import { referralDetailApi } from "../api/referralDetailApi";

export function useReferralDetails(id: string | null) {
  const [details, setDetails] = useState<ReferralDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await referralDetailApi.getReferralDetails(id);
      setDetails(data);
    } catch (error) {
      console.error("Failed to fetch referral details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  return { details, loading, refetch: fetchDetails };
}
