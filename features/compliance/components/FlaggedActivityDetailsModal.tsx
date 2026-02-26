"use client";

import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useFlaggedActivityDetails } from "../hooks/useFlaggedActivityDetails";
import { complianceApi } from "../api/complianceApi";

interface FlaggedActivityDetailsModalProps {
  open: boolean;
  onClose: () => void;
  activityId: string | null;
  onActionComplete?: () => void;
}

export function FlaggedActivityDetailsModal({
  open,
  onClose,
  activityId,
  onActionComplete,
}: FlaggedActivityDetailsModalProps) {
  const { activity, loading } = useFlaggedActivityDetails(activityId);
  const [selectedOfficer, setSelectedOfficer] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  if (!open) return null;

  const handleMarkAsResolved = async () => {
    if (!activity) return;
    try {
      setActionLoading(true);
      await complianceApi.updateFlagStatus(activity.id, "Resolved");
      onActionComplete?.();
      onClose();
    } catch (error) {
      console.error("Failed to mark as resolved:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkAsReview = async () => {
    if (!activity) return;
    try {
      setActionLoading(true);
      await complianceApi.updateFlagStatus(activity.id, "Under Review");
      onActionComplete?.();
      onClose();
    } catch (error) {
      console.error("Failed to mark as review:", error);
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

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Flagged Activity</h2>
              {activity && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 mt-2">
                  {activity.flagStatus}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : activity ? (
              <div className="space-y-6">
                {/* User Info */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">User ID</p>
                    <p className="text-base font-medium text-text-primary">{activity.userId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Name</p>
                    <p className="text-base font-medium text-text-primary">{activity.userName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Total Amount</p>
                    <p className="text-base font-medium text-text-primary">
                      {formatCurrency(activity.totalAmount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Transaction Count</p>
                    <p className="text-base font-medium text-text-primary">
                      {activity.transactionCount}
                    </p>
                  </div>
                </div>

                {/* Flag Reason */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900 mb-1">Flag Reason</p>
                      <p className="text-sm text-red-700">{activity.flagReason}</p>
                    </div>
                  </div>
                </div>

                {/* Assign Compliance Officer */}
                <div>
                  <label className="block text-base font-semibold text-text-primary mb-3">
                    Assign Compliance Officer
                  </label>
                  <select
                    value={selectedOfficer}
                    onChange={(e) => setSelectedOfficer(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-neutral-200 rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Choose an officer</option>
                    <option value="officer1">John Doe</option>
                    <option value="officer2">Jane Smith</option>
                    <option value="officer3">Mike Johnson</option>
                  </select>
                  <p className="text-sm text-text-secondary mt-2">
                    Assign this case to a compliance officer for further review
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onClose}
                disabled={actionLoading}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg border border-gray-300 disabled:opacity-50"
              >
                Close
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleMarkAsResolved}
                  disabled={actionLoading}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg disabled:opacity-50"
                >
                  Mark as Resolved
                </button>
                <button
                  onClick={handleMarkAsReview}
                  disabled={actionLoading}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50"
                >
                  Mark as Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
