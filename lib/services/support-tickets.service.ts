import { apiClient } from "@/lib/api/client";
import type {
  SupportTicketsListParams,
  SupportTicketsListResponse,
  SupportTicketDetailResponse,
  ReplyToTicketDto,
  AssignTicketDto,
  UpdateTicketStatusDto,
  UpdateTicketPriorityDto,
} from "@/lib/types";

export const supportTicketsService = {
  getTickets(params?: SupportTicketsListParams): Promise<SupportTicketsListResponse> {
    return apiClient.get("/support/admin/tickets", { params }).then((r) => r.data);
  },

  getTicketById(id: string): Promise<SupportTicketDetailResponse> {
    return apiClient.get(`/support/admin/tickets/${id}`).then((r) => r.data);
  },

  replyToTicket(id: string, body: ReplyToTicketDto): Promise<SupportTicketDetailResponse> {
    return apiClient.post(`/support/admin/tickets/${id}/reply`, body).then((r) => r.data);
  },

  assignTicket(id: string, body: AssignTicketDto): Promise<{ id: string; assigned_to?: string }> {
    return apiClient.patch(`/support/admin/tickets/${id}/assign`, body).then((r) => r.data);
  },

  updateStatus(id: string, body: UpdateTicketStatusDto): Promise<{ id: string; status: string }> {
    return apiClient.patch(`/support/admin/tickets/${id}/status`, body).then((r) => r.data);
  },

  updatePriority(id: string, body: UpdateTicketPriorityDto): Promise<{ id: string; priority: string }> {
    return apiClient.patch(`/support/admin/tickets/${id}/priority`, body).then((r) => r.data);
  },
};