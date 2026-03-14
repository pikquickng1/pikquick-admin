"use client";

import { useState, useEffect } from "react";
import { ReferralSettings } from "../types/referral-settings.types";
import { referralSettingsApi } from "../api/referralSettingsApi";

export function useReferralSettings() {
  const [settings, setSettings] = useState<ReferralSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await referralSettingsApi.getSettings();
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch referral settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, refetch: fetchSettings };
}
