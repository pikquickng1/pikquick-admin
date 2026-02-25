export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
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
