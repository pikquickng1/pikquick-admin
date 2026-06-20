"use client";

import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { formatDate, formatTime } from "@/lib/utils/date";
import { statusLabel } from "@/lib/utils/status";
import type {
  Transaction,
  TransactionListFilters as Filters,
} from "../types/transaction.types";
import { TransactionListFilters } from "./TransactionListFilters";

interface TransactionListTableProps {
  transactions: Transaction[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function TransactionListTable({
  transactions,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onViewDetails,
  filters,
  onFiltersChange,
}: TransactionListTableProps) {
  const columns = [
    {
      key: "id",
      header: "Transaction ID",
      render: (transaction: Transaction) => (
        <span className="text-sm text-text-primary font-medium">{transaction.id}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (transaction: Transaction) => (
        <div>
          <p className="text-sm text-text-primary font-medium">{transaction.userName}</p>
          <p className="text-xs text-text-secondary">{statusLabel(transaction.userType)}</p>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (transaction: Transaction) => (
        <span className="text-sm text-text-primary">{transaction.type}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (transaction: Transaction) => (
        <span className="text-sm text-text-primary font-medium">
          {formatNgn(transaction.amount)}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (transaction: Transaction) => (
        <div>
          <p className="text-sm text-text-primary">{formatDate(transaction.date)}</p>
          <p className="text-xs text-text-secondary">{formatTime(transaction.date)}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (transaction: Transaction) => <StatusBadge status={transaction.status} />,
    },
    {
      key: "action",
      header: "Action",
      render: (transaction: Transaction) => (
        <button
          onClick={() => onViewDetails(transaction.id)}
          className="text-sm text-primary-500 hover:text-primary-600 font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
      keyExtractor={(transaction) => transaction.id}
      selectable
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
      emptyMessage="No transactions found"
      filters={
        <TransactionListFilters filters={filters} onFiltersChange={onFiltersChange} />
      }
    />
  );
}
