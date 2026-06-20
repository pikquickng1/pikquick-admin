import type {
  KYCListFilters,
  KYCListResponse,
  KYCStats,
  KYCVerification,
  KycStatus,
  KycTab,
} from "../types/kyc.types";
import { kycService } from "@/lib/services/kyc.service";

interface AdminContext {
  adminId?: string;
}

export const kycApi = {
  async getKYCList(
    status: KycTab,
    _filters: KYCListFilters,
    page: number = 1,
  ): Promise<KYCListResponse> {
    const response = await kycService.getList({ status, page });
    return response as unknown as KYCListResponse;
  },

  async getKYCById(id: string): Promise<KYCVerification> {
    const response = await kycService.getById(id);
    return response as unknown as KYCVerification;
  },

  async getKYCStats(): Promise<KYCStats> {
    const response = await kycService.getStats();
    return response as unknown as KYCStats;
  },

  async approveKYC(id: string, ctx: AdminContext = {}): Promise<void> {
    await kycService.approve(id, ctx.adminId ?? "");
  },

  async rejectKYC(id: string, reason: string, ctx: AdminContext = {}): Promise<void> {
    await kycService.reject(id, reason, ctx.adminId ?? "");
  },
};

export type { KycStatus, KycTab };
