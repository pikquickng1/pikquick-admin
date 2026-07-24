"use client";

import { useState, useEffect, useCallback } from "react";
import { Profile, ActivityLog } from "../types/profile.types";
import { profileApi } from "../api/profileApi";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const [profileData, logsData] = await Promise.all([
        profileApi.getProfile(),
        profileApi.getActivityLogs(),
      ]);
      setProfile(profileData);
      setActivityLogs(logsData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProfile();
  }, [fetchProfile]);

  return {
    profile,
    activityLogs,
    loading,
    refetch: fetchProfile,
  };
}
