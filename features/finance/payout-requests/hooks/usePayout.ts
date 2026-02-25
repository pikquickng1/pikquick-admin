"use client";

import { useState, useEffect } from "react";
import { PayoutRequestDetails } from "../types/payout.types";
import { payoutApi } from "../api/payoutApi";

export function usePayout(payoutId: string | null) {
  const [payout, setPayout] = useState<PayoutRequestDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPayout = async () => {
    if (!payoutId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await payoutApi.getPayoutById(payoutId);
      setPayout(data);
    } catch (err) {
      console.error("Failed to fetch payout request:", err);
      setError("Failed to load payout request details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayout();
  }, [payoutId]);

  return { payout, loading, error, refetch: fetchPayout };
}
