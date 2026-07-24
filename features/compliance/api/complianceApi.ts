import type {
  ComplianceListFilters,
  ComplianceListResponse,
  ComplianceStats,
  FlaggedActivityDetails,
} from "../types/compliance.types";
import { complianceService } from "@/lib/services/compliance.service";
import { statusToApi } from "@/lib/utils/status";
import { FlagStatus } from "@/lib/types/enums";

function buildParams(filters: ComplianceListFilters, page: number) {
  return {
    search: filters.search || undefined,
    dateFrom: filters.dateFrom || undefined,
    dateTo: filters.dateTo || undefined,
    status: statusToApi(filters.status),
    page,
  };
}

export const complianceApi = {
  async getFlaggedActivities(
    filters: ComplianceListFilters,
    page: number = 1,
  ): Promise<ComplianceListResponse> {
    return (await complianceService.getFlaggedActivities(
      buildParams(filters, page),
    )) as unknown as ComplianceListResponse;
  },

  async getFlaggedActivityById(id: string): Promise<FlaggedActivityDetails> {
    return (await complianceService.getFlaggedActivityById(
      id,
    )) as unknown as FlaggedActivityDetails;
  },

  async getComplianceStats(): Promise<ComplianceStats> {
    return (await complianceService.getStats()) as unknown as ComplianceStats;
  },

  async updateFlagStatus(id: string, status: FlagStatus): Promise<void> {
    await complianceService.updateFlagStatus(id, status);
  },
};
