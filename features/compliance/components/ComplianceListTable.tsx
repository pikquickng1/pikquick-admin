"use client";

import { DataTable } from "@/components/ui/data-table";
import { FlaggedActivity, ComplianceListFilters as Filters } from "../types/compliance.types";
import { ComplianceListFilters } from "./ComplianceListFilters";

interface ComplianceListTableProps {
  activities: FlaggedActivity[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onViewDetails: (id: string) => void;
}

export function ComplianceListTable({
  activities,
  selectedRows,
  onRowSelect,
  onSelectAll,
  filters,
  onFiltersChange,
  onViewDetails,
}: ComplianceListTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Flagged: "bg-red-100 text-red-700",
      "Under Review": "bg-yellow-100 text-yellow-700",
      Resolved: "bg-green-100 text-green-700",
    };
    return styles[status as keyof typeof styles] || styles.Flagged;
  };

  const columns = [
    {
      key: "userId",
      header: "User ID / Name",
      render: (activity: FlaggedActivity) => (
        <div>
          <p className="text-sm font-medium text-text-primary">{activity.userName}</p>
          <p className="text-xs text-text-secondary">{activity.userId}</p>
        </div>
      ),
    },
    {
      key: "activitySummary",
      header: "Activity Summary",
      render: (activity: FlaggedActivity) => (
        <span className="text-sm text-text-primary">{activity.activitySummary}</span>
      ),
    },
    {
      key: "flaggedDate",
      header: "Flagged Date",
      render: (activity: FlaggedActivity) => (
        <span className="text-sm text-text-primary">{formatDate(activity.flaggedDate)}</span>
      ),
    },
    {
      key: "flagStatus",
      header: "Flag Status",
      render: (activity: FlaggedActivity) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
            activity.flagStatus
          )}`}
        >
          {activity.flagStatus}
        </span>
      ),
    },
    {
      key: "flagReason",
      header: "Flag Reason",
      render: (activity: FlaggedActivity) => (
        <span className="text-sm text-text-primary">{activity.flagReason}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (activity: FlaggedActivity) => (
        <button
          onClick={() => onViewDetails(activity.id)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white">
      <DataTable
        columns={columns}
        data={activities}
        keyExtractor={(activity) => activity.id}
        selectable
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        onSelectAll={onSelectAll}
        emptyMessage="No flagged activities found"
        filters={<ComplianceListFilters filters={filters} onFiltersChange={onFiltersChange} />}
      />
    </div>
  );
}
