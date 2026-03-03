"use client";

import { useState } from "react";
import { ArrowLeft, Shield, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useReferralDetails } from "../hooks/useReferralDetails";
import { referralDetailApi } from "../api/referralDetailApi";

interface ReferralDetailsPageProps {
  referralId: string;
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
    try {
      setSaving(true);
      await referralDetailApi.updateInternalNotes(referralId, internalNotes);
    } catch (error) {
      console.error("Failed to save notes:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      await referralDetailApi.approveReferral(referralId);
      setShowApproveModal(false);
      router.push("/dashboard/referral/records");
    } catch (error) {
      console.error("Failed to approve referral:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisqualify = async () => {
    try {
      setActionLoading(true);
      await referralDetailApi.disqualifyReferral(referralId);
      setShowDisqualifyModal(false);
      router.push("/dashboard/referral/records");
    } catch (error) {
      console.error("Failed to disqualify referral:", error);
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

  const getFraudIcon = (status: string) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "danger":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getFraudColor = (status: string) => {
    switch (status) {
      case "safe":
        return "text-green-600";
      case "warning":
        return "text-orange-600";
      case "danger":
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
          <p className="text-sm text-neutral-500">Loading referral details...</p>
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/referral/records")}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
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
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Referrer Profile */}
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
              <div>
                <div className="flex items-center gap-2 text-text-secondary mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">{details.referrer.email}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-text-secondary mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">{details.referrer.phone}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">Joined {details.referrer.joinedDate}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Referrals</p>
                <p className="text-2xl font-semibold text-text-primary">
                  {details.referrer.totalReferrals}
                </p>
              </div>
            </div>
          </div>

          {/* Referred User Profile */}
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
              <div>
                <div className="flex items-center gap-2 text-text-secondary mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">{details.referredUser.email}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-text-secondary mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-sm">{details.referredUser.phone}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-text-secondary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">Joined {details.referredUser.joinedDate}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-text-secondary">Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    {details.referredUser.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Referral Journey Timeline */}
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

          {/* Qualification Task Details */}
          {details.qualificationTask && (
            <div className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-text-primary">
                  QUALIFICATION TASK DETAILS
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {details.qualificationTask.status}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-text-secondary uppercase mb-1">TASK ID</p>
                  <p className="text-sm font-medium text-text-primary">
                    {details.qualificationTask.taskId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase mb-1">SERVICE TYPE</p>
                  <p className="text-sm font-medium text-text-primary">
                    {details.qualificationTask.serviceType}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase mb-1">TOTAL PAID</p>
                  <p className="text-sm font-medium text-text-primary">
                    {formatCurrency(details.qualificationTask.totalPaid)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-secondary uppercase mb-1">COMPLETION DATE</p>
                  <p className="text-sm font-medium text-text-primary">
                    {details.qualificationTask.completionDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Fraud Indicators */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-semibold text-text-primary">FRAUD INDICATORS</h3>
            </div>
            <div className="space-y-4">
              {details.fraudIndicators.map((indicator, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-text-primary">{indicator.label}</p>
                    {getFraudIcon(indicator.status)}
                  </div>
                  <p className={`text-sm font-medium ${getFraudColor(indicator.status)}`}>
                    {indicator.value}
                  </p>
                  {index < details.fraudIndicators.length - 1 && (
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

          {/* Internal Notes */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-base font-semibold text-text-primary">INTERNAL NOTES</h3>
            </div>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Add internal notes about this referral..."
              rows={6}
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

          {/* System Metadata */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-base font-semibold text-text-primary">SYSTEM METADATA</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-secondary mb-1">Referral ID:</p>
                <p className="text-sm font-medium text-text-primary">
                  {details.systemMetadata.referralId}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Tracking Code:</p>
                <p className="text-sm font-medium text-text-primary">
                  {details.systemMetadata.trackingCode}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">UTM Source:</p>
                <p className="text-sm font-medium text-text-primary">
                  {details.systemMetadata.utmSource}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary mb-1">Referrer IP:</p>
                <p className="text-sm font-medium text-text-primary">
                  {details.systemMetadata.referrerIp}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approve Referral Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Approve Referral?</h3>
            <p className="text-sm text-text-secondary mb-6">
              This will mark the referral as successfully verified and release any pending rewards
              to the referrer's wallet.
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
                className="px-6 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg disabled:opacity-50"
              >
                {actionLoading ? "Approving..." : "Confirm Approval"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Disqualify Referral Modal */}
      {showDisqualifyModal && (
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
                onClick={() => setShowDisqualifyModal(false)}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDisqualify}
                disabled={actionLoading}
                className="px-6 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg disabled:opacity-50"
              >
                {actionLoading ? "Processing..." : "Confirm Disqualification"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
