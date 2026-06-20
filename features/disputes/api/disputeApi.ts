import type {
  DisputeTicket,
  DisputeTicketListFilters,
  DisputeTicketListResponse,
  DisputeTicketStats,
} from "../types/dispute.types";
import type { DisputeTicketDetail } from "../types/ticket-detail.types";
import { disputesService } from "@/lib/services/disputes.service";
import { statusToApi } from "@/lib/utils/status";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";

function buildBody(
  filters: DisputeTicketListFilters,
  page: number,
  pageSize: number,
) {
  return {
    search: filters.search || undefined,
    priority: statusToApi(filters.priority),
    category: statusToApi(filters.category),
    status: statusToApi(filters.status),
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    page,
    pageSize,
  };
}

export const disputeApi = {
  async getTickets(
    filters: DisputeTicketListFilters,
    page = 1,
    pageSize: number = DEFAULT_PAGE_SIZE,
  ): Promise<DisputeTicketListResponse> {
    return (await disputesService.getTickets(
      buildBody(filters, page, pageSize),
    )) as DisputeTicketListResponse;
  },

  async getTicketStats(): Promise<DisputeTicketStats> {
    return (await disputesService.getStats()) as DisputeTicketStats;
  },

  async getTicketById(id: string): Promise<DisputeTicketDetail> {
    return (await disputesService.getTicketById(id)) as DisputeTicketDetail;
  },

  async resolveTicket(
    id: string,
    status: string,
    resolutionNotes?: string,
  ): Promise<void> {
    await disputesService.resolveTicket(id, status, resolutionNotes);
  },
};
