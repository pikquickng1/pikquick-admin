"use client";

import { Eye } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { ReferralRecord, ReferralRecordFilters as Filters } from "../types/referral-record.types";
import { ReferralRecordFilters } from "./ReferralRecordFilters";

interface ReferralRecordTableProps {
  records: ReferralRecord[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function ReferralRecordTable({
  records,
  selectedRows,
  onRowSelect,
  onSelectAll,
  filters,
  onFiltersChange,
}: ReferralRecordTableProps) {
  const getStatusBadge = (status: string) => {
    const styles = {
      Active: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Disqualified: "bg-red-100 text-red-700",
    };
    return styles[status as keyof typeof styles] || styles.Active;
  };

  const columns = [
    {
      key: "referrer",
      header: "REFERRER",
      render: (record: ReferralRecord) => (
        <div>
          <p className="text-sm font-medium text-text-primary">{record.referrer}</p>
          <p className="text-xs text-text-secondary">{record.referrerRole}</p>
        </div>
      ),
    },
    {
      key: "referredUser",
      header: "REFERRED USER",
      render: (record: ReferralRecord) => (
        <span className="text-sm text-text-primary">{record.referredUser}</span>
      ),
    },
    {
      key: "signupDate",
      header: "SIGNUP DATE",
      render: (record: ReferralRecord) => (
        <span className="text-sm text-text-primary">{record.signupDate}</span>
      ),
    },
    {
      key: "firstTask",
      header: "1ST TASK",
      render: (record: ReferralRecord) => (
        <div className="flex items-center gap-2">
          {record.firstTask.completed ? (
            <>
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="text-sm text-green-600 font-medium">
                Yes
                <br />
                <span className="text-xs">({record.firstTask.taskId})</span>
              </span>
            </>
          ) : (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-neutral-300" />
              <span className="text-sm text-text-secondary">No</span>
            </>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (record: ReferralRecord) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
            record.status
          )}`}
        >
          {record.status}
        </span>
      ),
    },
    {
      key: "month",
      header: "MONTH",
      render: (record: ReferralRecord) => (
        <span className="text-sm text-text-primary">{record.month}</span>
      ),
    },
    {
      key: "action",
      header: "ACTIONS",
      render: (record: ReferralRecord) => (
        <button
          onClick={() => {
            window.location.href = `/dashboard/referral/records/${record.id}`;
          }}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4 text-text-secondary" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <DataTable
        columns={columns}
        data={records}
        keyExtractor={(record) => record.id}
        onRowSelect={onRowSelect}
        onSelectAll={onSelectAll}
        emptyMessage="No referral records found"
        filters={<ReferralRecordFilters filters={filters} onFiltersChange={onFiltersChange} />}
      />
    </div>
  );
}
