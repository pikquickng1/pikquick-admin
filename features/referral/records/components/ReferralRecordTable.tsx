"use client";

import { Eye, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import { referralStatusLabel } from "@/lib/utils/status";
import { ALL_FILTER } from "@/lib/types/enums";
import { REFERRAL_STATUS_OPTIONS } from "@/lib/constants/filters";
import type {
  ReferralRecord,
  ReferralRecordFilters as Filters,
} from "../types/referral-record.types";
import { ReferralRecordFilters } from "./ReferralRecordFilters";

interface ReferralRecordTableProps {
  records: ReferralRecord[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const REFERRAL_RECORDS_ROUTE = "/dashboard/referral/records";

export function ReferralRecordTable({
  records,
  onRowSelect,
  onSelectAll,
  filters,
  onFiltersChange,
}: ReferralRecordTableProps) {
  const router = useRouter();

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
        <span className="text-sm text-text-primary">{formatDate(record.signupDate)}</span>
      ),
    },
    {
      key: "firstTask",
      header: "1ST TASK",
      render: (record: ReferralRecord) => (
        <div className="flex items-center gap-2">
          {record.firstTask.completed ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                Yes
                {record.firstTask.taskId && (
                  <>
                    <br />
                    <span className="text-xs">({record.firstTask.taskId})</span>
                  </>
                )}
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
        <StatusBadge status={record.status} label={referralStatusLabel(record.status)} />
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
          onClick={() => router.push(`${REFERRAL_RECORDS_ROUTE}/${record.id}`)}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label={`View details for ${record.referrer}`}
        >
          <Eye className="w-4 h-4 text-text-secondary" />
        </button>
      ),
    },
  ];

  const statusOptions = REFERRAL_STATUS_OPTIONS as ReadonlyArray<{
    value: string;
    label: string;
  }>;

  return (
    <div className="bg-white overflow-hidden">
      <DataTable
        columns={columns}
        data={records}
        keyExtractor={(record) => record.id}
        onRowSelect={onRowSelect}
        onSelectAll={onSelectAll}
        selectedRows={selectedRows}
        emptyMessage="No referral records found"
        filters={
          <ReferralRecordFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
            statusOptions={statusOptions}
            allFilter={ALL_FILTER}
          />
        }
      />
    </div>
  );
}
