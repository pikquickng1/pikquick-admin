"use client";

import { Search } from "lucide-react";
import { Select } from "@/components/ui/select";
import { ALL_FILTER } from "@/lib/types/enums";
import {
  SUPPORT_TICKET_STATUS_OPTIONS,
  SUPPORT_TICKET_PRIORITY_OPTIONS,
} from "@/lib/constants/filters";
import type { SupportTicketFilters } from "../hooks/useSupportTicketList";

interface SupportTicketListFiltersProps {
  filters: SupportTicketFilters;
  onFiltersChange: (filters: SupportTicketFilters) => void;
}

export function SupportTicketListFilters({
  filters,
  onFiltersChange,
}: SupportTicketListFiltersProps) {
  const statusOptions = SUPPORT_TICKET_STATUS_OPTIONS as unknown as Array<{
    value: string;
    label: string;
  }>;
  const priorityOptions = SUPPORT_TICKET_PRIORITY_OPTIONS as unknown as Array<{
    value: string;
    label: string;
  }>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="relative md:col-span-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by subject or description..."
          value={filters.search || ""}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 py-4 text-text-primary bg-white border border-neutral-200 rounded text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="md:col-span-3">
        <Select
          value={(filters.status as string) ?? ALL_FILTER}
          options={statusOptions}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value === ALL_FILTER
                ? ALL_FILTER
                : (e.target.value as SupportTicketFilters["status"]),
            })
          }
        />
      </div>

      <div className="md:col-span-3">
        <Select
          value={(filters.priority as string) ?? ALL_FILTER}
          options={priorityOptions}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              priority: e.target.value === ALL_FILTER
                ? ALL_FILTER
                : (e.target.value as SupportTicketFilters["priority"]),
            })
          }
        />
      </div>
    </div>
  );
}
