import { ALL_FILTER, WithdrawalStatus } from "@/lib/types/enums";

export type PayoutDisplayStatus = "Pending" | "Completed" | "Rejected";

export interface PayoutRequest {
  id: string;
  runnerId: string;
  runnerName: string;
  runnerRating: number;
  runnerTasks: number;
  amount: number;
  bankName: string;
  accountNumber: string;
  date: string;
  status: PayoutDisplayStatus;
}

export interface PayoutRequestDetails extends PayoutRequest {
  accountName: string;
  requestedDate: string;
  processedDate?: string;
  rejectionReason?: string;
}

export interface PayoutListFilters {
  search: string;
  status: WithdrawalStatus | typeof ALL_FILTER;
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface PayoutListResponse {
  data: PayoutRequest[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface PayoutStats {
  pendingRequests: number;
  approvedThisWeek: number;
  totalPendingAmount: number;
}
