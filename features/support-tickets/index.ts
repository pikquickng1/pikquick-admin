export { SupportTicketsList } from "./components/SupportTicketsList";
export { SupportTicketListFilters } from "./components/SupportTicketListFilters";

export {
  useSupportTicketsList,
  useSupportTicketStats,
  DEFAULT_SUPPORT_TICKET_FILTERS,
  type SupportTicketFilters,
} from "./hooks/useSupportTicketList";
export { useSupportTicketDetail } from "./hooks/useSupportTicketDetail";

export type {
  SupportTicketListItem,
  SupportTicketFilters as SupportTicketFiltersShape,
  SupportTicketStats,
} from "./types/support-ticket.types";
