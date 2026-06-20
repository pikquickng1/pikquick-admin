"use client";

import { Search, Filter } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { ReferralRecordFilters as Filters } from "../types/referral-record.types";

interface ReferralRecordFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  statusOptions: ReadonlyArray<{ value: string; label: string }>;
  allFilter: string;
}

export function ReferralRecordFilters({
  filters,
  onFiltersChange,
  statusOptions,
  allFilter,
}: ReferralRecordFiltersProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-neutral-200">
      <div className="flex-1 relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <Input
          type="text"
          placeholder="Search by referrer or referred user..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <div className="w-48">
        <Select
          options={statusOptions}
          value={filters.status ?? allFilter}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value === allFilter ? undefined : (e.target.value as Filters["status"]),
            })
          }
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-sm text-text-primary hover:bg-neutral-50">
        <Filter className="w-4 h-4" />
        Filter
      </button>
    </div>
  );
}
