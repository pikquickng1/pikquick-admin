"use client";

import { Search, Filter, Download } from "lucide-react";
import type { EliteRewardFilters as Filters } from "../types/elite-reward.types";

interface EliteRewardFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function EliteRewardFilters({ filters, onFiltersChange }: EliteRewardFiltersProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-neutral-200">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg text-sm text-text-primary hover:bg-neutral-50">
        <Filter className="w-4 h-4" />
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm text-text-primary hover:bg-neutral-50">
        <Download className="w-4 h-4" />
        Export
      </button>
    </div>
  );
}
