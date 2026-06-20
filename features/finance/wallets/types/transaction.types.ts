import { WalletTxType } from "@/lib/types/enums";

export interface WalletTransaction {
  id: string;
  type: WalletTxType;
  description: string;
  amount: number;
  balance: number;
  date: string;
  category: string;
}

export interface WalletTransactionHistory {
  userId: string;
  userName: string;
  currentBalance: number;
  totalTransactions: number;
  transactions: WalletTransaction[];
}
