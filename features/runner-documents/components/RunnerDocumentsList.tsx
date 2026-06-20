"use client";

import { useState } from "react";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { LoadingState } from "@/components/ui/loading-state";
import { formatDate } from "@/lib/utils/date";
import { DocumentVerificationStatus, ALL_FILTER } from "@/lib/types/enums";
import { RunnerDocumentFilters } from "./RunnerDocumentFilters";
import { useRunnerDocumentsList } from "../hooks/useRunnerDocumentsList";
import { runnerDocumentsService } from "@/lib/services";
import type { RunnerDocument, RunnerDocumentFilters as Filters } from "../types/runner-document.types";
import { ID_DISPLAY_LENGTH } from "../types/runner-document.types";

interface DocumentPreviewModalProps {
  document: RunnerDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (id: string, status: "verified" | "rejected", reason?: string) => Promise<void>;
}

const REJECTION_REASON_ROWS = 3;

function DocumentPreviewModal({ document, isOpen, onClose, onVerify }: DocumentPreviewModalProps) {
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "rejected" | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen || !document) return null;

  const handleVerify = async () => {
    if (!verificationStatus) return;
    setIsVerifying(true);
    try {
      const status: "verified" | "rejected" = verificationStatus;
      await onVerify(document.id, status, status === "rejected" ? rejectionReason : undefined);
      onClose();
    } finally {
      setIsVerifying(false);
    }
  };

  const idDisplay = document.id.slice(0, ID_DISPLAY_LENGTH);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-text-primary">Document Preview</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FieldCol label="Document ID" value={`${idDisplay}…`} mono />
            <FieldCol
              label="Status"
              value={<StatusBadge status={document.verification_status} />}
            />
            <FieldCol
              label="Document Type"
              value={document.document_type_name || document.document_type_id}
            />
            <FieldCol label="Submitted" value={formatDate(document.submitted_at)} />
            {document.document_name && (
              <FieldCol label="Document Name" value={document.document_name} />
            )}
            {document.document_number && (
              <FieldCol label="Document Number" value={document.document_number} />
            )}
            {document.expiry_date && (
              <FieldCol label="Expiry Date" value={formatDate(document.expiry_date)} />
            )}
          </div>

          <div>
            <label className="text-sm text-text-secondary mb-2 block">Document Preview</label>
            <div className="border border-neutral-200 rounded-lg overflow-hidden">
              <div className="relative w-full h-[400px]">
                <Image
                  src={document.document_url}
                  alt="Document"
                  fill
                  unoptimized
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {document.rejection_reason && (
            <div className="bg-red-50 p-4 rounded-lg">
              <label className="text-sm text-red-600 font-medium">Rejection Reason</label>
              <p className="text-red-600">{document.rejection_reason}</p>
            </div>
          )}

          {document.verification_status === "pending" && (
            <div className="space-y-4 border-t border-neutral-200 pt-4">
              <label className="text-sm font-medium text-text-primary">Verify Document</label>
              <div className="flex gap-4">
                <Button
                  variant={verificationStatus === "verified" ? "default" : "outline"}
                  onClick={() => setVerificationStatus("verified")}
                  className={verificationStatus === "verified" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  Approve
                </Button>
                <Button
                  variant={verificationStatus === "rejected" ? "default" : "outline"}
                  onClick={() => setVerificationStatus("rejected")}
                  className={verificationStatus === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  Reject
                </Button>
              </div>

              {verificationStatus === "rejected" && (
                <div>
                  <label className="text-sm text-text-secondary">Rejection Reason</label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    rows={REJECTION_REASON_ROWS}
                    className="w-full mt-1 px-3 py-2 border border-neutral-200 rounded text-text-primary"
                  />
                </div>
              )}

              <Button
                onClick={handleVerify}
                disabled={!verificationStatus || (verificationStatus === "rejected" && !rejectionReason)}
                className="w-full"
              >
                {isVerifying ? "Verifying..." : "Submit Verification"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldCol({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-text-secondary">{label}</label>
      <p className={`text-text-primary ${mono ? "font-mono text-sm" : ""}`}>{value}</p>
    </div>
  );
}

export function RunnerDocumentsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState<RunnerDocument | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: ALL_FILTER,
    document_type_id: "",
  });

  const { documents, loading, total, error } = useRunnerDocumentsList(filters, currentPage);

  const handleViewDocument = (doc: RunnerDocument) => {
    setSelectedDocument(doc);
    setIsPreviewOpen(true);
  };

  const handleVerify = async (
    id: string,
    status: "verified" | "rejected",
    reason?: string,
  ) => {
    await runnerDocumentsService.verify(id, {
      verification_status: status,
      rejection_reason: reason,
    });
    setCurrentPage(1);
  };

  const columns = [
    {
      key: "id",
      header: "Document ID",
      render: (doc: RunnerDocument) => (
        <span className="text-sm text-text-primary font-mono">
          {doc.id.slice(0, ID_DISPLAY_LENGTH)}…
        </span>
      ),
    },
    {
      key: "runnerId",
      header: "Runner ID",
      render: (doc: RunnerDocument) => (
        <span className="text-sm text-text-primary">
          {doc.runner_id.slice(0, ID_DISPLAY_LENGTH)}…
        </span>
      ),
    },
    {
      key: "documentType",
      header: "Document Type",
      render: (doc: RunnerDocument) => (
        <span className="text-sm text-text-primary">
          {doc.document_type_name || doc.document_type_id}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (doc: RunnerDocument) => <StatusBadge status={doc.verification_status} />,
    },
    {
      key: "submitted",
      header: "Submitted",
      render: (doc: RunnerDocument) => (
        <span className="text-sm text-text-secondary">{formatDate(doc.submitted_at)}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (doc: RunnerDocument) => (
        <button
          onClick={() => handleViewDocument(doc)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View
        </button>
      ),
    },
  ];

  if (loading) {
    return <LoadingState label="Loading documents..." />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load documents</p>
      </div>
    );
  }

  const totalPages = Math.ceil(total / 10) || 1;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Runner Documents</h1>

      <div className="bg-white rounded border border-light overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <RunnerDocumentFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <DataTable
          columns={columns}
          data={documents as RunnerDocument[]}
          keyExtractor={(doc) => doc.id}
          emptyMessage="No documents found"
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showingFrom={(currentPage - 1) * 10 + 1}
          showingTo={Math.min(currentPage * 10, total)}
          totalItems={total}
        />
      )}

      <DocumentPreviewModal
        document={selectedDocument}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onVerify={handleVerify}
      />
    </div>
  );
}
