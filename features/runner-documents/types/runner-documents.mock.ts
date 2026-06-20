import { DocumentVerificationStatus } from "@/lib/types/enums";
import type { RunnerDocumentListItem } from "./runner-document.types";

/**
 * Mock fixture for `useRunnerDocumentsList` and the document-preview modal.
 * Used when `NEXT_PUBLIC_USE_MOCKS=true` so the runner-documents UI is
 * usable against environments where the backend `/runner-documents/*`
 * endpoints are not yet wired.
 */
export const MOCK_RUNNER_DOCUMENTS: RunnerDocumentListItem[] = [
  {
    id: "doc-001-abcdef-1234",
    runner_id: "run-001-john-doe",
    runner_name: "John Doe",
    document_type_id: "national_id",
    document_type_name: "National ID",
    document_name: "NIN Slip",
    document_number: "NIN-12345678901",
    document_url: "/placeholder/document-1.png",
    verification_status: DocumentVerificationStatus.PENDING,
    submitted_at: "2026-06-15T10:24:00.000Z",
  },
  {
    id: "doc-002-fedcba-5678",
    runner_id: "run-002-jane-smith",
    runner_name: "Jane Smith",
    document_type_id: "drivers_license",
    document_type_name: "Driver's License",
    document_name: "Driver's License",
    document_number: "DL-ABJ-998877",
    document_url: "/placeholder/document-2.png",
    verification_status: DocumentVerificationStatus.VERIFIED,
    submitted_at: "2026-06-10T08:00:00.000Z",
    verified_at: "2026-06-11T12:00:00.000Z",
    expiry_date: "2030-12-31",
  },
  {
    id: "doc-003-aaaaaa-9999",
    runner_id: "run-003-mike-jones",
    runner_name: "Mike Jones",
    document_type_id: "passport",
    document_type_name: "Passport",
    document_name: "International Passport",
    document_number: "A12345678",
    document_url: "/placeholder/document-3.png",
    verification_status: DocumentVerificationStatus.REJECTED,
    rejection_reason: "Document image is blurry; please resubmit.",
    submitted_at: "2026-06-08T15:42:00.000Z",
    expiry_date: "2029-06-08",
  },
];
