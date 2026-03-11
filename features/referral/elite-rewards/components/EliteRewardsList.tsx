"use client";

import { useState } from "react";
import { Clock, CheckCircle, Wallet } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useEliteRewardList } from "../hooks/useEliteRewardList";
import { useEliteRewardStats } from "../hooks/useEliteRewardStats";
import { EliteRewardFilters } from "../types/elite-reward.types";
import { EliteRewardTable } from "./EliteRewardTable";

export function EliteRewardsList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<EliteRewardFilters>({
    search: "",
  });

  const { rewards, loading, pagination } = useEliteRewardList(filters, currentPage);
  const { stats } = useEliteRewardStats();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === rewards.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rewards.map((r) => r.id));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading elite rewards...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Elite Rewards Review</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
            AWAITING REVIEW
          </p>
          <p className="text-2xl font-semibold text-text-primary">
            {stats.awaitingReview} Users
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
            APPROVED (MTD)
          </p>
          <p className="text-2xl font-semibold text-text-primary">
            {stats.approvedMTD} Users
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
            TOTAL ELITE PAYOUTS
          </p>
          <p className="text-2xl font-semibold text-text-primary">
            {formatCurrency(stats.totalElitePayouts)}
          </p>
        </div>
      </div>

      <EliteRewardTable
        rewards={rewards}
        selectedRows={selectedRows}
        onRowSelect={toggleRow}
        onSelectAll={toggleAll}
        filters={filters}
        onFiltersChange={setFilters}
      />

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
    </div>
  );
}
