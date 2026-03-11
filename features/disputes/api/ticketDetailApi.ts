import { TicketDetail } from "../types/ticket-detail.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

// Mock data for development
const mockTicketDetail: TicketDetail = {
  id: "1",
  ticketId: "TASK-5678",
  user: {
    name: "John Okafor",
    role: "Runner",
    email: "john.okafor@gmail.com",
    phone: "+234 801 234 5678",
  },
  taskReference: "TASK-5678",
  currentStatus: "In Progress",
  created: "2025-10-29",
  category: "Task Dispute",
  priority: "High",
  assignedAdmin: "Select Admin",
  description: "Requester marked task as incomplete even though I delivered all items with photo proof.",
  attachments: [
    {
      filename: "delivery_photo.jpg",
      url: "/attachments/delivery_photo.jpg",
    },
    {
      filename: "receipt.jpg",
      url: "/attachments/receipt.jpg",
    },
  ],
  chatThread: [
    {
      sender: "Ibrahim Musa",
      message: "I have photo evidence of successful delivery",
      timestamp: "2025-10-29 14:28",
    },
  ],
};

export const ticketDetailApi = {
  async getTicketDetail(ticketId: string): Promise<TicketDetail> {
    try {
      // In production, this would be an actual API call
      // const response = await fetch(`${API_BASE_URL}/disputes/tickets/${ticketId}`);
      // return await response.json();

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockTicketDetail;
    } catch (error) {
      console.error("Failed to fetch ticket detail:", error);
      throw error;
    }
  },

  async markAsResolved(ticketId: string): Promise<void> {
    try {
      // In production, this would be an actual API call
      // await fetch(`${API_BASE_URL}/disputes/tickets/${ticketId}/resolve`, { method: "POST" });

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to mark ticket as resolved:", error);
      throw error;
    }
  },

  async sendMessage(ticketId: string, message: string): Promise<void> {
    try {
      // In production, this would be an actual API call
      // await fetch(`${API_BASE_URL}/disputes/tickets/${ticketId}/messages`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message }),
      // });

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },
};
