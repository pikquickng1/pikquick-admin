"use client";

import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ALL_FILTER, ReferralRewardStatus } from "@/lib/types/enums";
import type { EliteRewardFilters as Filters } from "../types/elite-reward.types";

interface EliteRewardFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const STATUS_OPTIONS = [
  { value: ALL_FILTER, label: "All Status" },
  { value: ReferralRewardStatus.PENDING_VERIFICATION, label: "Pending" },
  { value: ReferralRewardStatus.PAID, label: "Approved" },
  { value: ReferralRewardStatus.REJECTED, label: "Rejected" },
];

export function EliteRewardFilters({ filters, onFiltersChange }: EliteRewardFiltersProps) {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-neutral-200">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        <Input
          type="text"
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <div className="w-48">
        <Select
          options={STATUS_OPTIONS}
          value={filters.status ?? ALL_FILTER}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value === ALL_FILTER ? undefined : (e.target.value as Filters["status"]),
            })
          }
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
