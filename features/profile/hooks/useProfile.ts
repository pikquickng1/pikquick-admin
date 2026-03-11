"use client";

import { useState, useEffect } from "react";
import { Profile, ActivityLog } from "../types/profile.types";
import { profileApi } from "../api/profileApi";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
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
    };

    fetchProfile();
  }, []);

  return {
    profile,
    activityLogs,
    loading,
  };
}
