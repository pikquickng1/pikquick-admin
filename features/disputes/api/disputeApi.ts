import { Ticket, TicketListFilters, TicketListResponse, TicketStats } from "../types/dispute.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

// Mock data for development
const mockTickets: Ticket[] = [
  {
    id: "1",
    ticketId: "TKT002",
    user: { name: "Ibrahim Musa", role: "Runner" },
    category: "Task Dispute",
    priority: "High",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-29",
  },
  {
    id: "2",
    ticketId: "TKT003",
    user: { name: "Ibrahim Musa", role: "Runner" },
    category: "Task Dispute",
    priority: "Medium",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-29",
  },
  {
    id: "3",
    ticketId: "TKT004",
    user: { name: "Ibrahim Musa", role: "Runner" },
    category: "Task Dispute",
    priority: "Medium",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-29",
  },
  {
    id: "4",
    ticketId: "TKT005",
    user: { name: "Ibrahim Musa", role: "Runner" },
    category: "Task Dispute",
    priority: "High",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-29",
  },
  {
    id: "5",
    ticketId: "TKT006",
    user: { name: "Ibrahim Musa", role: "Runner" },
    category: "Task Dispute",
    priority: "Medium",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-29",
  },
  {
    id: "6",
    ticketId: "TKT007",
    user: { name: "Ibrahim Musa", role: "Runner" },
    category: "Task Dispute",
    priority: "Low",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-29",
  },
  {
    id: "7",
    ticketId: "TKT008",
    user: { name: "Sarah Johnson", role: "Requester" },
    category: "Payment Issue",
    priority: "High",
    assignedAgent: "Agent Sarah",
    status: "Open",
    date: "2025-10-28",
  },
  {
    id: "8",
    ticketId: "TKT009",
    user: { name: "John Doe", role: "Runner" },
    category: "Account Issue",
    priority: "Medium",
    assignedAgent: "Agent John",
    status: "Open",
    date: "2025-10-28",
  },
  {
    id: "9",
    ticketId: "TKT010",
    user: { name: "Mary Smith", role: "Requester" },
    category: "Technical Support",
    priority: "Low",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-27",
  },
  {
    id: "10",
    ticketId: "TKT011",
    user: { name: "David Brown", role: "Runner" },
    category: "Task Dispute",
    priority: "High",
    assignedAgent: "Agent Sarah",
    status: "Open",
    date: "2025-10-27",
  },
  {
    id: "11",
    ticketId: "TKT012",
    user: { name: "Lisa Wilson", role: "Requester" },
    category: "Payment Issue",
    priority: "Medium",
    assignedAgent: "Agent John",
    status: "Open",
    date: "2025-10-26",
  },
  {
    id: "12",
    ticketId: "TKT013",
    user: { name: "Michael Chen", role: "Runner" },
    category: "Task Dispute",
    priority: "Low",
    assignedAgent: "Agent Mike",
    status: "Open",
    date: "2025-10-26",
  },
];

export const disputeApi = {
  async getTickets(filters: TicketListFilters, page = 1, pageSize = 10): Promise<TicketListResponse> {
    try {
      // In production, this would be an actual API call
      // const response = await fetch(`${API_BASE_URL}/disputes/tickets?page=${page}&pageSize=${pageSize}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(filters),
      // });
      // return await response.json();

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));

      let filtered = [...mockTickets];

      // Apply filters
      if (filters.search) {
        filtered = filtered.filter(
          (ticket) =>
            ticket.ticketId.toLowerCase().includes(filters.search.toLowerCase()) ||
            ticket.user.name.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      if (filters.priority && filters.priority !== "All Priority") {
        filtered = filtered.filter((ticket) => ticket.priority === filters.priority);
      }

      if (filters.category && filters.category !== "All Categories") {
        filtered = filtered.filter((ticket) => ticket.category === filters.category);
      }

      return {
        tickets: filtered,
        total: filtered.length,
        page,
        pageSize,
      };
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      throw error;
    }
  },

  async getTicketStats(): Promise<TicketStats> {
    try {
      // In production, this would be an actual API call
      // const response = await fetch(`${API_BASE_URL}/disputes/stats`);
      // return await response.json();

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 300));

      return {
        openTickets: 3,
        inProgress: 3,
        resolved: 2,
      };
    } catch (error) {
      console.error("Failed to fetch ticket stats:", error);
      throw error;
    }
  },
};
