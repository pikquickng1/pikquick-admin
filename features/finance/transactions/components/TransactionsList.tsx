"use client";

import { useState } from "react";
import { DollarSign, RefreshCw, Wallet, TrendingDown, ChevronDown, Download } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatNgn } from "@/lib/utils/money";
import { ALL_FILTER } from "@/lib/types/enums";
import { DATE_FILTER_OPTIONS, EXPORT_FORMATS } from "@/lib/constants/filters";
import { DEFAULT_DATE_FILTER } from "@/lib/config/pagination";
import { useTransactionList } from "../hooks/useTransactionList";
import { useTransactionStats } from "../hooks/useTransactionStats";
import { TransactionListTable } from "./TransactionListTable";
import { TransactionDetailsModal } from "./TransactionDetailsModal";
import { TransactionListFilters as Filters, Transaction } from "../types/transaction.types";

export function TransactionsList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<string>(DEFAULT_DATE_FILTER);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    type: ALL_FILTER,
    status: ALL_FILTER,
  });

  const { transactions, loading, pagination } = useTransactionList(filters, currentPage);
  const { stats } = useTransactionStats();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === transactions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(transactions.map((t) => t.id));
    }
  };

  const handleViewDetails = (id: string) => {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      setSelectedTransaction(transaction);
      setIsDetailsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Transaction Overview</h1>
        </div>

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              disabled={isExporting}
              className="flex items-center gap-2 px-6 py-4 bg-white border border-neutral-200 rounded text-sm text-text-primary hover:bg-gray-50 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {EXPORT_FORMATS.map((f) => (
                <DropdownMenuItem
                  key={f.value}
                  onClick={() => setIsExporting(true)}
                >
                  {f.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-6 py-4 bg-neutral-200 border border-neutral-200 rounded text-sm text-text-primary hover:bg-gray-50">
              {DATE_FILTER_OPTIONS.find((o) => o.value === dateFilter)?.label ?? dateFilter}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {DATE_FILTER_OPTIONS.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => setDateFilter(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {formatNgn(stats.totalPlatformEarnings)}
          </p>
          <p className="text-sm text-text-primary">Total Platform Earnings</p>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
            <RefreshCw className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {formatNgn(stats.dailyAccessPayments)}
          </p>
          <p className="text-sm text-text-primary">Daily Access Payments</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {formatNgn(stats.taskPayments)}
          </p>
          <p className="text-sm text-text-primary">Task Payments</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
            <TrendingDown className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {formatNgn(stats.refunds)}
          </p>
          <p className="text-sm text-text-primary">Refunds</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">All Transactions</h2>
        <TransactionListTable
          transactions={transactions}
          selectedRows={selectedRows}
          onRowSelect={toggleRow}
          onSelectAll={toggleAll}
          onViewDetails={handleViewDetails}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        showingFrom={(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
        showingTo={Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
        totalItems={pagination.totalItems}
      />

      <TransactionDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        transaction={selectedTransaction}
      />
    </div>
  );
}
