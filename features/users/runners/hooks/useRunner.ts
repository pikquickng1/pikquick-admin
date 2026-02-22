"use client";

import { useState, useEffect } from "react";
import { Runner, RunnerWallet, RunnerTransaction, RunnerTaskHistory } from "../types/runner.types";
import { runnerApi } from "../api/runnerApi";

export function useRunner(id: string) {
  const [runner, setRunner] = useState<Runner | null>(null);
  const [wallet, setWallet] = useState<RunnerWallet | null>(null);
  const [transactions, setTransactions] = useState<RunnerTransaction[]>([]);
  const [taskHistory, setTaskHistory] = useState<RunnerTaskHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRunnerData = async () => {
    try {
      setLoading(true);
      const [runnerData, walletData, transactionsData, taskHistoryData] = await Promise.all([
        runnerApi.getRunnerById(id),
        runnerApi.getRunnerWallet(id),
        runnerApi.getRunnerTransactions(id),
        runnerApi.getRunnerTaskHistory(id),
      ]);

      setRunner(runnerData);
      setWallet(walletData);
      setTransactions(transactionsData);
      setTaskHistory(taskHistoryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch runner data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchRunnerData();
    }
  }, [id]);

  return { runner, wallet, transactions, taskHistory, loading, error, refetch: fetchRunnerData };
}
