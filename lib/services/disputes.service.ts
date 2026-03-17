import { apiClient } from "@/lib/api/client";

export const disputesService = {
  getTickets(params?: Record<string, unknown>) {
    return apiClient.post("/admin/disputes/tickets", params || {}).then((r) => r.data);
  },
  getStats() {
    return apiClient.get("/admin/disputes/stats").then((r) => r.data);
  },
  getTicketById(id: string) {
    return apiClient.get(`/admin/disputes/tickets/${id}`).then((r) => r.data);
  },
  assignTicket(id: string, agentId: string) {
    return apiClient.post(`/admin/disputes/${id}/assign`, { agentId }).then((r) => r.data);
  },
  resolveTicket(id: string, status: string, resolutionNotes?: string) {
    return apiClient.post(`/admin/disputes/${id}/resolve`, { status, resolutionNotes }).then((r) => r.data);
  },
};
