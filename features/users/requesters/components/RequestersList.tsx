"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/pagination";
import { useRequesterList } from "../hooks/useRequesterList";
import { RequesterListFilters } from "./RequesterListFilters";
import { RequesterListTable } from "./RequesterListTable";
import { RequesterListFilters as Filters } from "../types/requester-list.types";

export function RequestersList() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "All Status",
    sortBy: "Most Recent",
  });

  const { requesters, loading, pagination } = useRequesterList(filters, currentPage);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === requesters.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(requesters.map((r) => r.id));
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/users/requesters/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading requesters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-text-primary">Requesters Management</h1>
        <p className="text-sm text-text-secondary mt-1">Manage and view all registered customers</p>
      </div>

      <RequesterListTable
        requesters={requesters}
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
        showingTo={Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}
