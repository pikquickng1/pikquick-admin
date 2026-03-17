import {
  FlaggedActivity,
  FlaggedActivityDetails,
  ComplianceListFilters,
  ComplianceListResponse,
  ComplianceStats,
} from "../types/compliance.types";
import { complianceService } from "@/lib/services/compliance.service";

export const complianceApi = {
  getFlaggedActivities: async (
    filters: ComplianceListFilters,
    page: number = 1
  ): Promise<ComplianceListResponse> => {
    try {
      const response = await complianceService.getFlaggedActivities({ ...filters, page });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch flagged activities:", error);
      throw error;
    }
  },

  getFlaggedActivityById: async (id: string): Promise<FlaggedActivityDetails> => {
    try {
      const response = await complianceService.getFlaggedActivityById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch flagged activity:", error);
      throw error;
    }
  },

  getComplianceStats: async (): Promise<ComplianceStats> => {
    try {
      const response = await complianceService.getStats();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch compliance stats:", error);
      throw error;
    }
  },

  updateFlagStatus: async (id: string, status: string): Promise<void> => {
    try {
      await complianceService.updateFlagStatus(id, status);
    } catch (error) {
      console.error("Failed to update flag status:", error);
      throw error;
    }
  },
};
