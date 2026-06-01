"use client";

import { useState } from "react";
import Image from "next/image";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { RunnerDocumentFilters } from "./RunnerDocumentFilters";
import { useRunnerDocumentsList } from "../hooks/useRunnerDocumentsList";
import { runnerDocumentsService } from "@/lib/services";
import type { RunnerDocument, DocumentVerificationStatus } from "@/lib/types";

function getStatusColor(status: DocumentVerificationStatus): string {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-600";
    case "pending":
      return "bg-yellow-100 text-yellow-600";
    case "rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function formatStatus(status: DocumentVerificationStatus): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface DocumentPreviewModalProps {
  document: RunnerDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onVerify: (id: string, status: "verified" | "rejected", reason?: string) => Promise<void>;
}

function DocumentPreviewModal({ document, isOpen, onClose, onVerify }: DocumentPreviewModalProps) {
  const [verificationStatus, setVerificationStatus] = useState<"verified" | "rejected" | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen || !document) return null;

  const handleVerify = async () => {
    if (!verificationStatus) return;
    setIsVerifying(true);
    try {
      await onVerify(document.id, verificationStatus, verificationStatus === "rejected" ? rejectionReason : undefined);
      onClose();
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setIsVerifying(false);
    }
  };

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
            <div>
              <label className="text-sm text-text-secondary">Document ID</label>
              <p className="text-text-primary font-mono text-sm">{document.id.slice(0, 8)}...</p>
            </div>
            <div>
              <label className="text-sm text-text-secondary">Status</label>
              <p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(document.verification_status)}`}>
                  {formatStatus(document.verification_status)}
                </span>
              </p>
            </div>
            <div>
              <label className="text-sm text-text-secondary">Document Type</label>
              <p className="text-text-primary">{document.document_type_name || document.document_type_id}</p>
            </div>
            <div>
              <label className="text-sm text-text-secondary">Submitted</label>
              <p className="text-text-primary">{formatDate(document.submitted_at)}</p>
            </div>
            {document.document_name && (
              <div>
                <label className="text-sm text-text-secondary">Document Name</label>
                <p className="text-text-primary">{document.document_name}</p>
              </div>
            )}
            {document.document_number && (
              <div>
                <label className="text-sm text-text-secondary">Document Number</label>
                <p className="text-text-primary">{document.document_number}</p>
              </div>
            )}
            {document.expiry_date && (
              <div>
                <label className="text-sm text-text-secondary">Expiry Date</label>
                <p className="text-text-primary">{formatDate(document.expiry_date)}</p>
              </div>
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
                    rows={3}
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

export function RunnerDocumentsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedDocument, setSelectedDocument] = useState<RunnerDocument | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [filters, setFilters] = useState<{
    search?: string;
    status?: DocumentVerificationStatus | "all";
    document_type_id?: string;
  }>({
    search: "",
    status: "all",
  });

  const { documents, loading, total, error } = useRunnerDocumentsList(
    {
      search: filters.search,
      verification_status: filters.status === "all" ? undefined : filters.status,
      document_type_id: filters.document_type_id,
    },
    currentPage,
    pageSize
  );

  const handleViewDocument = (doc: RunnerDocument) => {
    setSelectedDocument(doc);
    setIsPreviewOpen(true);
  };

  const handleVerify = async (id: string, status: "verified" | "rejected", reason?: string) => {
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
        <span className="text-sm text-text-primary font-mono">{doc.id.slice(0, 8)}...</span>
      ),
    },
    {
      key: "runnerId",
      header: "Runner ID",
      render: (doc: RunnerDocument) => (
        <span className="text-sm text-text-primary">{doc.runner_id.slice(0, 8)}...</span>
      ),
    },
    {
      key: "documentType",
      header: "Document Type",
      render: (doc: RunnerDocument) => (
        <span className="text-sm text-text-primary">{doc.document_type_name || doc.document_type_id}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (doc: RunnerDocument) => (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.verification_status)}`}>
          {formatStatus(doc.verification_status)}
        </span>
      ),
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

  const totalPages = Math.ceil(total / pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load documents</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Runner Documents</h1>

      <div className="bg-white rounded border border-light overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <RunnerDocumentFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <DataTable
          columns={columns}
          data={documents}
          keyExtractor={(doc) => doc.id}
          emptyMessage="No documents found"
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showingFrom={(currentPage - 1) * pageSize + 1}
          showingTo={Math.min(currentPage * pageSize, total)}
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