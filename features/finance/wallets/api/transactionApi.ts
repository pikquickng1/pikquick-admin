import { WalletTransactionHistory } from "../types/transaction.types";

export const transactionApi = {
  getTransactionHistory: async (walletId: string): Promise<WalletTransactionHistory> => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      userId: "REQ001",
      userName: "Adewale Johnson",
      currentBalance: 15000,
      totalTransactions: 24,
      transactions: [
        {
          id: "TXN001",
          type: "debit",
          description: "Task Payment - Grocery Shopping",
          amount: 12500,
          balance: 15000,
          date: "2025-10-30T14:30:00.000Z",
          category: "Task Payment",
        },
        {
          id: "TXN002",
          type: "credit",
          description: "Wallet Top-up via Paystack",
          amount: 10000,
          balance: 17500,
          date: "2025-10-29T16:45:00.000Z",
          category: "Top-up",
        },
        {
          id: "TXN003",
          type: "debit",
          description: "Task Payment - Document Delivery",
          amount: 1200,
          balance: 7500,
          date: "2025-10-28T11:20:00.000Z",
          category: "Task Payment",
        },
        {
          id: "TXN004",
          type: "credit",
          description: "Refund - Cancelled Task",
          amount: 5000,
          balance: 8700,
          date: "2025-10-27T10:30:00.000Z",
          category: "Refund",
        },
        {
          id: "TXN005",
          type: "credit",
          description: "Refund - Cancelled Task",
          amount: 5000,
          balance: 8700,
          date: "2025-10-27T10:30:00.000Z",
          category: "Refund",
        },
        {
          id: "TXN006",
          type: "credit",
          description: "Refund - Cancelled Task",
          amount: 5000,
          balance: 8700,
          date: "2025-10-27T10:30:00.000Z",
          category: "Refund",
        },
        {
          id: "TXN007",
          type: "credit",
          description: "Refund - Cancelled Task",
          amount: 5000,
          balance: 8700,
          date: "2025-10-27T10:30:00.000Z",
          category: "Refund",
        },
      ],
    };
  },
};
