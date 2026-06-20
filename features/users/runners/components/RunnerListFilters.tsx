import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ALL_FILTER } from "@/lib/types/enums";
import { SEARCH_PLACEHOLDER_USER } from "@/lib/constants/filters";
import { statusLabel } from "@/lib/utils/status";
import type { RunnerListFilters as Filters } from "../types/runner-list.types";

interface RunnerListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  statusOptions: ReadonlyArray<{ value: string; label: string }>;
  verificationOptions: ReadonlyArray<{ value: string; label: string }>;
  sortOptions: ReadonlyArray<{ value: string; label: string }>;
}

export function RunnerListFilters({
  filters,
  onFiltersChange,
  statusOptions,
  verificationOptions,
  sortOptions,
}: RunnerListFiltersProps) {
  const labelOf = (options: ReadonlyArray<{ value: string; label: string }>, value: string) => {
    if (value === ALL_FILTER) return options[0]?.label ?? "All Status";
    return options.find((o) => o.value === value)?.label ?? statusLabel(value);
  };

  return (
    <div className="flex items-center gap-4 text-text-primary">
      <div className="flex-1 relative text-text-primary">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-primary" />
        <Input
          type="text"
          placeholder={SEARCH_PLACEHOLDER_USER}
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 py-7 bg-white border-neutral-200 w-[480px] rounded text-text-primary"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-4 bg-white border border-neutral-200 rounded-[4px] text-sm text-text-primary hover:bg-gray-50">
          {labelOf(statusOptions, filters.status)}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() =>
                onFiltersChange({ ...filters, status: option.value as Filters["status"] })
              }
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-4 bg-white border border-neutral-200 rounded-[4px] text-sm text-text-primary hover:bg-gray-50">
          {labelOf(verificationOptions, filters.verification ?? ALL_FILTER)}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {verificationOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() =>
                onFiltersChange({
                  ...filters,
                  verification: option.value as Filters["verification"],
                })
              }
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-4 bg-white border border-neutral-200 rounded-[4px] text-sm text-text-primary hover:bg-gray-50">
          {labelOf(sortOptions, filters.sortBy)}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={() => onFiltersChange({ ...filters, sortBy: option.value })}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
