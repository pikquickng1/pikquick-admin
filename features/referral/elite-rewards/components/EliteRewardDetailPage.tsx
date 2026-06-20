"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LoadingState } from "@/components/ui/loading-state";
import { formatNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import {
  CHART_COLORS,
  CHART_LINE_DEFAULT_WIDTH,
  CHART_DOT_DEFAULT_RADIUS,
} from "@/lib/utils/chart-colors";
import { statusBadgeClass } from "@/lib/utils/status";
import { useEliteRewardDetail } from "../hooks/useEliteRewardDetail";
import { eliteRewardDetailApi } from "../api/eliteRewardDetailApi";
import type { IntegrityLevel } from "../types/elite-reward-detail.types";

interface EliteRewardDetailPageProps {
  rewardId: string;
}

const ELITE_REWARDS_ROUTE = "/dashboard/referral/elite-rewards";
const DECISION_PLACEHOLDER = "Add reasoning for approval or rejection...";
const COMMENTS_ROWS = 6;

const INTEGRITY_COLOR: Record<IntegrityLevel, string> = {
  LOW: "text-green-600",
  MEDIUM: "text-orange-600",
  HIGH: "text-red-600",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function EliteRewardDetailPage({ rewardId }: EliteRewardDetailPageProps) {
  const router = useRouter();
  const { detail, loading } = useEliteRewardDetail(rewardId);
  const [decisionComments, setDecisionComments] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleApprove = async () => {
    setActionLoading(true);
    try {
      await eliteRewardDetailApi.approveReward(rewardId, decisionComments);
      setShowApproveModal(false);
      router.push(ELITE_REWARDS_ROUTE);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    try {
      await eliteRewardDetailApi.rejectReward(rewardId, decisionComments);
      setShowRejectModal(false);
      router.push(ELITE_REWARDS_ROUTE);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <LoadingState label="Loading elite reward details..." />;
  }

  if (!detail) return null;

  const integrityColor =
    INTEGRITY_COLOR[detail.integrityCheck.systemFraudScore.level] ?? "text-gray-600";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push(ELITE_REWARDS_ROUTE)}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to review queue</span>
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRejectModal(true)}
            className="px-6 py-2.5 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50"
          >
            Reject Reward
          </button>
          <button
            onClick={() => setShowApproveModal(true)}
            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Approve Reward
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-semibold text-white">
                  {getInitials(detail.user.name)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-semibold text-text-primary">{detail.user.name}</h2>
                  <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium uppercase bg-blue-100 text-blue-700">
                    {detail.user.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span>{detail.user.id}</span>
                  <span>•</span>
                  <span>Joined {formatDate(detail.user.joinedDate)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <MetricCard
              label="ACTIVE REFERRALS"
              value={detail.metrics.activeReferrals}
              footer={detail.metrics.activeReferralsChange}
              footerClassName="text-green-600"
            />
            <MetricCard
              label="LIFETIME TOTAL"
              value={detail.metrics.lifetimeTotal}
            />
            <MetricCard
              label="MONTH TARGET ACHIEVED"
              value={detail.metrics.monthTargetAchieved}
              valueClassName="text-blue-600 mb-1"
              footer={`Tier: ${detail.metrics.tier}`}
            />
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-text-primary">REFERRAL BREAKDOWN</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Download Full Report
              </button>
            </div>

            <BreakdownRow
              label="Verified & Active Referrals"
              value={detail.referralBreakdown.verifiedAndActive}
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
            />
            <BreakdownRow
              label="Pending Completion"
              value={detail.referralBreakdown.pendingCompletion}
              icon={<AlertCircle className="w-5 h-5 text-yellow-600" />}
            />
            <BreakdownRow
              label="Disqualified Referrals"
              value={detail.referralBreakdown.disqualifiedReferrals}
              icon={
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  <path d="M15 9l-6 6m0-6l6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                </svg>
              }
              bordered={false}
            />
            <BreakdownRow
              label="First Task Conversion Rate"
              value={`${detail.referralBreakdown.firstTaskConversionRate}%`}
              icon={<CheckCircle className="w-5 h-5 text-green-600" />}
              bordered={false}
            />
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-base font-semibold text-text-primary mb-6">
              HISTORICAL REFERRAL PERFORMANCE
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={detail.historicalPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                <XAxis dataKey="month" stroke={CHART_COLORS.axis} fontSize={12} />
                <YAxis stroke={CHART_COLORS.axis} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: CHART_COLORS.tooltipBg,
                    border: `1px solid ${CHART_COLORS.tooltipBorder}`,
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="referrals"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={CHART_LINE_DEFAULT_WIDTH}
                  dot={{ fill: CHART_COLORS.primary, r: CHART_DOT_DEFAULT_RADIUS }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-green-500" />
              <h3 className="text-base font-semibold text-text-primary">INTEGRITY CHECK</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-text-primary">System Fraud Score</p>
                  <p className={`text-sm font-semibold ${integrityColor}`}>
                    {detail.integrityCheck.systemFraudScore.level}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "15%" }} />
                </div>
                <p className="text-xs text-text-secondary">
                  {detail.integrityCheck.systemFraudScore.message}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <IntegrityRow
                  label="Device Sharing"
                  status={detail.integrityCheck.deviceSharing.status}
                />
                <IntegrityRow
                  label="IP Geolocation"
                  status={detail.integrityCheck.ipGeolocation.status}
                />
                <IntegrityRow
                  label="Task Genuinity"
                  status={detail.integrityCheck.taskGenuinity.status}
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-500 rounded-lg p-6 text-white">
            <p className="text-xs uppercase tracking-wide mb-2 opacity-90">
              TOTAL PAYABLE AMOUNT
            </p>
            <p className="text-4xl font-bold mb-4">
              {formatNgn(detail.rewardDetails.totalPayableAmount)}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="opacity-90">Reward Type:</span>
                <span className="font-medium">{detail.rewardDetails.rewardType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-90">Tax Deductions:</span>
                <span className="font-medium">
                  {formatNgn(detail.rewardDetails.taxDeductions)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-base font-semibold text-text-primary mb-4">DECISION COMMENTS</h3>
            <textarea
              value={decisionComments}
              onChange={(e) => setDecisionComments(e.target.value)}
              placeholder={DECISION_PLACEHOLDER}
              rows={COMMENTS_ROWS}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        open={showApproveModal}
        onClose={() => setShowApproveModal(false)}
        onConfirm={handleApprove}
        loading={actionLoading}
        title="Confirm Reward Approval?"
        body={`Are you sure you want to approve this reward of ${formatNgn(detail.rewardDetails.totalPayableAmount)} for ${detail.user.name}? This confirms the user has met all criteria for the ${detail.metrics.monthTargetAchieved} ${detail.metrics.tier} tier.`}
        confirmLabel="Confirm Approval"
        confirmClassName="bg-blue-500 hover:bg-blue-600"
      />

      <ConfirmModal
        open={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleReject}
        loading={actionLoading}
        title="Reject Reward Request?"
        body="Are you sure you want to reject this reward? Add a valid reason in the comments section. This user will be notified that their request for the Elite tier has been rejected."
        confirmLabel="Reject Request"
        confirmClassName="bg-red-500 hover:bg-red-600"
      />
    </div>
  );
}

function MetricCard({
  label,
  value,
  footer,
  footerClassName,
  valueClassName = "mb-1",
}: {
  label: string;
  value: string | number;
  footer?: string;
  footerClassName?: string;
  valueClassName?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">{label}</p>
      <p className={`text-3xl font-semibold text-text-primary ${valueClassName}`}>{value}</p>
      {footer && <p className={`text-xs ${footerClassName ?? "text-text-secondary"}`}>{footer}</p>}
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  icon,
  bordered = true,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  bordered?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        bordered ? "border-b border-neutral-200" : ""
      }`}
    >
      <span className="text-sm text-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-text-primary">{value}</span>
        {icon}
      </div>
    </div>
  );
}

function IntegrityRow({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-text-primary">{label}</span>
      <span className="text-sm font-medium text-green-600">{status}</span>
    </div>
  );
}

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  loading,
  title,
  body,
  confirmLabel,
  confirmClassName,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  confirmClassName: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-secondary mb-6">{body}</p>
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
            className={`px-6 py-2 text-sm font-medium text-white ${confirmClassName} rounded-lg disabled:opacity-50`}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export const __eliteRewardDetailHelpers = { statusBadgeClass };
