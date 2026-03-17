import { Ticket, TicketListFilters, TicketListResponse, TicketStats } from "../types/dispute.types";
import { disputesService } from "@/lib/services/disputes.service";

export const disputeApi = {
  async getTickets(filters: TicketListFilters, page = 1, pageSize = 10): Promise<TicketListResponse> {
    try {
      const response = await disputesService.getTickets({ ...filters, page, pageSize });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
      throw error;
    }
  },

  async getTicketStats(): Promise<TicketStats> {
    try {
      const response = await disputesService.getStats();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ticket stats:", error);
      throw error;
    }
  },
};
