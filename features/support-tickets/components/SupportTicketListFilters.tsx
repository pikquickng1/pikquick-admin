"use client";

import { Search } from "lucide-react";
import type { SupportTicketStatus, SupportTicketPriority } from "@/lib/types";

interface SupportTicketFilters {
  search?: string;
  status?: SupportTicketStatus | "all";
  priority?: SupportTicketPriority | "all";
}

interface SupportTicketListFiltersProps {
  filters: SupportTicketFilters;
  onFiltersChange: (filters: SupportTicketFilters) => void;
}

export function SupportTicketListFilters({ filters, onFiltersChange }: SupportTicketListFiltersProps) {
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
        <select
          value={filters.status || "all"}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              status: e.target.value === "all" ? undefined : (e.target.value as SupportTicketStatus),
            })
          }
          className="w-full px-4 py-4 bg-white border border-neutral-200 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
          }}
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="md:col-span-3">
        <select
          value={filters.priority || "all"}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              priority: e.target.value === "all" ? undefined : (e.target.value as SupportTicketPriority),
            })
          }
          className="w-full px-4 py-4 bg-white border border-neutral-200 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 1rem center",
          }}
        >
          <option value="all">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
    </div>
  );
}