"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { useReferralRecordList } from "../hooks/useReferralRecordList";
import { ReferralRecordFilters } from "../types/referral-record.types";
import { ReferralRecordTable } from "./ReferralRecordTable";

export function ReferralRecordsList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<ReferralRecordFilters>({
    search: "",
  });

  const { records, loading, pagination } = useReferralRecordList(filters, currentPage);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === records.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(records.map((r) => r.id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading referral records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Referral Audit Details</h1>

      <ReferralRecordTable
        records={records}
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
