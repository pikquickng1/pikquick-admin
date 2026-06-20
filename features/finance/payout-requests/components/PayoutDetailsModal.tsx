"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Loader2, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import type { PayoutRequest } from "../types/payout.types";
import { usePayout } from "../hooks/usePayout";
import { usePayoutActions } from "../hooks/usePayoutActions";

interface PayoutDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payout: PayoutRequest | null;
  onActionComplete?: () => void;
}

export function PayoutDetailsModal({
  open,
  onOpenChange,
  payout: basicPayout,
  onActionComplete,
}: PayoutDetailsModalProps) {
  const { payout, loading } = usePayout(basicPayout?.id || null);
  const { approvePayout, rejectPayout, loading: actionLoading } = usePayoutActions();
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  if (!basicPayout) return null;

  const handleApprove = async () => {
    const success = await approvePayout(basicPayout.id);
    if (success) {
      setShowApproveModal(false);
      onActionComplete?.();
      onOpenChange(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return;
    const success = await rejectPayout(basicPayout.id, rejectionReason);
    if (success) {
      setShowDeclineModal(false);
      setRejectionReason("");
      onActionComplete?.();
      onOpenChange(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const displayPayout = payout ?? basicPayout;
  const isPending = displayPayout.status === "Pending";

  return (
    <>
      <Dialog open={open && !showDeclineModal && !showApproveModal} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg p-6 [&>button]:hidden">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Payout Request Details
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Complete information about this payout request
                </p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Request ID</p>
                    <p className="text-lg font-semibold text-gray-900">{displayPayout.id}</p>
                  </div>
                  <StatusBadge status={displayPayout.status} />
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    Runner Information
                  </h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-blue-500 text-white text-lg">
                        {getInitials(displayPayout.runnerName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base font-semibold text-gray-900">
                        {displayPayout.runnerName}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600">
                          {displayPayout.runnerRating} Rating
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {displayPayout.runnerTasks} Tasks Completed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Payout Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Requested Amount</p>
                      <p className="text-base font-semibold text-gray-900">
                        {formatNgn(displayPayout.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Request Date</p>
                      <p className="text-base font-medium text-gray-900">
                        {formatDate(displayPayout.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Bank Name</p>
                      <p className="text-base font-medium text-gray-900">
                        {displayPayout.bankName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Account Number</p>
                      <p className="text-base font-medium text-gray-900">
                        {displayPayout.accountNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => onOpenChange(false)}
                    className="px-8 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full border border-gray-300"
                  >
                    Close
                  </button>
                  {isPending && (
                    <>
                      <button
                        onClick={() => setShowDeclineModal(true)}
                        className="px-8 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => setShowApproveModal(true)}
                        className="px-8 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-full"
                      >
                        Approve Payout
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeclineModal} onOpenChange={setShowDeclineModal}>
        <DialogContent className="sm:max-w-md p-6 [&>button]:hidden">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Decline Payout Request
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Please provide a reason for declining this payout request for{" "}
                  {displayPayout.runnerName}
                </p>
              </div>
              <button
                onClick={() => setShowDeclineModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Reason for Decline
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter reason here..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setShowDeclineModal(false);
                  setRejectionReason("");
                }}
                disabled={actionLoading}
                className="px-8 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full border border-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading || !rejectionReason.trim()}
                className="px-8 py-2.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-full disabled:opacity-50"
              >
                {actionLoading ? "Declining..." : "Confirm Decline"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent className="sm:max-w-md p-6 [&>button]:hidden">
          <div className="space-y-6">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Confirm Payout Approval
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-2">
                Are you sure you want to approve the payout of{" "}
                <span className="font-semibold">{formatNgn(displayPayout.amount)}</span> for{" "}
                <span className="font-semibold">{displayPayout.runnerName}</span>? This action
                will process the payment.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                disabled={actionLoading}
                className="px-8 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full border border-gray-300 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={actionLoading}
                className="px-8 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-full disabled:opacity-50"
              >
                {actionLoading ? "Approving..." : "Confirm Approval"}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
