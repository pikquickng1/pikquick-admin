import { SupportTicketStatus, SupportTicketPriority } from "@/lib/types";

export interface SupportTicketListItem {
  id: string;
  user_id?: string;
  subject: string;
  description: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  assigned_to?: string;
  assigned_to_name?: string;
  is_resolved_by_user: boolean;
  resolved_at?: string;
  closed_at?: string;
  created_at: string;
  updated_at: string;
  reply_count?: number;
}

export interface SupportTicketFilters {
  search: string;
  status: SupportTicketStatus | "all";
  priority: SupportTicketPriority | "all";
  assigned_to?: string;
}

export interface SupportTicketStats {
  open: number;
  in_progress: number;
  resolved: number;
  closed: number;
  total: number;
}