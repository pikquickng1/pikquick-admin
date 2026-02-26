"use client";

import { X, Download, FileText, ZoomIn } from "lucide-react";
import { useState } from "react";
import { useKYCDetails } from "../hooks/useKYCDetails";
import { kycApi } from "../api/kycApi";
import { DocumentPreviewModal } from "./DocumentPreviewModal";

interface KYCDetailsSlideOverProps {
  open: boolean;
  onClose: () => void;
  verificationId: string | null;
  onActionComplete?: () => void;
  isResubmission?: boolean;
}

export function KYCDetailsSlideOver({
  open,
  onClose,
  verificationId,
  onActionComplete,
  isResubmission = false,
}: KYCDetailsSlideOverProps) {
  const { verification, loading } = useKYCDetails(
    verificationId,
    isResubmission ? "resubmission" : "pending"
  );
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<{
    type: string;
    isImage: boolean;
  } | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showResubmissionModal, setShowResubmissionModal] = useState(false);
  const [resubmissionMessage, setResubmissionMessage] = useState("");

  if (!open) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleApprove = async () => {
    if (!verification) return;
    try {
      setActionLoading(true);
      await kycApi.approveKYC(verification.id);
      setShowApproveModal(false);
      onActionComplete?.();
      onClose();
    } catch (error) {
      console.error("Failed to approve KYC:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestResubmission = async () => {
    if (!verification || !resubmissionMessage.trim()) return;
    try {
      setActionLoading(true);
      await kycApi.rejectKYC(verification.id, resubmissionMessage);
      setShowResubmissionModal(false);
      setResubmissionMessage("");
      onActionComplete?.();
      onClose();
    } catch (error) {
      console.error("Failed to request resubmission:", error);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 w-full max-w-3xl bg-white shadow-xl z-50 overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Runner Verification Details
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Review and manage KYC submission for {verification?.runnerName || "Runner"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => console.log("Download documents")}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : verification ? (
            <div className="space-y-6">
              {/* Runner Information */}
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-4">
                  Runner Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Name</p>
                    <p className="text-sm font-medium text-text-primary">{verification.runnerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Email</p>
                    <p className="text-sm font-medium text-text-primary">{verification.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Phone</p>
                    <p className="text-sm font-medium text-text-primary">{verification.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">ID Type</p>
                    <p className="text-sm font-medium text-text-primary">{verification.idType}</p>
                  </div>
                </div>
              </div>

              {/* Resubmission Reason (only for resubmission tab) */}
              {isResubmission && verification.rejectionReason && (
                <div>
                  <h3 className="text-base font-semibold text-text-primary mb-3">
                    Resubmission Reason
                  </h3>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-600">{verification.rejectionReason}</p>
                  </div>
                </div>
              )}

              {/* Uploaded Documents */}
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-4">
                  Uploaded Documents
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* Government ID */}
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <p className="text-sm text-text-secondary mb-3">Government ID</p>
                    <div className="bg-neutral-100 rounded-lg h-40 flex flex-col items-center justify-center mb-3">
                      <FileText className="w-12 h-12 text-neutral-400 mb-2" />
                      <p className="text-xs text-neutral-500">Click to enlarge</p>
                    </div>
                    <button
                      onClick={() => setPreviewDocument({ type: "Government ID", isImage: false })}
                      className="flex items-center justify-center gap-2 w-full text-sm text-text-secondary hover:text-text-primary"
                    >
                      <ZoomIn className="w-4 h-4" />
                      Enlarge
                    </button>
                  </div>

                  {/* Selfie */}
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <p className="text-sm text-text-secondary mb-3">Selfie</p>
                    <div className="bg-neutral-100 rounded-lg h-40 flex items-center justify-center mb-3">
                      <div className="bg-blue-500 rounded-full h-24 w-24 flex items-center justify-center">
                        <span className="text-white text-3xl font-semibold">
                          {getInitials(verification.runnerName)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setPreviewDocument({ type: "Selfie", isImage: true })}
                      className="flex items-center justify-center gap-2 w-full text-sm text-text-secondary hover:text-text-primary"
                    >
                      <ZoomIn className="w-4 h-4" />
                      Enlarge
                    </button>
                  </div>

                  {/* Address Proof */}
                  <div className="border border-neutral-200 rounded-lg p-4">
                    <p className="text-sm text-text-secondary mb-3">Address Proof</p>
                    <div className="bg-neutral-100 rounded-lg h-40 flex flex-col items-center justify-center mb-3">
                      <FileText className="w-12 h-12 text-neutral-400 mb-2" />
                      <p className="text-xs text-neutral-500">Click to enlarge</p>
                    </div>
                    <button
                      onClick={() => setPreviewDocument({ type: "Address Proof", isImage: false })}
                      className="flex items-center justify-center gap-2 w-full text-sm text-text-secondary hover:text-text-primary"
                    >
                      <ZoomIn className="w-4 h-4" />
                      Enlarge
                    </button>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-4">Admin Notes</h3>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add review note here..."
                  rows={4}
                  className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-white">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={onClose}
              disabled={actionLoading}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg border border-gray-300 disabled:opacity-50"
            >
              Close
            </button>
            <button
              onClick={() => setShowResubmissionModal(true)}
              disabled={actionLoading}
              className="px-6 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-full border border-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Request Resubmission
            </button>
            <button
              onClick={() => setShowApproveModal(true)}
              disabled={actionLoading}
              className="px-6 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-full disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {isResubmission ? "Approve Resubmission" : "Approve"}
            </button>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        open={!!previewDocument}
        onClose={() => setPreviewDocument(null)}
        documentType={previewDocument?.type || ""}
        isImage={previewDocument?.isImage}
        userInitials={verification ? getInitials(verification.runnerName) : ""}
      />

      {/* Approve Confirmation Modal */}
      {showApproveModal && verification && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Approve Verification</h3>
              <button
                onClick={() => setShowApproveModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-6">
              Are you sure you want to approve the KYC verification for {verification.runnerName}?
              This will grant them verified runner status.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full border border-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-full disabled:opacity-50"
              >
                {actionLoading ? "Approving..." : "Approve Verification"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Resubmission Modal */}
      {showResubmissionModal && verification && (
        <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Request Resubmission</h3>
                <p className="text-sm text-text-secondary mt-1">
                  Send a message to {verification.runnerName} requesting document resubmission
                </p>
              </div>
              <button
                onClick={() => setShowResubmissionModal(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Message to Runner
              </label>
              <textarea
                value={resubmissionMessage}
                onChange={(e) => setResubmissionMessage(e.target.value)}
                placeholder="Please explain what documents need to be resubmitted and why..."
                rows={4}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowResubmissionModal(false);
                  setResubmissionMessage("");
                }}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full border border-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestResubmission}
                disabled={actionLoading || !resubmissionMessage.trim()}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-full disabled:opacity-50"
              >
                {actionLoading ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
