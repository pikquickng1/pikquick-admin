"use client";

import { DataTable } from "@/components/ui/data-table";
import { Transaction, TransactionListFilters } from "../types/transaction.types";
import { TransactionListFilters as Filters } from "./TransactionListFilters";

interface TransactionListTableProps {
  transactions: Transaction[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (id: string) => void;
  filters: TransactionListFilters;
  onFiltersChange: (filters: TransactionListFilters) => void;
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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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
          <p className="text-xs text-text-secondary">{transaction.userType}</p>
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
          {formatCurrency(transaction.amount)}
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
      render: (transaction: Transaction) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            transaction.status
          )}`}
        >
          {transaction.status}
        </span>
      ),
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
      filters={<Filters filters={filters} onFiltersChange={onFiltersChange} />}
    />
  );
}
