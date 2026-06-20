import {
  ALL_FILTER,
  DisputeCategory,
  DisputePriority,
  DisputeStatus,
} from "@/lib/types/enums";
import type { AllFilter } from "@/lib/types/enums";

export type DisputeTicketStatus = DisputeStatus;
export type DisputeTicketPriority = DisputePriority;
export type DisputeTicketCategory = DisputeCategory;

/**
 * Backend response shape (see disputes/repositories/dispute.repository.ts:74-89,
 * disputes/services/dispute.service.ts:11-29).
 */
export interface DisputeTicket {
  id: string;
  ticket_id: string;
  category: string;
  priority: string;
  status: string;
  description?: string;
  resolution_notes?: string | null;
  resolved_at?: string | null;
  created_at: string;
  updated_at?: string;
  user?: {
    full_name: string;
    role: string;
  };
  task?: {
    title: string;
  };
  assigned_agent?: {
    full_name: string;
  };
}

export interface DisputeTicketListFilters {
  search: string;
  priority?: DisputePriority | AllFilter;
  category?: DisputeCategory | AllFilter;
  status?: DisputeStatus | AllFilter;
  dateFrom?: string;
  dateTo?: string;
}

export interface DisputeTicketListResponse {
  tickets: DisputeTicket[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface DisputeTicketStats {
  openTickets: number;
  inProgress: number;
  resolved: number;
}

/** Tab keys used in the disputes list view. */
export type DisputeTab = "open" | "in-progress" | "resolved";
export const DEFAULT_DISPUTE_TAB: DisputeTab = "open";

export const DEFAULT_DISPUTE_FILTERS: DisputeTicketListFilters = {
  search: "",
  priority: ALL_FILTER,
  category: ALL_FILTER,
  status: ALL_FILTER,
};
