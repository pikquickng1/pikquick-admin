export interface Runner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
  verification: "Verified" | "Pending" | "Failed";
  status: "Available" | "Unavailable" | "Suspended";
  balance: number;
  dailyFee: number;
  rating: number;
  totalReviews: number;
  tasksCompleted: number;
}

export interface RunnerTransaction {
  id: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  status: "completed" | "pending" | "failed";
}

export interface RunnerWallet {
  balance: number;
  totalEarnings: number;
  totalWithdrawals: number;
  pendingAmount: number;
}

export interface RunnerTaskHistory {
  id: string;
  title: string;
  status: "completed" | "active" | "cancelled";
  amount: number;
  date: string;
  requesterName: string;
}
