"use client";

import { useState, useEffect } from "react";
import { Clock, CheckCircle, DollarSign, ChevronDown, Download } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePayoutList } from "../hooks/usePayoutList";
import { usePayoutStats } from "../hooks/usePayoutStats";
import { PayoutListTable } from "./PayoutListTable";
import { PayoutDetailsModal } from "./PayoutDetailsModal";
import { PayoutListFilters as Filters, PayoutRequest } from "../types/payout.types";
import { payoutApi } from "../api/payoutApi";

export function PayoutRequestsList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("November 2025");
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "All Status",
  });

  const { payouts, loading, pagination, refetch } = usePayoutList(filters, currentPage);
  const { stats } = usePayoutStats();

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.status]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
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

  const handleExport = async (format: "csv" | "excel") => {
    try {
      setIsExporting(true);
      const blob = await payoutApi.exportPayouts(filters, format);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `payout-requests-${new Date().toISOString().split("T")[0]}.${
        format === "csv" ? "csv" : "xlsx"
      }`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to export payout requests:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const dateFilterOptions = [
    "November 2025",
    "October 2025",
    "September 2025",
    "This Year",
    "All Time",
  ];

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
         

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-6 py-4 bg-neutral-200 border border-neutral-200 rounded text-sm text-text-primary hover:bg-gray-50">
              {dateFilter}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dateFilterOptions.map((option) => (
                <DropdownMenuItem key={option} onClick={() => setDateFilter(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">
                {stats.pendingRequests}
              </p>
              <p className="text-sm text-text-secondary">Pending Requests</p>
            </div>
            
          </div>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">
                {stats.approvedThisWeek}
              </p>
              <p className="text-sm text-text-secondary">Approved This Week</p>
            </div>
           
          </div>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold text-text-primary mb-1">
                {formatCurrency(stats.totalPendingAmount)}
              </p>
              <p className="text-sm text-text-secondary">Total Pending Amount</p>
            </div>
            
          </div>
        </div>
      </div>

      {/* Payout Requests Table */}
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
        showingTo={Math.min(
          pagination.currentPage * pagination.itemsPerPage,
          pagination.totalItems
        )}
        totalItems={pagination.totalItems}
      />

      {/* Payout Details Modal */}
      <PayoutDetailsModal
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        payout={selectedPayout}
        onActionComplete={refetch}
      />
    </div>
  );
}
