/**
 * KYC document status. The backend DB column stores lowercase strings
 * (`pending` | `verified` | `rejected`); `resubmission` is also written
 * directly to the column in `kyc.controller.ts:81`.
 *
 * This enum mirrors what's stored on the server. Use statusBadgeClass()
 * or <StatusBadge /> for display colors — never hardcode Tailwind classes.
 */
export type KycStatus = "pending" | "verified" | "rejected" | "resubmission";

export type KycTab = "pending" | "resubmission";

export interface KycDocument {
  idDocument?: string;
  proofOfAddress?: string;
  selfie?: string;
}

export interface KYCVerification {
  id: string;
  runnerName: string;
  idType: string;
  email: string;
  phone: string;
  dateSubmitted: string;
  status: KycStatus;
  documents?: KycDocument;
  rejectionReason?: string;
}

export interface KYCListFilters {
  search: string;
}

export interface KYCListResponse {
  data: KYCVerification[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface KYCStats {
  pendingVerifications: number;
  resubmissionRequests: number;
}
