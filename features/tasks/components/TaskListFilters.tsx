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
import type { TaskListFilters as Filters } from "../types/task.types";

interface TaskListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  statusOptions: ReadonlyArray<{ value: string; label: string }>;
  sortOptions: ReadonlyArray<{ value: string; label: string }>;
}

export function TaskListFilters({
  filters,
  onFiltersChange,
  statusOptions,
  sortOptions,
}: TaskListFiltersProps) {
  const labelOf = (options: ReadonlyArray<{ value: string; label: string }>, value: string) =>
    value === ALL_FILTER
      ? options[0]?.label ?? "All Status"
      : options.find((o) => o.value === value)?.label ?? statusLabel(value);

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <Input
          type="text"
          placeholder={SEARCH_PLACEHOLDER_USER}
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 bg-white border-light text-black"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white border border-light rounded-lg text-sm text-text-primary hover:bg-gray-50">
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
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white border border-light rounded-lg text-sm text-text-primary hover:bg-gray-50">
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
