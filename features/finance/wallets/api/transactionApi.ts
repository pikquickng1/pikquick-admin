import { USE_MOCKS } from "@/lib/config/feature-flags";
import type { WalletTransactionHistory } from "../types/transaction.types";

const MOCK_HISTORY_DELAY_MS = 300;
const MOCK_USER_NAME = "Adewale Johnson";
const MOCK_CURRENT_BALANCE = 15000;
const MOCK_TOTAL_TX = 24;

const MOCK_HISTORY: WalletTransactionHistory = {
  userId: "REQ001",
  userName: MOCK_USER_NAME,
  currentBalance: MOCK_CURRENT_BALANCE,
  totalTransactions: MOCK_TOTAL_TX,
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
  ],
};

export const transactionApi = {
  getTransactionHistory: async (_walletId: string): Promise<WalletTransactionHistory> => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_HISTORY_DELAY_MS));
      return MOCK_HISTORY;
    }
    throw new Error("Live wallet history endpoint not yet wired in the admin UI");
  },
};
