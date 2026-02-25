"use client";

import { useState, useEffect } from "react";
import { TransactionDetails } from "../types/transaction.types";
import { transactionApi } from "../api/transactionApi";

export function useTransaction(transactionId: string | null) {
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransaction = async () => {
    if (!transactionId) return;

    try {
      setLoading(true);
      setError(null);
      const data = await transactionApi.getTransactionById(transactionId);
      setTransaction(data);
    } catch (err) {
      console.error("Failed to fetch transaction:", err);
      setError("Failed to load transaction details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [transactionId]);

  const downloadReceipt = async () => {
    if (!transactionId) return;

    try {
      const blob = await transactionApi.downloadReceipt(transactionId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `receipt-${transactionId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Failed to download receipt:", err);
    }
  };

  return { transaction, loading, error, refetch: fetchTransaction, downloadReceipt };
}
