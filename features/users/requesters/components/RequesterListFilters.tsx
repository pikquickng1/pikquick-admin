import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ALL_FILTER } from "@/lib/types/enums";
import { USER_STATUS_OPTIONS, USER_SORT_OPTIONS } from "@/lib/constants/filters";
import { statusLabel } from "@/lib/utils/status";
import type { RequesterListFilters as Filters } from "../types/requester-list.types";

interface RequesterListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const STATUS_OPTIONS = USER_STATUS_OPTIONS.map((o) => ({
  value: o.value,
  label: o.value === ALL_FILTER ? o.label : statusLabel(o.value),
}));

export function RequesterListFilters({ filters, onFiltersChange }: RequesterListFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="Search by name, email or phone number"
          className="pl-10 py-7 rounded w-[480px] border-neutral-200 text-black"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>

      <Select
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as Filters["status"] })}
        placeholder="Status"
        className="min-w-[160px]"
      />

      <Select
        value={filters.sortBy}
        options={USER_SORT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
        onChange={(e) => onFiltersChange({ ...filters, sortBy: e.target.value })}
        placeholder="Sort by"
        className="min-w-[160px]"
      />
    </div>
  );
}
