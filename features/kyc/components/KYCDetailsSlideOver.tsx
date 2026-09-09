"use client";

import { useState } from "react";
import { X, Download, FileText, ZoomIn, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useKYCDetails } from "../hooks/useKYCDetails";
import { kycApi } from "../api/kycApi";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import type { KYCVerification } from "../types/kyc.types";

interface KYCDetailsSlideOverProps {
  open: boolean;
  onClose: () => void;
  verificationId: string | null;
  onActionComplete?: () => void;
  isResubmission?: boolean;
}

const SLIDE_OVER_MAX_WIDTH = "w-full max-w-3xl" as const;
const BACKDROP_CLASS = "bg-black/30" as const;
const TEXTAREA_ROWS = 4;

const APPROVE_BTN_CLASS = "bg-green-500 hover:bg-green-600" as const;
const RESUBMIT_BTN_CLASS = "bg-blue-500 hover:bg-blue-600" as const;
const NEUTRAL_BTN_CLASS = "border border-gray-300 text-gray-700 hover:text-gray-900" as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function KYCDetailsSlideOver({
  open,
  onClose,
  verificationId,
  onActionComplete,
  isResubmission = false,
}: KYCDetailsSlideOverProps) {
  const { verification, loading } = useKYCDetails(verificationId);
  const [adminNotes, setAdminNotes] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [previewDocument, setPreviewDocument] = useState<{
    type: string;
    isImage: boolean;
  } | null>(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showResubmissionModal, setShowResubmissionModal] = useState(false);
  const [resubmissionMessage, setResubmissionMessage] = useState("");

  const handleDownloadDocuments = () => {
    const docs = verification?.documents;
    if (!docs) return;
    const urls = [docs.idDocument, docs.proofOfAddress, docs.selfie].filter(
      (u): u is string => Boolean(u),
    );
    urls.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  const handleApprove = async () => {
    if (!verification) return;
    setActionLoading(true);
    try {
      await kycApi.approveKYC(verification.id);
      setShowApproveModal(false);
      onActionComplete?.();
      onClose();
    } finally {
      setActionLoading(false);
    }
  };

  const handleRequestResubmission = async () => {
    if (!verification || !resubmissionMessage.trim()) return;
    setActionLoading(true);
    try {
      await kycApi.rejectKYC(verification.id, resubmissionMessage);
      setShowResubmissionModal(false);
      setResubmissionMessage("");
      onActionComplete?.();
      onClose();
    } finally {
      setActionLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <div
        className={`fixed inset-0 ${BACKDROP_CLASS} z-40 transition-opacity`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 ${SLIDE_OVER_MAX_WIDTH} bg-white shadow-xl z-50 overflow-hidden flex flex-col`}
      >
        <div className="px-6 py-5 border-b border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Runner Verification Details
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Review and manage KYC submission for {verification?.runnerName ?? "Runner"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadDocuments}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Download documents"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : verification ? (
            <KYCVerificationBody
              verification={verification}
              adminNotes={adminNotes}
              onAdminNotesChange={setAdminNotes}
              isResubmission={isResubmission}
              onPreviewDocument={setPreviewDocument}
            />
          ) : null}
        </div>

        {verification && (
          <FooterActions
            actionLoading={actionLoading}
            isResubmission={isResubmission}
            onClose={onClose}
            onRequestResubmission={() => setShowResubmissionModal(true)}
            onApprove={() => setShowApproveModal(true)}
          />
        )}
      </div>

      <DocumentPreviewModal
        open={!!previewDocument}
        onClose={() => setPreviewDocument(null)}
        documentType={previewDocument?.type ?? ""}
        isImage={previewDocument?.isImage}
        userInitials={verification ? getInitials(verification.runnerName) : ""}
      />

      <ApproveConfirmModal
        open={showApproveModal}
        verification={verification}
        loading={actionLoading}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApprove}
      />

      <ResubmissionModal
        open={showResubmissionModal}
        verification={verification}
        loading={actionLoading}
        message={resubmissionMessage}
        onMessageChange={setResubmissionMessage}
        onClose={() => {
          setShowResubmissionModal(false);
          setResubmissionMessage("");
        }}
        onConfirm={handleRequestResubmission}
      />
    </>
  );
}

function KYCVerificationBody({
  verification,
  adminNotes,
  onAdminNotesChange,
  isResubmission,
  onPreviewDocument,
}: {
  verification: KYCVerification;
  adminNotes: string;
  onAdminNotesChange: (v: string) => void;
  isResubmission: boolean;
  onPreviewDocument: (d: { type: string; isImage: boolean }) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-text-primary mb-4">Runner Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <FieldCol label="Name" value={verification.runnerName} />
          <FieldCol label="Email" value={verification.email} />
          <FieldCol label="Phone" value={verification.phone} />
          <FieldCol label="ID Type" value={verification.idType} />
        </div>
      </div>

      <DiditFindingsPanel verification={verification} />

      {isResubmission && verification.rejectionReason && (
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-3">Resubmission Reason</h3>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600">{verification.rejectionReason}</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-base font-semibold text-text-primary mb-4">Uploaded Documents</h3>
        <div className="grid grid-cols-3 gap-4">
          <DocumentCard
            label="Government ID"
            isImage={false}
            onPreview={() => onPreviewDocument({ type: "Government ID", isImage: false })}
            fallback={<FileText className="w-12 h-12 text-neutral-400 mb-2" />}
          />
          <DocumentCard
            label="Selfie"
            isImage
            onPreview={() => onPreviewDocument({ type: "Selfie", isImage: true })}
            fallback={
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-blue-500 text-white text-3xl">
                  {getInitials(verification.runnerName)}
                </AvatarFallback>
              </Avatar>
            }
          />
          <DocumentCard
            label="Address Proof"
            isImage={false}
            onPreview={() => onPreviewDocument({ type: "Address Proof", isImage: false })}
            fallback={<FileText className="w-12 h-12 text-neutral-400 mb-2" />}
          />
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-text-primary mb-4">Admin Notes</h3>
        <textarea
          value={adminNotes}
          onChange={(e) => onAdminNotesChange(e.target.value)}
          placeholder="Add review note here..."
          rows={TEXTAREA_ROWS}
          className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
}

function DocumentCard({
  label,
  isImage,
  onPreview,
  fallback,
}: {
  label: string;
  isImage: boolean;
  onPreview: () => void;
  fallback: React.ReactNode;
}) {
  return (
    <div className="border border-neutral-200 rounded-lg p-4">
      <p className="text-sm text-text-secondary mb-3">{label}</p>
      <div
        className={`bg-neutral-100 rounded-lg h-40 flex ${
          isImage ? "items-center" : "flex-col items-center justify-center"
        } mb-3`}
      >
        {fallback}
        {!isImage && <p className="text-xs text-neutral-500">Click to enlarge</p>}
      </div>
      <button
        onClick={onPreview}
        className="flex items-center justify-center gap-2 w-full text-sm text-text-secondary hover:text-text-primary"
      >
        <ZoomIn className="w-4 h-4" />
        Enlarge
      </button>
    </div>
  );
}

/**
 * Shows what the identity provider found, when a document went through Didit.
 *
 * Renders nothing for manually uploaded documents so the panel does not add
 * noise to the flow that has no provider behind it.
 *
 * The point of this panel: an "In Review" item is one Didit could not decide
 * on its own. Without the scores and warnings a reviewer is being asked to
 * re-adjudicate with strictly less information than the machine had.
 */
function DiditFindingsPanel({ verification }: { verification: KYCVerification }) {
  const method = verification.verificationMethod ?? "manual";
  if (method === "manual" && !verification.didit) return null;

  const d = verification.didit;
  const score = (v: number | null | undefined) =>
    typeof v === "number" ? `${v}%` : "—";

  return (
    <div>
      <h3 className="text-base font-semibold text-text-primary mb-3">
        Identity provider (Didit)
      </h3>
      <div className="bg-neutral-50 rounded-lg p-4 space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <FieldCol
            label="Decided by"
            value={
              method === "didit_auto"
                ? "Didit — automatic"
                : method === "didit_review"
                  ? "Didit — sent for review"
                  : "Manual upload"
            }
          />
          <FieldCol label="ID check" value={d?.idStatus ?? "—"} />
          <FieldCol label="Liveness" value={score(d?.livenessScore)} />
          <FieldCol label="Face match" value={score(d?.faceMatchScore)} />
        </div>

        {typeof d?.amlHits === "number" && d.amlHits > 0 && (
          <p className="text-sm text-amber-700">
            AML screening returned {d.amlHits} potential match
            {d.amlHits === 1 ? "" : "es"}.
          </p>
        )}

        {d?.warnings?.length ? (
          <ul className="list-disc pl-5 text-sm text-amber-700">
            {d.warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        ) : null}

        {verification.adminOverride && (
          <p className="text-sm text-blue-700">
            An admin overrode this result
            {verification.adminOverrideReason
              ? `: ${verification.adminOverrideReason}`
              : "."}
          </p>
        )}
      </div>
    </div>
  );
}

function FieldCol({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-text-secondary mb-1">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
}

function FooterActions({
  actionLoading,
  isResubmission,
  onClose,
  onRequestResubmission,
  onApprove,
}: {
  actionLoading: boolean;
  isResubmission: boolean;
  onClose: () => void;
  onRequestResubmission: () => void;
  onApprove: () => void;
}) {
  return (
    <div className="px-6 py-4 border-t border-neutral-200 bg-white">
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onClose}
          disabled={actionLoading}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg ${NEUTRAL_BTN_CLASS} disabled:opacity-50`}
        >
          Close
        </button>
        <button
          onClick={onRequestResubmission}
          disabled={actionLoading}
          className="px-6 py-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 rounded-full border border-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RefreshIcon />
          Request Resubmission
        </button>
        <button
          onClick={onApprove}
          disabled={actionLoading}
          className={`px-6 py-2.5 text-sm font-medium text-white rounded-full ${APPROVE_BTN_CLASS} disabled:opacity-50 flex items-center justify-center gap-2`}
        >
          <CheckIcon />
          {isResubmission ? "Approve Resubmission" : "Approve"}
        </button>
      </div>
    </div>
  );
}

function ApproveConfirmModal({
  open,
  verification,
  loading,
  onClose,
  onConfirm,
}: {
  open: boolean;
  verification: KYCVerification | null;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open || !verification) return null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md p-6 [&>button]:hidden">
        <div className="flex items-start justify-between mb-4">
          <DialogTitle className="text-lg font-semibold text-text-primary">
            Approve Verification
          </DialogTitle>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
            aria-label="Close"
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
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full border border-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-6 py-2 text-sm font-medium text-white rounded-full ${APPROVE_BTN_CLASS} disabled:opacity-50`}
          >
            {loading ? "Approving..." : "Approve Verification"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ResubmissionModal({
  open,
  verification,
  loading,
  message,
  onMessageChange,
  onClose,
  onConfirm,
}: {
  open: boolean;
  verification: KYCVerification | null;
  loading: boolean;
  message: string;
  onMessageChange: (v: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!open || !verification) return null;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md p-6 [&>button]:hidden">
        <div className="flex items-start justify-between mb-4">
          <div>
            <DialogTitle className="text-lg font-semibold text-text-primary">
              Request Resubmission
            </DialogTitle>
            <p className="text-sm text-text-secondary mt-1">
              Send a message to {verification.runnerName} requesting document resubmission
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Message to Runner
          </label>
          <textarea
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            placeholder="Please explain what documents need to be resubmitted and why..."
            rows={TEXTAREA_ROWS}
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className={`px-6 py-2 text-sm font-medium rounded-full ${NEUTRAL_BTN_CLASS} disabled:opacity-50`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading || !message.trim()}
            className={`px-6 py-2 text-sm font-medium text-white rounded-full ${RESUBMIT_BTN_CLASS} disabled:opacity-50`}
          >
            {loading ? "Sending..." : "Send Request"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function RefreshIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
