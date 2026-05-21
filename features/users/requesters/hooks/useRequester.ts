"use client";

import { useState, useEffect } from "react";
import {
  Requester,
  RequesterWallet,
  RequesterTransaction,
  RequesterTaskHistory,
} from "../types/requester.types";
import { RequesterPayment } from "../types/payment.types";
import { requesterApi } from "../api/requesterApi";
import { requestersService } from "@/lib/services";

export function useRequester(id: string) {
  const [requester, setRequester] = useState<Requester | null>(null);
  const [wallet, setWallet] = useState<RequesterWallet | null>(null);
  const [transactions, setTransactions] = useState<RequesterTransaction[]>([]);
  const [taskHistory, setTaskHistory] = useState<RequesterTaskHistory[]>([]);
  const [payments, setPayments] = useState<RequesterPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequesterData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const [userRes, walletData, transactionsData, taskHistoryData, paymentsData] =
        await Promise.all([
          requestersService.getRequesterById(id),
          requesterApi.getRequesterWallet(id),
          requesterApi.getRequesterTransactions(id),
          requesterApi.getRequesterTaskHistory(id),
          requesterApi.getRequesterPayments(id),
        ]);

      setRequester(userRes.data);
      setWallet(walletData);
      setTransactions(transactionsData);
      setTaskHistory(taskHistoryData);
      setPayments(paymentsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch requester data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequesterData();
  }, [id]);

  return {
    requester,
    wallet,
    transactions,
    taskHistory,
    payments,
    loading,
    error,
    refetch: fetchRequesterData,
  };
}
