"use client";

import { useState } from "react";
import { Shield, AlertTriangle, Ban } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useComplianceList } from "../hooks/useComplianceList";
import { useComplianceStats } from "../hooks/useComplianceStats";
import { ComplianceListFilters } from "../types/compliance.types";
import { ComplianceListTable } from "./ComplianceListTable";
import { FlaggedActivityDetailsModal } from "./FlaggedActivityDetailsModal";

export function ComplianceManagement() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ComplianceListFilters>({
    search: "",
  });
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { activities, loading, pagination, refetch } = useComplianceList(filters, currentPage);
  const { stats, refetch: refetchStats } = useComplianceStats();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === activities.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(activities.map((a) => a.id));
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedActivityId(id);
    setIsDetailsOpen(true);
  };

  const handleActionComplete = () => {
    refetch();
    refetchStats();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading compliance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Compliance Management</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary">{stats.kycSummaryCount.toLocaleString()}</p>
              <p className="text-sm text-text-primary mt-1">KYC Summary Count</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary">{stats.flaggedTransactions}</p>
              <p className="text-sm text-text-primary text-text- mt-1">Flagged Transactions</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary">{stats.suspendedAccounts}</p>
              <p className="text-sm text-text-primary mt-1">Suspended Accounts</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Ban className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Flagged Activity Section */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Flagged Activity</h2>

        <ComplianceListTable
          activities={activities}
          selectedRows={selectedRows}
          onRowSelect={toggleRow}
          onSelectAll={toggleAll}
          filters={filters}
          onFiltersChange={setFilters}
          onViewDetails={handleViewDetails}
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

      {/* Flagged Activity Details Modal */}
      <FlaggedActivityDetailsModal
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        activityId={selectedActivityId}
        onActionComplete={handleActionComplete}
      />
    </div>
  );
}
