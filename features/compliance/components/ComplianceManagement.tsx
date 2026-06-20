"use client";

import { LoadingState } from "@/components/ui/loading-state";
import { PageHeader } from "@/components/ui/page-header";
import { ComplianceListFilters } from "./ComplianceListFilters";
import { ComplianceListTable } from "./ComplianceListTable";
import { useComplianceList } from "../hooks/useComplianceList";
import { useComplianceStats } from "../hooks/useComplianceStats";
import { ALL_FILTER } from "@/lib/types/enums";
import { DEFAULT_PAGE } from "@/lib/config/pagination";
import type { ComplianceListFilters as ComplianceListFiltersType } from "../types/compliance.types";
import { useState } from "react";

export function ComplianceManagement() {
  const [filters, setFilters] = useState<ComplianceListFiltersType>({
    search: "",
    dateFrom: undefined,
    dateTo: undefined,
    status: ALL_FILTER,
  });
  const [page, setPage] = useState<number>(DEFAULT_PAGE);

  const list = useComplianceList(filters, page);
  const { loading: statsLoading } = useComplianceStats();

  if (list.loading || statsLoading) return <LoadingState label="Loading compliance" />;
  if (list.error) return <div className="text-red-500">{list.error}</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance Management"
        description="Manage flagged activities and compliance cases"
      />

      <ComplianceListFilters
        filters={filters}
        onFiltersChange={(next) => {
          setFilters(next);
          setPage(DEFAULT_PAGE);
        }}
      />

      <ComplianceListTable activities={list.activities} />

      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Page {list.pagination.currentPage} of {list.pagination.totalPages} ({list.pagination.totalItems} total)
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            disabled={list.pagination.currentPage <= 1}
            onClick={() => setPage(list.pagination.currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 rounded border disabled:opacity-50"
            disabled={list.pagination.currentPage >= list.pagination.totalPages}
            onClick={() => setPage(list.pagination.currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
