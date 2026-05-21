import type { DocumentVerificationStatus } from "@/lib/types";

export interface RunnerDocumentListItem {
  id: string;
  runner_id: string;
  runner_name?: string;
  document_type_id: string;
  document_type_name?: string;
  document_name?: string;
  document_number?: string;
  document_url: string;
  verification_status: DocumentVerificationStatus;
  rejection_reason?: string;
  submitted_at: string;
  verified_at?: string;
  expiry_date?: string;
}

export interface RunnerDocumentFilters {
  search: string;
  status: DocumentVerificationStatus | "all";
  document_type_id: string;
}

export interface RunnerDocumentStats {
  total: number;
  pending: number;
  verified: number;
  rejected: number;
}