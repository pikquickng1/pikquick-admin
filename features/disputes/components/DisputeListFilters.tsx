"use client";

import { useState } from "react";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select } from "@/components/ui/select";
import { ALL_FILTER } from "@/lib/types/enums";
import {
  DISPUTE_PRIORITY_OPTIONS,
  DISPUTE_CATEGORY_OPTIONS,
  DISPUTE_STATUS_OPTIONS,
} from "@/lib/constants/filters";
import type { DisputeTicketListFilters as Filters } from "../types/dispute.types";
import { useState } from "react";

interface DisputeListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function DisputeListFilters({ filters, onFiltersChange }: DisputeListFiltersProps) {
  const [date, setDate] = useState<Date>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      onFiltersChange({
        ...filters,
        dateFrom: selectedDate.toISOString().split("T")[0],
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="relative md:col-span-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Ticket ID or User..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 py-4 text-text-primary bg-white border border-neutral-200 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="md:col-span-2">
        <Select
          value={(filters.priority as string) ?? ALL_FILTER}
          options={DISPUTE_PRIORITY_OPTIONS as unknown as { value: string; label: string }[]}
          onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value as Filters["priority"] })}
        />
      </div>

      <div className="md:col-span-2">
        <Select
          value={(filters.category as string) ?? ALL_FILTER}
          options={DISPUTE_CATEGORY_OPTIONS as unknown as { value: string; label: string }[]}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as Filters["category"] })}
        />
      </div>

      <div className="md:col-span-2">
        <Select
          value={(filters.status as string) ?? ALL_FILTER}
          options={DISPUTE_STATUS_OPTIONS as unknown as { value: string; label: string }[]}
          onChange={(e) => onFiltersChange({ ...filters, status: e.target.value as Filters["status"] })}
        />
      </div>

      <div className="md:col-span-12">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center justify-between w-full px-4 py-4 bg-white border border-neutral-200 rounded text-sm text-gray-900 hover:bg-gray-50">
              {date ? format(date, "PPP") : "Filter by date"}
              <CalendarIcon className="w-4 h-4 text-gray-600" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
