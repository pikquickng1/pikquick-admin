export type FlagStatus = "Flagged" | "Under Review" | "Resolved";

export interface FlaggedActivity {
  id: string;
  userId: string;
  userName: string;
  activitySummary: string;
  flaggedDate: string;
  flagStatus: FlagStatus;
  flagReason: string;
}

export interface FlaggedActivityDetails extends FlaggedActivity {
  totalAmount: number;
  transactionCount: number;
}

export interface ComplianceStats {
  kycSummaryCount: number;
  flaggedTransactions: number;
  suspendedAccounts: number;
}

export interface ComplianceListFilters {
  search: string;
  dateFrom?: string;
  dateTo?: string;
  status?: FlagStatus;
}

export interface ComplianceListResponse {
  data: FlaggedActivity[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
