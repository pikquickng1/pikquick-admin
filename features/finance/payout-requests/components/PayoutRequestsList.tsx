"use client";

import { useState, useEffect } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatNgn } from "@/lib/utils/money";
import { ALL_FILTER } from "@/lib/types/enums";
import { DATE_FILTER_OPTIONS } from "@/lib/constants/filters";
import { DEFAULT_DATE_FILTER } from "@/lib/config/pagination";
import { escrowService } from "@/lib/services";
import { usePayoutList } from "../hooks/usePayoutList";
import { usePayoutStats } from "../hooks/usePayoutStats";
import { PayoutListTable } from "./PayoutListTable";
import { PayoutDetailsModal } from "./PayoutDetailsModal";
import { PayoutListFilters as Filters, PayoutRequest } from "../types/payout.types";

export function PayoutRequestsList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<string>(DEFAULT_DATE_FILTER);
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isProcessingPayouts, setIsProcessingPayouts] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: ALL_FILTER,
  });

  const { payouts, loading, pagination, refetch } = usePayoutList(filters, currentPage);
  const { stats, refetch: refetchStats } = usePayoutStats();

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.status]);

  const handleProcessPayouts = async () => {
    setIsProcessingPayouts(true);
    try {
      await escrowService.processReleases();
      refetch();
      refetchStats();
    } finally {
      setIsProcessingPayouts(false);
    }
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === payouts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(payouts.map((p) => p.id));
    }
  };

  const handleViewDetails = (id: string) => {
    const payout = payouts.find((p) => p.id === id);
    if (payout) {
      setSelectedPayout(payout);
      setIsDetailsModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading payout requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary">Payout Requests</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleProcessPayouts}
            disabled={isProcessingPayouts}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600"
          >
            <RefreshCw className={`w-4 h-4 ${isProcessingPayouts ? "animate-spin" : ""}`} />
            {isProcessingPayouts ? "Processing..." : "Process Payouts"}
          </Button>

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded border border-neutral-200 p-4">
          <p className="text-2xl font-semibold text-text-primary mb-1">
            {stats.pendingRequests}
          </p>
          <p className="text-sm text-text-secondary">Pending Requests</p>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-4">
          <p className="text-2xl font-semibold text-text-primary mb-1">
            {stats.approvedThisWeek}
          </p>
          <p className="text-sm text-text-secondary">Approved This Week</p>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-4">
          <p className="text-xl font-semibold text-text-primary mb-1">
            {formatNgn(stats.totalPendingAmount)}
          </p>
          <p className="text-sm text-text-secondary">Total Pending Amount</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Payout Requests</h2>
        <PayoutListTable
          payouts={payouts}
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

      <PayoutDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        payout={selectedPayout}
        onActionComplete={() => refetch()}
      />
    </div>
  );
}
