import { KYCVerification, KYCListFilters, KYCListResponse, KYCStats } from "../types/kyc.types";

export const kycApi = {
  getKYCList: async (
    status: "pending" | "resubmission",
    filters: KYCListFilters,
    page: number = 1
  ): Promise<KYCListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: KYCVerification[] = Array.from({ length: 8 }, (_, i) => ({
      id: `KYC${String(i + 1).padStart(3, "0")}`,
      runnerName: "Adewale Johnson",
      idType: "NIN",
      email: "john.okafor@email.com",
      phone: "+234 801 234 5678",
      dateSubmitted: "2025-10-25T00:00:00Z",
      status: status,
      ...(status === "resubmission" && {
        rejectionReason: "Blurry ID photo",
      }),
    }));

    return {
      data: mockData,
      pagination: {
        currentPage: page,
        totalPages: 13,
        totalItems: 100,
        itemsPerPage: 8,
      },
    };
  },

  getKYCById: async (id: string, status?: "pending" | "resubmission"): Promise<KYCVerification> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      id,
      runnerName: "Adewale Johnson",
      idType: "NIN",
      email: "john.okafor@email.com",
      phone: "+234 801 234 5678",
      dateSubmitted: "2025-10-25T00:00:00Z",
      status: status || "pending",
      documents: {
        idDocument: "/documents/id.pdf",
        proofOfAddress: "/documents/address.pdf",
        selfie: "/documents/selfie.jpg",
      },
      ...(status === "resubmission" && {
        rejectionReason: "Blurry ID photo",
      }),
    };
  },

  getKYCStats: async (): Promise<KYCStats> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      pendingVerifications: 5,
      resubmissionRequests: 2,
    };
  },

  approveKYC: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Approving KYC:", id);
  },

  rejectKYC: async (id: string, reason: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Rejecting KYC:", id, "Reason:", reason);
  },
};
