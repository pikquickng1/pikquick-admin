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
  status: "Pending" | "Completed" | "Rejected";
}

export interface PayoutRequestDetails extends PayoutRequest {
  accountName: string;
  requestedDate: string;
  processedDate?: string;
  rejectionReason?: string;
}

export interface PayoutListFilters {
  search: string;
  status: string;
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
