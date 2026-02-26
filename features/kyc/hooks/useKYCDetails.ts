"use client";

import { useState, useEffect } from "react";
import { KYCVerification } from "../types/kyc.types";
import { kycApi } from "../api/kycApi";

export function useKYCDetails(verificationId: string | null, status?: "pending" | "resubmission") {
  const [verification, setVerification] = useState<KYCVerification | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    if (!verificationId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await kycApi.getKYCById(verificationId, status);
      setVerification(data);
    } catch (err) {
      console.error("Failed to fetch KYC details:", err);
      setError("Failed to load KYC details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [verificationId, status]);

  return { verification, loading, error, refetch: fetchDetails };
}
