import {
  ALL_FILTER,
  TransactionStatus,
  TransactionType,
  UserType,
} from "@/lib/types/enums";

export type TransactionDisplayStatus = "Completed" | "Pending" | "Failed";
export type TransactionDisplayType =
  | "Task Payment"
  | "Daily Access"
  | "Wallet Top-up"
  | "Refund"
  | "Withdrawal";

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userType: UserType;
  type: TransactionDisplayType;
  amount: number;
  date: string;
  status: TransactionDisplayStatus;
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
  type: TransactionType | typeof ALL_FILTER;
  status: TransactionStatus | typeof ALL_FILTER;
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
