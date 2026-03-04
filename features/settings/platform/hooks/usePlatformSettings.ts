"use client";

import { useState, useEffect } from "react";
import { PlatformSettings, TaskCategory } from "../types/platform-settings.types";
import { platformSettingsApi } from "../api/platformSettingsApi";

export function usePlatformSettings() {
  const [settings, setSettings] = useState<PlatformSettings>({
    accessFee: 100,
    platformCommission: 15,
  });
  const [categories, setCategories] = useState<TaskCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, categoriesData] = await Promise.all([
          platformSettingsApi.getSettings(),
          platformSettingsApi.getTaskCategories(),
        ]);
        setSettings(settingsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching platform settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateSettings = async (newSettings: PlatformSettings) => {
    try {
      await platformSettingsApi.updateSettings(newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return {
    settings,
    categories,
    loading,
    updateSettings,
    setSettings,
  };
}
