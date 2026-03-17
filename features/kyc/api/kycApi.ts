import { KYCVerification, KYCListFilters, KYCListResponse, KYCStats } from "../types/kyc.types";
import { kycService } from "@/lib/services/kyc.service";

export const kycApi = {
  getKYCList: async (
    status: "pending" | "resubmission",
    filters: KYCListFilters,
    page: number = 1
  ): Promise<KYCListResponse> => {
    try {
      const response = await kycService.getList({ ...filters, status, page });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch KYC list:", error);
      throw error;
    }
  },

  getKYCById: async (id: string, status?: "pending" | "resubmission"): Promise<KYCVerification> => {
    try {
      const response = await kycService.getById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch KYC details:", error);
      throw error;
    }
  },

  getKYCStats: async (): Promise<KYCStats> => {
    try {
      const response = await kycService.getStats();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch KYC stats:", error);
      throw error;
    }
  },

  approveKYC: async (id: string): Promise<void> => {
    try {
      await kycService.approve(id, "");
    } catch (error) {
      console.error("Failed to approve KYC:", error);
      throw error;
    }
  },

  rejectKYC: async (id: string, reason: string): Promise<void> => {
    try {
      await kycService.reject(id, reason, "");
    } catch (error) {
      console.error("Failed to reject KYC:", error);
      throw error;
    }
  },
};
