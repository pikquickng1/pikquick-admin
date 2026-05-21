import { SupportTicketStatus, SupportTicketPriority } from "./enums";

export interface SupportTicketReply {
  id: string;
  ticket_id: string;
  user_id?: string;
  is_admin_reply: boolean;
  message: string;
  attachments?: object[];
  created_at: string;
  user_full_name?: string;
}

export interface SupportTicket {
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

export interface SupportTicketDetail extends SupportTicket {
  replies: SupportTicketReply[];
}

export interface SupportTicketsListParams {
  page?: number;
  limit?: number;
  status?: SupportTicketStatus;
  priority?: SupportTicketPriority;
  assigned_to?: string;
  search?: string;
}

export interface SupportTicketsListResponse {
  data: SupportTicket[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SupportTicketDetailResponse {
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
  replies: SupportTicketReply[];
}

export interface ReplyToTicketDto {
  message: string;
}

export interface AssignTicketDto {
  assigned_to?: string | null;
}

export interface UpdateTicketStatusDto {
  status: SupportTicketStatus;
}

export interface UpdateTicketPriorityDto {
  priority: SupportTicketPriority;
}