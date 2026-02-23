"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";
import { useRunnerList } from "../hooks/useRunnerList";
import { RunnerListFilters } from "./RunnerListFilters";
import { RunnerListTable } from "./RunnerListTable";
import { RunnerListSkeleton } from "./RunnerListSkeleton";
import { RunnerListFilters as Filters } from "../types/runner-list.types";

export function RunnersList() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "All Status",
    sortBy: "Highest Rating",
  });

  const { runners, loading, pagination } = useRunnerList(filters, currentPage);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === runners.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(runners.map((r) => r.id));
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/users/runners/${id}`);
  };

  if (loading) {
    return <RunnerListSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Runners Management</h1>
        <p className="text-sm text-text-secondary mt-1">
          Manage and view all registered service providers
        </p>
      </div>

      <RunnerListTable
        runners={runners}
        selectedRows={selectedRows}
        onRowSelect={toggleRow}
        onSelectAll={toggleAll}
        onViewDetails={handleViewDetails}
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
