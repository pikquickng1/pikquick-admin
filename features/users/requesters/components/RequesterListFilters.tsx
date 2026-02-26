import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RequesterListFilters as Filters } from "../types/requester-list.types";

interface RequesterListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function RequesterListFilters({ filters, onFiltersChange }: RequesterListFiltersProps) {
  const statusOptions = ["All Status", "Active", "Suspended", "Inactive"] as const;
  const sortOptions = ["Most Recent", "Most tasks"] as const;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="Search by name, email or phone number"
          className="pl-10 py-7 rounded w-[480px] border-neutral-200"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-4 bg-white border border-neutral-200 rounded-[4px] text-sm text-text-primary hover:bg-gray-50">
          {filters.status}
            <ChevronDown className="w-4 h-4" />
          
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {statusOptions.map((status) => (
            <DropdownMenuItem
              key={status}
              onSelect={() => onFiltersChange({ ...filters, status })}
              className={filters.status === status ? "bg-primary-50 text-primary-500 font-medium" : ""}
            >
              {status}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
<DropdownMenuTrigger className="flex items-center gap-2 px-4 py-4 bg-white border border-neutral-200 rounded-[4px] text-sm text-text-primary hover:bg-gray-50">
              {filters.sortBy}
            <ChevronDown className="w-4 h-4" />
          
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          {sortOptions.map((sort) => (
            <DropdownMenuItem
              key={sort}
              onSelect={() => onFiltersChange({ ...filters, sortBy: sort })}
              className={filters.sortBy === sort ? "bg-primary-50 text-primary-500 font-medium" : ""}
            >
              {sort}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
