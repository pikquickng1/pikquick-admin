import type {
  ComplianceListFilters,
  ComplianceListResponse,
  ComplianceStats,
  FlaggedActivityDetails,
} from "../types/compliance.types";
import {
  MOCK_COMPLIANCE_STATS,
  MOCK_FLAGGED_ACTIVITIES,
} from "../types/compliance.types";
import { complianceService } from "@/lib/services/compliance.service";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import { statusToApi } from "@/lib/utils/status";
import { ALL_FILTER, FlagStatus } from "@/lib/types/enums";

const MOCK_DELAY_MS = 250;
const MOCK_PAGE_SIZE = 20;

function buildParams(filters: ComplianceListFilters, page: number) {
  return {
    search: filters.search || undefined,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    status: statusToApi(filters.status),
    page,
  };
}

function filterMockList(
  filters: ComplianceListFilters,
  page: number,
): ComplianceListResponse {
  const all = MOCK_FLAGGED_ACTIVITIES.filter((a) => {
    if (filters.status && filters.status !== ALL_FILTER && a.flagStatus !== filters.status) {
      return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const hay = `${a.userName} ${a.activitySummary}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  const total = all.length;
  const start = (page - 1) * MOCK_PAGE_SIZE;
  const slice = all.slice(start, start + MOCK_PAGE_SIZE);
  return {
    data: slice,
    pagination: {
      currentPage: page,
      totalItems: total,
      itemsPerPage: MOCK_PAGE_SIZE,
      totalPages: Math.max(1, Math.ceil(total / MOCK_PAGE_SIZE)),
    },
  };
}

export const complianceApi = {
  async getFlaggedActivities(
    filters: ComplianceListFilters,
    page: number = 1,
  ): Promise<ComplianceListResponse> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
      return filterMockList(filters, page);
    }
    return (await complianceService.getFlaggedActivities(
      buildParams(filters, page),
    )) as unknown as ComplianceListResponse;
  },

  async getFlaggedActivityById(id: string): Promise<FlaggedActivityDetails> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
      const found = MOCK_FLAGGED_ACTIVITIES.find((a) => a.id === id);
      if (!found) {
        return {
          ...MOCK_FLAGGED_ACTIVITIES[0],
          id,
          totalAmount: 0,
          transactionCount: 0,
        };
      }
      return { ...found, totalAmount: 250_000, transactionCount: 4 };
    }
    return (await complianceService.getFlaggedActivityById(
      id,
    )) as unknown as FlaggedActivityDetails;
  },

  async getComplianceStats(): Promise<ComplianceStats> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
      return MOCK_COMPLIANCE_STATS;
    }
    return (await complianceService.getStats()) as unknown as ComplianceStats;
  },

  async updateFlagStatus(id: string, status: FlagStatus): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
      return;
    }
    await complianceService.updateFlagStatus(id, status);
  },
};
