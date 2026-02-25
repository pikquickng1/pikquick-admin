"use client";

import { useState, useEffect } from "react";
import { Transaction, TransactionListFilters } from "../types/transaction.types";
import { transactionApi } from "../api/transactionApi";

export function useTransactionList(filters: TransactionListFilters, page: number) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8,
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await transactionApi.getTransactionsList(filters, page);
      setTransactions(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filters, page]);

  return { transactions, loading, pagination, refetch: fetchTransactions };
}
