"use client";

import { useState } from "react";
import { Clock, CheckCircle, Wallet } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { ALL_FILTER } from "@/lib/types/enums";
import { DEFAULT_PAGE } from "@/lib/config/pagination";
import { useEliteRewardList } from "../hooks/useEliteRewardList";
import { useEliteRewardStats } from "../hooks/useEliteRewardStats";
import { EliteRewardTable } from "./EliteRewardTable";
import type { EliteRewardFilters } from "../types/elite-reward.types";

export function EliteRewardsList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [filters, setFilters] = useState<EliteRewardFilters>({
    search: "",
    status: ALL_FILTER,
  });

  const { rewards, loading, pagination } = useEliteRewardList(filters, currentPage);
  const { stats } = useEliteRewardStats();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === rewards.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(rewards.map((r) => r.id));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Elite Rewards Review</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          iconBgClass="bg-blue-100"
          label="AWAITING REVIEW"
          value={`${stats.awaitingReview} Users`}
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          iconBgClass="bg-green-100"
          label="APPROVED (MTD)"
          value={`${stats.approvedMTD} Users`}
        />
        <StatCard
          icon={<Wallet className="w-6 h-6 text-orange-600" />}
          iconBgClass="bg-orange-100"
          label="TOTAL ELITE PAYOUTS"
          value={stats.totalElitePayouts}
        />
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
        showingTo={Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}

function StatCard({
  icon,
  iconBgClass,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconBgClass: string;
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 ${iconBgClass} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">{label}</p>
      <p className="text-2xl font-semibold text-text-primary">{value}</p>
    </div>
  );
}
