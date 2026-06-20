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

/**
 * Mock flagged-activity fixtures used when `NEXT_PUBLIC_USE_MOCKS=true` so
 * the compliance UI is usable against environments where the backend
 * `/admin/compliance/*` endpoints are not yet wired.
 */
export const MOCK_FLAGGED_ACTIVITIES: FlaggedActivity[] = [
  {
    id: "flag-001",
    userId: "usr-001-jane-doe",
    userName: "Jane Doe",
    activitySummary: "12 transactions in 2 minutes (unusual velocity)",
    flaggedDate: "2026-06-18T11:24:00.000Z",
    flagStatus: FlagStatus.FLAGGED,
    flagReason: "Velocity anomaly",
  },
  {
    id: "flag-002",
    userId: "usr-002-mike-jones",
    userName: "Mike Jones",
    activitySummary: "Multiple failed withdrawal attempts from different IPs",
    flaggedDate: "2026-06-17T22:05:00.000Z",
    flagStatus: FlagStatus.UNDER_REVIEW,
    flagReason: "Suspicious withdrawal pattern",
  },
  {
    id: "flag-003",
    userId: "usr-003-sarah-lee",
    userName: "Sarah Lee",
    activitySummary: "Wallet funded from 3 different bank accounts",
    flaggedDate: "2026-06-15T08:42:00.000Z",
    flagStatus: FlagStatus.RESOLVED,
    flagReason: "Multi-source funding (verified)",
  },
];

export const MOCK_COMPLIANCE_STATS: ComplianceStats = {
  kycSummaryCount: 28,
  flaggedTransactions: 7,
  suspendedAccounts: 2,
};
