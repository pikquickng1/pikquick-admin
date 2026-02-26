import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TaskListFilters as Filters } from "../types/task.types";

interface TaskListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function TaskListFilters({ filters, onFiltersChange }: TaskListFiltersProps) {
  const statusOptions = ["All Status", "In Progress", "Completed", "Pending", "Cancelled"] as const;
  const sortOptions = ["Highest Rating", "Most Recent"] as const;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search by name, email or phone number"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10 bg-white border-light"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white border border-light rounded-lg text-sm text-text-primary hover:bg-gray-50">
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
        <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-white border border-light rounded-lg text-sm text-text-primary hover:bg-gray-50">
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
