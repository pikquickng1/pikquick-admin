"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { LoadingState } from "@/components/ui/loading-state";
import { ALL_FILTER } from "@/lib/types/enums";
import { DEFAULT_PAGE } from "@/lib/config/pagination";
import { useReferralRecordList } from "../hooks/useReferralRecordList";
import type { ReferralRecordFilters as Filters } from "../types/referral-record.types";
import { ReferralRecordTable } from "./ReferralRecordTable";

export function ReferralRecordsList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: ALL_FILTER,
  });

  const { records, loading, pagination } = useReferralRecordList(filters, currentPage);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
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
    return <LoadingState label="Loading referral records..." />;
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
        showingTo={Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}
