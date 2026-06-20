import { UserStatus } from "@/lib/types/enums";

export type RequesterAccountStatus = UserStatus;

export interface Requester {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
  accountStatus: string;
  status: RequesterAccountStatus;
  balance: number;
  tasksPosted: number;
}

export interface RequesterTransaction {
  id: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  status: "completed" | "pending" | "failed";
}

export interface RequesterWallet {
  balance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  pendingAmount: number;
  recentTransactions?: RequesterTransaction[];
}

export interface RequesterTaskHistory {
  id: string;
  title: string;
  status: "completed" | "active" | "cancelled";
  amount: number;
  date: string;
}
