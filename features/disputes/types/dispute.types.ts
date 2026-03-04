export type TicketStatus = "Open" | "In Progress" | "Resolved";
export type TicketPriority = "High" | "Medium" | "Low";
export type TicketCategory = "Task Dispute" | "Payment Issue" | "Account Issue" | "Technical Support" | "Other";

export interface Ticket {
  id: string;
  ticketId: string;
  user: {
    name: string;
    role: "Runner" | "Requester";
  };
  category: TicketCategory;
  priority: TicketPriority;
  assignedAgent: string;
  status: TicketStatus;
  date: string;
}

export interface TicketListFilters {
  search: string;
  priority: string;
  category: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface TicketListResponse {
  tickets: Ticket[];
  total: number;
  page: number;
  pageSize: number;
}

export interface TicketStats {
  openTickets: number;
  inProgress: number;
  resolved: number;
}
