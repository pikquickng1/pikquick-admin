"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils/date";
import type { FlaggedActivity } from "../types/compliance.types";

interface ComplianceListTableProps {
  activities: FlaggedActivity[];
  onSelect?: (activity: FlaggedActivity) => void;
}

export function ComplianceListTable({ activities, onSelect }: ComplianceListTableProps) {
  if (activities.length === 0) {
    return <div className="text-sm text-gray-500 py-8 text-center">No flagged activities.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Activity</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2" />
          </tr>
        </thead>
        <tbody>
          {activities.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="px-4 py-2">{a.userName}</td>
              <td className="px-4 py-2">{a.activitySummary}</td>
              <td className="px-4 py-2">{formatDate(a.flaggedDate)}</td>
              <td className="px-4 py-2">
                <StatusBadge status={a.flagStatus} />
              </td>
              <td className="px-4 py-2 text-right">
                <Button size="sm" variant="outline" onClick={() => onSelect?.(a)}>
                  Review
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
