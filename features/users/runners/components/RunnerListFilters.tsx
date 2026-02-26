import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RunnerListFilters as Filters } from "../types/runner-list.types";

interface RunnerListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function RunnerListFilters({ filters, onFiltersChange }: RunnerListFiltersProps) {
  const statusOptions = ["All Status", "Available", "Unavailable", "Suspended"] as const;
  const sortOptions = ["Highest Rating", "Most Tasks"] as const;

  return (
    <div className="flex items-center gap-4 text-text-primary ">
      <div className="flex-1 relative text-text-primary">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-primary" />
        <Input
          type="text"
          placeholder="Search by name, email or phone number"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 py-7 bg-white border-neutral-200 w-[480px] rounded text-text-primary"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-4 bg-white border border-neutral-200 rounded-[4px] text-sm text-text-primary hover:bg-gray-50">
          {filters.status || "All Status"}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={() => onFiltersChange({ ...filters, status: option })}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-4 bg-white border border-neutral-200 rounded-[4px] text-sm text-text-primary hover:bg-gray-50">
          {filters.sortBy || "Highest Rating"}
          <ChevronDown className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onSelect={() => onFiltersChange({ ...filters, sortBy: option })}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
