"use client";

import { useState } from "react";
import { Search, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ComplianceListFilters as Filters } from "../types/compliance.types";

interface ComplianceListFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function ComplianceListFilters({ filters, onFiltersChange }: ComplianceListFiltersProps) {
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
      <div className="relative md:col-span-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or ID"
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 py-4 text-text-primary bg-white border border-neutral-200 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="md:col-span-2">
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center justify-between w-full px-4 py-4 bg-white border border-neutral-200 rounded text-sm text-gray-900 hover:bg-gray-50">
              {date ? format(date, "PPP") : "Date"}
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
