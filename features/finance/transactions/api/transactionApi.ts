import {
  Transaction,
  TransactionListFilters,
  TransactionListResponse,
  TransactionStats,
  TransactionDetails,
} from "../types/transaction.types";
import { transactionService } from "@/lib/services";

export const transactionApi = {
  getTransactionsList: async (
    filters: TransactionListFilters,
    page: number = 1
  ): Promise<TransactionListResponse> => {
    try {
      const response = await transactionService.getTransactions({
        page,
        pageSize: 10,
        search: filters.search,
        type: filters.type,
        status: filters.status,
        dateFrom: filters.dateRange?.from.toISOString(),
        dateTo: filters.dateRange?.to.toISOString(),
      });
      return response;
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      throw error;
    }
  },

  getTransactionById: async (id: string): Promise<TransactionDetails> => {
    try {
      const response = await transactionService.getTransactionById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch transaction detail:", error);
      throw error;
    }
  },

  getTransactionStats: async (): Promise<TransactionStats> => {
    try {
      const response = await transactionService.getTransactionStats();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch transaction stats:", error);
      throw error;
    }
  },

  downloadReceipt: async (transactionId: string): Promise<Blob> => {
    try {
      const response = await transactionService.downloadReceipt(transactionId);
      return response;
    } catch (error) {
      console.error("Failed to download receipt:", error);
      throw error;
    }
  },

  exportTransactions: async (
    filters: TransactionListFilters,
    format: "csv" | "excel" = "csv"
  ): Promise<Blob> => {
    try {
      const response = await transactionService.exportTransactions(
        {
          search: filters.search,
          type: filters.type,
          status: filters.status,
          dateFrom: filters.dateRange?.from.toISOString(),
          dateTo: filters.dateRange?.to.toISOString(),
        },
        format
      );
      return response;
    } catch (error) {
      console.error("Failed to export transactions:", error);
      throw error;
    }
  },
};
