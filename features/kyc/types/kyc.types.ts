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

/** How a document reached its current status. */
export type VerificationMethod = "manual" | "didit_auto" | "didit_review";

/**
 * What the Didit provider reported, when the document went through them.
 *
 * Shown to reviewers so an "In Review" item arrives with the evidence behind
 * it rather than asking a human to re-decide from nothing. Every field is
 * nullable: which checks run depends on the Didit workflow configuration.
 */
export interface DiditFindings {
  livenessScore: number | null;
  faceMatchScore: number | null;
  idStatus: string | null;
  amlHits: number | null;
  warnings: string[];
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
  verificationMethod?: VerificationMethod;
  diditSessionId?: string | null;
  adminOverride?: boolean;
  adminOverrideReason?: string | null;
  didit?: DiditFindings | null;
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
