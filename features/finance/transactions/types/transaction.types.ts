export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userType: "Requester" | "Runner";
  type: "Task Payment" | "Daily Access" | "Wallet Top-up" | "Refund" | "Withdrawal";
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface TransactionDetails extends Transaction {
  paymentGateway: string;
  gatewayResponse: {
    reference: string;
    gatewayStatus: string;
    processingFee: string;
    errorMessage?: string;
  };
}

export interface TransactionListFilters {
  search: string;
  type: string;
  status: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface TransactionListResponse {
  data: Transaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface TransactionStats {
  totalPlatformEarnings: number;
  dailyAccessPayments: number;
  taskPayments: number;
  refunds: number;
}
