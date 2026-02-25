"use client";

import { useState } from "react";
import { payoutApi } from "../api/payoutApi";

export function usePayoutActions() {
  const [loading, setLoading] = useState(false);

  const approvePayout = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      await payoutApi.approvePayout(id);
      return true;
    } catch (error) {
      console.error("Failed to approve payout:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const rejectPayout = async (id: string, reason: string): Promise<boolean> => {
    try {
      setLoading(true);
      await payoutApi.rejectPayout(id, reason);
      return true;
    } catch (error) {
      console.error("Failed to reject payout:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { approvePayout, rejectPayout, loading };
}
