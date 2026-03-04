"use client";

import { useState } from "react";
import { Search, Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TicketListFilters } from "../types/dispute.types";

interface DisputeListFiltersProps {
  filters: TicketListFilters;
  onFiltersChange: (filters: TicketListFilters) => void;
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
        <select
          value={filters.priority}
          onChange={(e) => onFiltersChange({ ...filters, priority: e.target.value })}
          className="w-full px-4 py-4 bg-white border border-neutral-200 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
          }}
        >
          <option>All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <select
          value={filters.category}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
          className="w-full px-4 py-4 bg-white border border-neutral-200 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
          }}
        >
          <option>All Categories</option>
          <option>Task Dispute</option>
          <option>Payment Issue</option>
          <option>Account Issue</option>
          <option>Technical Support</option>
          <option>Other</option>
        </select>
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
