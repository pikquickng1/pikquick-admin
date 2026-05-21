"use client";

import { Search } from "lucide-react";
import type { DocumentVerificationStatus } from "@/lib/types";

interface RunnerDocumentFiltersProps {
  filters: {
    search?: string;
    status?: DocumentVerificationStatus | "all";
    document_type_id?: string;
  };
  onFiltersChange: (filters: {
    search?: string;
    status?: DocumentVerificationStatus | "all";
    document_type_id?: string;
  }) => void;
}

export function RunnerDocumentFilters({ filters, onFiltersChange }: RunnerDocumentFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="relative md:col-span-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by runner name or document..."
          value={filters.search || ""}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 py-4 text-text-primary bg-white border border-neutral-200 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="md:col-span-4">
        <select
          value={filters.status || "all"}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value === "all" ? undefined : (e.target.value as DocumentVerificationStatus),
            })
          }
          className="w-full px-4 py-4 bg-white border border-neutral-200 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
}