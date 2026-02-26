import {
  FlaggedActivity,
  FlaggedActivityDetails,
  ComplianceListFilters,
  ComplianceListResponse,
  ComplianceStats,
} from "../types/compliance.types";

export const complianceApi = {
  getFlaggedActivities: async (
    filters: ComplianceListFilters,
    page: number = 1
  ): Promise<ComplianceListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: FlaggedActivity[] = Array.from({ length: 8 }, (_, i) => ({
      id: `R-${2101 + i}`,
      userId: `R-${2101 + i}`,
      userName: "Adewale Johnson",
      activitySummary: "5 top-ups, no tasks",
      flaggedDate: "2025-10-30T14:23:00Z",
      flagStatus: i % 3 === 0 ? "Flagged" : i % 3 === 1 ? "Under Review" : "Resolved",
      flagReason: "Suspicious activity",
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

  getFlaggedActivityById: async (id: string): Promise<FlaggedActivityDetails> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      id,
      userId: "R-2101",
      userName: "Adewale Johnson",
      activitySummary: "5 top-ups, no tasks",
      flaggedDate: "2025-10-30T14:23:00Z",
      flagStatus: "Flagged",
      flagReason: "Suspicious activity",
      totalAmount: 15000,
      transactionCount: 5,
    };
  },

  getComplianceStats: async (): Promise<ComplianceStats> => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      kycSummaryCount: 1245,
      flaggedTransactions: 24,
      suspendedAccounts: 8,
    };
  },

  updateFlagStatus: async (id: string, status: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating flag status:", id, status);
  },
};
