import type { DisputeTicket } from "./dispute.types";

/**
 * Backend mounts at /admin/disputes/tickets/:id (see
 * disputes/controllers/dispute.controller.ts:70). It returns the full Dispute
 * record joined with user/task/agent.
 */
export interface DisputeTicketDetail extends DisputeTicket {
  ticketId: string;
}
