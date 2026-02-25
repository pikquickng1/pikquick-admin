/**
 * Runner documents (KYC) admin API types
 */

import type { DocumentVerificationStatus } from "./enums";

export interface RunnerDocument {
  id: string;
  runner_id: string;
  document_type_id: string;
  document_url: string;
  verification_status: DocumentVerificationStatus;
  rejection_reason?: string;
  submitted_at: string;
  verified_at?: string;
  [key: string]: unknown;
}

export interface RunnerDocumentFilterParams {
  runner_id?: string;
  document_type_id?: string;
  verification_status?: string;
  search?: string;
}

export interface RunnerVerificationSummary {
  total_required: number;
  total_submitted: number;
  total_verified: number;
  total_rejected: number;
  is_fully_verified: boolean;
}

export interface VerifyRunnerDocumentDto {
  verification_status: "verified" | "rejected";
  rejection_reason?: string;
}
