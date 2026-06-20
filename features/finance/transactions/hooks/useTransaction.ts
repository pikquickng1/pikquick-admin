"use client";

import { useQuery } from "@tanstack/react-query";
import { transactionApi } from "../api/transactionApi";
import type { TransactionDetails } from "../types/transaction.types";

export function useTransaction(transactionId: string | null) {
  const query = useQuery({
    queryKey: ["transaction", transactionId],
    queryFn: () => transactionApi.getTransactionById(transactionId!),
    enabled: !!transactionId,
  });

  const downloadReceipt = async () => {
    if (!transactionId) return;
    const blob = await transactionApi.downloadReceipt(transactionId);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${transactionId}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return {
    transaction: (query.data ?? null) as TransactionDetails | null,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    refetch: () => {
      void query.refetch();
    },
    downloadReceipt,
  };
}
