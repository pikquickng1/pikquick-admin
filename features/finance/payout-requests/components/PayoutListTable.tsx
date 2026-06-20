"use client";

import { Star } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import {
  PAYOUT_STATUS_OPTIONS,
} from "@/lib/constants/filters";
import type { PayoutRequest, PayoutListFilters as Filters } from "../types/payout.types";
import { PayoutListFilters } from "./PayoutListFilters";

interface PayoutListTableProps {
  payouts: PayoutRequest[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function PayoutListTable({
  payouts,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onViewDetails,
  filters,
  onFiltersChange,
}: PayoutListTableProps) {
  const columns = [
    {
      key: "id",
      header: "Request ID",
      render: (payout: PayoutRequest) => (
        <span className="text-sm text-text-primary font-medium">{payout.id}</span>
      ),
    },
    {
      key: "runner",
      header: "Runner",
      render: (payout: PayoutRequest) => (
        <div>
          <p className="text-sm font-medium text-text-primary">{payout.runnerName}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-text-secondary">
              {payout.runnerRating} • {payout.runnerTasks} Tasks
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (payout: PayoutRequest) => (
        <span className="text-sm font-medium text-text-primary">{formatNgn(payout.amount)}</span>
      ),
    },
    {
      key: "bankDetails",
      header: "Bank Details",
      render: (payout: PayoutRequest) => (
        <div>
          <p className="text-sm font-medium text-text-primary">{payout.bankName}</p>
          <p className="text-xs text-text-secondary">{payout.accountNumber}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (payout: PayoutRequest) => (
        <span className="text-sm text-text-primary">{formatDate(payout.date)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (payout: PayoutRequest) => <StatusBadge status={payout.status} />,
    },
    {
      key: "action",
      header: "Action",
      render: (payout: PayoutRequest) => (
        <button
          onClick={() => onViewDetails(payout.id)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={payouts}
      keyExtractor={(payout) => payout.id}
      selectable
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
      emptyMessage="No payout requests found"
      filters={
        <PayoutListFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          statusOptions={PAYOUT_STATUS_OPTIONS}
        />
      }
    />
  );
}
