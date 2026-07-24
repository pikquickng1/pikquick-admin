import { ALL_FILTER, FlagStatus } from "@/lib/types/enums";

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
  status?: FlagStatus | typeof ALL_FILTER;
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

/** Mock fallback officers (no backend endpoint yet). */
export const MOCK_COMPLIANCE_OFFICERS = [
  { id: "officer1", name: "John Doe" },
  { id: "officer2", name: "Jane Smith" },
  { id: "officer3", name: "Mike Johnson" },
] as const;
