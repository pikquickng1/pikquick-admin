"use client";

import { useState } from "react";
import { ArrowLeft, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEliteRewardDetail } from "../hooks/useEliteRewardDetail";
import { eliteRewardDetailApi } from "../api/eliteRewardDetailApi";

interface EliteRewardDetailPageProps {
  rewardId: string;
}

export function EliteRewardDetailPage({ rewardId }: EliteRewardDetailPageProps) {
  const router = useRouter();
  const { detail, loading } = useEliteRewardDetail(rewardId);
  const [decisionComments, setDecisionComments] = useState("");
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await eliteRewardDetailApi.approveReward(rewardId, decisionComments);
      setShowApproveModal(false);
      router.push("/dashboard/referral/elite-rewards");
    } catch (error) {
      console.error("Failed to approve reward:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      await eliteRewardDetailApi.rejectReward(rewardId, decisionComments);
      setShowRejectModal(false);
      router.push("/dashboard/referral/elite-rewards");
    } catch (error) {
      console.error("Failed to reject reward:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getIntegrityColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "text-green-600";
      case "MEDIUM":
        return "text-orange-600";
      case "HIGH":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading elite reward details...</p>
        </div>
      </div>
    );
  }

  if (!detail) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/referral/elite-rewards")}
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
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile */}
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
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Joined {detail.user.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">
                ACTIVE REFERRALS
              </p>
              <p className="text-3xl font-semibold text-text-primary mb-1">
                {detail.metrics.activeReferrals}
              </p>
              <p className="text-xs text-green-600">{detail.metrics.activeReferralsChange}</p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">
                LIFETIME TOTAL
              </p>
              <p className="text-3xl font-semibold text-text-primary">
                {detail.metrics.lifetimeTotal}
              </p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <p className="text-xs text-text-secondary uppercase tracking-wide mb-2">
                MONTH TARGET ACHIEVED
              </p>
              <p className="text-2xl font-semibold text-blue-600 mb-1">
                {detail.metrics.monthTargetAchieved}
              </p>
              <p className="text-xs text-text-secondary">Tier: {detail.metrics.tier}</p>
            </div>
          </div>

          {/* Referral Breakdown */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                REFERRAL BREAKDOWN
              </h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Download Full Report
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                <span className="text-sm text-text-secondary">
                  Verified & Active Referrals
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-text-primary">
                    {detail.referralBreakdown.verifiedAndActive}
                  </span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                <span className="text-sm text-text-secondary">Pending Completion</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-text-primary">
                    {detail.referralBreakdown.pendingCompletion}
                  </span>
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-neutral-200">
                <span className="text-sm text-text-secondary">Disqualified Referrals</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-text-primary">
                    {detail.referralBreakdown.disqualifiedReferrals}
                  </span>
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 9l-6 6m0-6l6 6"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <span className="text-sm text-text-secondary">
                  First Task Conversion Rate
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-text-primary">
                    {detail.referralBreakdown.firstTaskConversionRate}%
                  </span>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Historical Performance */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
              <h3 className="text-base font-semibold text-text-primary">
                HISTORICAL REFERRAL PERFORMANCE
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={[]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="referrals"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Integrity Check */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-green-500" />
              <h3 className="text-base font-semibold text-text-primary">INTEGRITY CHECK</h3>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-text-primary">System Fraud Score</p>
                  <p className={`text-sm font-semibold ${getIntegrityColor(detail.integrityCheck.systemFraudScore.level)}`}>
                    {detail.integrityCheck.systemFraudScore.level}
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="text-xs text-text-secondary">
                  {detail.integrityCheck.systemFraudScore.message}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Device Sharing</span>
                  <span className="text-sm font-medium text-green-600">
                    {detail.integrityCheck.deviceSharing.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">IP Geolocation</span>
                  <span className="text-sm font-medium text-green-600">
                    {detail.integrityCheck.ipGeolocation.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-primary">Task Genuinity</span>
                  <span className="text-sm font-medium text-green-600">
                    {detail.integrityCheck.taskGenuinity.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Payable Amount */}
          <div className="bg-blue-500 rounded-lg p-6 text-white">
            <p className="text-xs uppercase tracking-wide mb-2 opacity-90">
              TOTAL PAYABLE AMOUNT
            </p>
            <p className="text-4xl font-bold mb-4">{formatCurrency(detail.rewardDetails.totalPayableAmount)}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="opacity-90">Reward Type:</span>
                <span className="font-medium">{detail.rewardDetails.rewardType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-90">Tax Deductions:</span>
                <span className="font-medium">{formatCurrency(detail.rewardDetails.taxDeductions)}</span>
              </div>
            </div>
          </div>

          {/* Decision Comments */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <h3 className="text-base font-semibold text-text-primary">DECISION COMMENTS</h3>
            </div>
            <textarea
              value={decisionComments}
              onChange={(e) => setDecisionComments(e.target.value)}
              placeholder="Add reasoning for approval or rejection..."
              rows={6}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Confirm Reward Approval?</h3>
            <p className="text-sm text-text-secondary mb-6">
              Are you sure you want to approve this reward of ₦25,000 for Adebayo Samuel? This confirms the user has met all criteria for the February Elite tier.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50"
              >
                {actionLoading ? "Processing..." : "Confirm Approval"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Reject Reward Request?
            </h3>
            <p className="text-sm text-text-secondary mb-6">
              Are you sure you want to reject this reward? Add a valid reason in the comments section. This user will be notified that their request for the Elite tier has been rejected.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50"
              >
                {actionLoading ? "Processing..." : "Reject Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
