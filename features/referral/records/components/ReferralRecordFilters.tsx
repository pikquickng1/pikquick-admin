"use client";

import { Search, Filter } from "lucide-react";
import type { ReferralRecordFilters as Filters } from "../types/referral-record.types";

interface ReferralRecordFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function ReferralRecordFilters({ filters, onFiltersChange }: ReferralRecordFiltersProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-neutral-200">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search by referrer or referred user..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-sm text-text-primary hover:bg-neutral-50">
        <Filter className="w-4 h-4" />
        Filter
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-text-primary hover:bg-neutral-50">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Export
      </button>
    </div>
  );
}
