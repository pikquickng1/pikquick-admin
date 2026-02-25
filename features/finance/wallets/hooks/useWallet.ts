"use client";

import { useState, useEffect } from "react";
import { WalletDetails } from "../types/wallet.types";
import { walletApi } from "../api/walletApi";

export function useWallet(walletId: string | null) {
  const [wallet, setWallet] = useState<WalletDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = async () => {
    if (!walletId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await walletApi.getWalletById(walletId);
      setWallet(data);
    } catch (err) {
      console.error("Failed to fetch wallet:", err);
      setError("Failed to load wallet details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [walletId]);

  return { wallet, loading, error, refetch: fetchWallet };
}
