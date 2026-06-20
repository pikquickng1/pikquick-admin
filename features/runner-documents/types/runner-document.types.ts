import { ALL_FILTER, DocumentVerificationStatus } from "@/lib/types/enums";
import type { RunnerDocument } from "@/lib/types";

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
  status: DocumentVerificationStatus | typeof ALL_FILTER;
  document_type_id: string;
}

export interface RunnerDocumentStats {
  total: number;
  pending: number;
  verified: number;
  rejected: number;
}

export type { RunnerDocument };

/** Magic number: how many characters of a UUID to show in the table cells. */
export const ID_DISPLAY_LENGTH = 8;
