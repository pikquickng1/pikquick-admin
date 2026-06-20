"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { FlagStatus } from "@/lib/types/enums";
import { flagStatusLabel } from "@/lib/utils/status";
import { formatDate } from "@/lib/utils/date";
import { formatNgn } from "@/lib/utils/money";
import type { FlaggedActivityDetails } from "../types/compliance.types";

interface FlaggedActivityDetailsModalProps {
  open: boolean;
  activity: FlaggedActivityDetails | null;
  onClose: () => void;
  onUpdateStatus: (status: FlagStatus) => void;
}

export function FlaggedActivityDetailsModal({
  open,
  activity,
  onClose,
  onUpdateStatus,
}: FlaggedActivityDetailsModalProps) {
  if (!open || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4">
        <h3 className="text-lg font-semibold">Flagged Activity</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">User</span>
            <span>{activity.userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Reason</span>
            <span>{activity.flagReason}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Flagged Date</span>
            <span>{formatDate(activity.flaggedDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Transactions</span>
            <span>{activity.transactionCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount</span>
            <span>{formatNgn(activity.totalAmount)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Status</span>
            <StatusBadge status={activity.flagStatus} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateStatus(FlagStatus.UNDER_REVIEW)}
          >
            Mark as {flagStatusLabel(FlagStatus.UNDER_REVIEW)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateStatus(FlagStatus.RESOLVED)}
          >
            Mark as {flagStatusLabel(FlagStatus.RESOLVED)}
          </Button>
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
