"use client";

import { useState, useEffect } from "react";
import { EliteRewardDetail } from "../types/elite-reward-detail.types";
import { eliteRewardDetailApi } from "../api/eliteRewardDetailApi";

export function useEliteRewardDetail(id: string | null) {
  const [detail, setDetail] = useState<EliteRewardDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await eliteRewardDetailApi.getEliteRewardDetail(id);
      setDetail(data);
    } catch (error) {
      console.error("Failed to fetch elite reward detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  return { detail, loading, refetch: fetchDetail };
}
