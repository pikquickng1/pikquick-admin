export interface TicketDetail {
  id: string;
  ticketId: string;
  user: {
    name: string;
    role: "Runner" | "Requester";
    email: string;
    phone: string;
  };
  taskReference: string;
  currentStatus: "In Progress" | "Open" | "Resolved";
  created: string;
  category: string;
  priority: string;
  assignedAdmin: string;
  description: string;
  attachments: {
    filename: string;
    url: string;
  }[];
  chatThread: {
    sender: string;
    message: string;
    timestamp: string;
  }[];
}
