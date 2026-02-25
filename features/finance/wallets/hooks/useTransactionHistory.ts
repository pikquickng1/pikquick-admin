"use client";

import { useState, useEffect } from "react";
import { WalletTransactionHistory } from "../types/transaction.types";
import { transactionApi } from "../api/transactionApi";

export function useTransactionHistory(walletId: string | null) {
  const [history, setHistory] = useState<WalletTransactionHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (!walletId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await transactionApi.getTransactionHistory(walletId);
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch transaction history:", err);
      setError("Failed to load transaction history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [walletId]);

  return { history, loading, error, refetch: fetchHistory };
}
