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

/**
 * The runner's overall verification state, across every required document.
 *
 * Distinct from the status of the document being reviewed. Showing only the
 * document made the dashboard look self-contradictory: two approved documents
 * read as "verified" here while the runners table still said "pending",
 * because a third required document had never been submitted.
 */
export interface RunnerVerificationSummary {
  status: KycStatus | "unverified" | null;
  requiredTotal: number;
  verifiedCount: number;
  /** Required document types not yet verified, by name. */
  outstanding: string[];
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
  runnerVerification?: RunnerVerificationSummary | null;
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
