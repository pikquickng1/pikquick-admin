import { TicketDetail } from "../types/ticket-detail.types";
import { disputesService } from "@/lib/services";

export const ticketDetailApi = {
  async getTicketDetail(ticketId: string): Promise<TicketDetail> {
    try {
      const response = await disputesService.getTicketById(ticketId);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch ticket detail:", error);
      throw error;
    }
  },

  async markAsResolved(ticketId: string): Promise<void> {
    try {
      await disputesService.resolveTicket(ticketId, "Resolved");
    } catch (error) {
      console.error("Failed to mark ticket as resolved:", error);
      throw error;
    }
  },

  async sendMessage(ticketId: string, message: string): Promise<void> {
    try {
      console.log("Sending message to ticket:", ticketId, message);
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },
};
