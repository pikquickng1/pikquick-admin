"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import { LoadingState } from "@/components/ui/loading-state";
import { formatNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import { statusBadgeClass } from "@/lib/utils/status";
import { ReferralStatus } from "@/lib/types/enums";
import { useReferralDetails } from "../hooks/useReferralDetails";
import { referralDetailApi } from "../api/referralDetailApi";

interface ReferralDetailsPageProps {
  referralId: string;
}

const REFERRAL_RECORDS_ROUTE = "/dashboard/referral/records";
const NOTES_PLACEHOLDER = "Add internal notes about this referral...";
const NOTES_ROWS = 6;

const FRAUD_ICON_CLASS = "w-5 h-5" as const;
const FRAUD_OUTCOMES = {
  safe: <CheckCircle className={`${FRAUD_ICON_CLASS} text-green-500`} />,
  warning: <AlertCircle className={`${FRAUD_ICON_CLASS} text-orange-500`} />,
  danger: <AlertCircle className={`${FRAUD_ICON_CLASS} text-red-500`} />,
} as const;

const FRAUD_ICON_TONE_CLASS = {
  safe: "text-green-600",
  warning: "text-orange-600",
  danger: "text-red-600",
} as const;

function getFraudIcon(outcome: string) {
  return (FRAUD_OUTCOMES as Record<string, React.ReactNode>)[outcome] ?? (
    <Info className={`${FRAUD_ICON_CLASS} text-gray-500`} />
  );
}

function getFraudColor(outcome: string) {
  return (FRAUD_ICON_TONE_CLASS as Record<string, string>)[outcome] ?? "text-gray-600";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function ReferralDetailsPage({ referralId }: ReferralDetailsPageProps) {
  const router = useRouter();
  const { details, loading } = useReferralDetails(referralId);
  const [internalNotes, setInternalNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDisqualifyModal, setShowDisqualifyModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleSaveNotes = async () => {
    setSaving(true);
    try {
      await referralDetailApi.updateInternalNotes(referralId, internalNotes);
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      await referralDetailApi.approveReferral(referralId);
      setShowApproveModal(false);
      router.push(REFERRAL_RECORDS_ROUTE);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisqualify = async () => {
    setActionLoading(true);
    try {
      await referralDetailApi.disqualifyReferral(referralId);
      setShowDisqualifyModal(false);
      router.push(REFERRAL_RECORDS_ROUTE);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingState label="Loading referral details..." />;
  }

  if (!details) return null;

  const qualifications = details.fraudIndicators.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(REFERRAL_RECORDS_ROUTE)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
        >
          <Info className="w-4 h-4" />
          <span className="text-sm">Back to records</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDisqualifyModal(true)}
            className="px-6 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50"
          >
            Disqualify Referral
          </button>
          <button
            onClick={() => setShowApproveModal(true)}
            className="px-6 py-2.5 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
          >
            Approve Referral
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <p className="text-xs text-text-secondary uppercase tracking-wide mb-4">
              REFERRER PROFILE
            </p>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-blue-600">
                  {getInitials(details.referrer.name)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {details.referrer.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {details.referrer.id} • {details.referrer.role.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow icon={<Mail className="w-4 h-4" />} value={details.referrer.email} />
              <FieldRow icon={<Phone className="w-4 h-4" />} value={details.referrer.phone} />
              <FieldRow
                icon={<Calendar className="w-4 h-4" />}
                value={`Joined ${formatDate(details.referrer.joinedDate)}`}
              />
              <div>
                <p className="text-sm text-text-secondary">Total Referrals</p>
                <p className="text-2xl font-semibold text-text-primary">
                  {details.referrer.totalReferrals}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <p className="text-xs text-text-secondary uppercase tracking-wide mb-4">
              REFERRED USER PROFILE
            </p>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-green-600">
                  {getInitials(details.referredUser.name)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {details.referredUser.name}
                </h3>
                <p className="text-sm text-text-secondary">
                  {details.referredUser.id} • {details.referredUser.role.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FieldRow icon={<Mail className="w-4 h-4" />} value={details.referredUser.email} />
              <FieldRow icon={<Phone className="w-4 h-4" />} value={details.referredUser.phone} />
              <FieldRow
                icon={<Calendar className="w-4 h-4" />}
                value={`Joined ${formatDate(details.referredUser.joinedDate)}`}
              />
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <div className="mt-1">
                  <StatusBadge status={details.referredUser.status} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-base font-semibold text-text-primary mb-6">
              REFERRAL JOURNEY TIMELINE
            </h3>
            <div className="space-y-4">
              {details.timeline.map((event, index) => (
                <div key={event.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    {index < details.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className="text-sm font-medium text-text-primary">{event.event}</p>
                    <p className="text-xs text-text-secondary mt-1">{event.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {details.qualificationTask && (
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-text-primary">
                  QUALIFICATION TASK DETAILS
                </h3>
                <StatusBadge
                  status={details.qualificationTask.status}
                  label={details.qualificationTask.status}
                />
              </div>
              <div className="grid grid-cols-4 gap-6">
                <FieldCol label="TASK ID" value={details.qualificationTask.taskId} />
                <FieldCol label="SERVICE TYPE" value={details.qualificationTask.serviceType} />
                <FieldCol
                  label="TOTAL PAID"
                  value={formatNgn(details.qualificationTask.totalPaid)}
                />
                <FieldCol
                  label="COMPLETION DATE"
                  value={formatDate(details.qualificationTask.completionDate)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-semibold text-text-primary">FRAUD INDICATORS</h3>
            </div>
            <div className="space-y-4">
              {details.fraudIndicators.map((indicator, index) => (
                <div key={`${indicator.type}-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-text-primary">{indicator.label}</p>
                    {getFraudIcon(indicator.status)}
                  </div>
                  <p className={`text-sm font-medium ${getFraudColor(indicator.status)}`}>
                    {indicator.value}
                  </p>
                  {index < qualifications - 1 && (
                    <div className="border-b border-neutral-200 mt-4" />
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex items-start gap-2 text-blue-600">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p className="text-xs">
                    No suspicious IP clusters or device IDs detected for this referral chain.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-base font-semibold text-text-primary mb-4">INTERNAL NOTES</h3>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder={NOTES_PLACEHOLDER}
              rows={NOTES_ROWS}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
            />
            <button
              onClick={handleSaveNotes}
              disabled={saving}
              className="w-full px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Notes"}
            </button>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-base font-semibold text-text-primary mb-4">SYSTEM METADATA</h3>
            <div className="space-y-3">
              <FieldCol
                label="Referral ID:"
                value={details.systemMetadata.referralId}
              />
              <FieldCol
                label="Tracking Code:"
                value={details.systemMetadata.trackingCode}
              />
              <FieldCol
                label="UTM Source:"
                value={details.systemMetadata.utmSource}
              />
              <FieldCol
                label="Referrer IP:"
                value={details.systemMetadata.referrerIp}
              />
            </div>
          </div>
        </div>
      </div>

      <ApproveModal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApprove}
        loading={actionLoading}
      />

      <DisqualifyModal
        open={showDisqualifyModal}
        onClose={() => setShowDisqualifyModal(false)}
        onConfirm={handleDisqualify}
        loading={actionLoading}
      />
    </div>
  );
}

function FieldRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-text-secondary mb-1">{icon}</div>
      <span className="text-sm">{value}</span>
    </div>
  );
}

function FieldCol({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-text-secondary uppercase mb-1">{label}</p>
      <p className="text-sm font-medium text-text-primary">{value}</p>
    </div>
  );
}

function ApproveModal({
  open,
  onClose,
  onConfirm,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Approve Referral?</h3>
        <p className="text-sm text-text-secondary mb-6">
          This will mark the referral as successfully verified and release any pending rewards
          to the referrer&apos;s wallet.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg disabled:opacity-50"
          >
            {loading ? "Approving..." : "Confirm Approval"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DisqualifyModal({
  open,
  onClose,
  onConfirm,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Disqualify Referral?
        </h3>
        <p className="text-sm text-text-secondary mb-6">
          Are you sure you want to disqualify this referral? This will prevent the referrer
          from receiving rewards and mark the record as disqualified.
        </p>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50"
          >
            {loading ? "Processing..." : "Confirm Disqualification"}
          </button>
        </div>
      </div>
    </div>
  );
}

export const __referralDetailHelpers = { statusBadgeClass, ReferralStatus };
