import {
  PayoutRequest,
  PayoutListFilters,
  PayoutListResponse,
  PayoutStats,
  PayoutRequestDetails,
} from "../types/payout.types";

export const payoutApi = {
  getPayoutsList: async (
    filters: PayoutListFilters,
    page: number = 1
  ): Promise<PayoutListResponse> => {
    
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: PayoutRequest[] = Array.from({ length: 6 }, (_, i) => ({
      id: `TXN${String(i + 1).padStart(3, "0")}`,
      runnerId: `RUN${String(i + 1).padStart(3, "0")}`,
      runnerName: "Adewale Johnson",
      runnerRating: 4.8,
      runnerTasks: 12,
      amount: 25000,
      bankName: "GTBank",
      accountNumber: "0123456789",
      date: "2025-10-30T14:30:00Z",
      status:
        i === 3
          ? ("Rejected" as const)
          : i === 4 || i === 5
          ? ("Completed" as const)
          : ("Pending" as const),
    }));

    return {
      data: mockData,
      pagination: {
        currentPage: page,
        totalPages: 10,
        totalItems: 60,
        itemsPerPage: 6,
      },
    };
  },

  getPayoutById: async (id: string): Promise<PayoutRequestDetails> => {
   
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      id: id,
      runnerId: "RUN001",
      runnerName: "Adewale Johnson",
      runnerRating: 4.8,
      runnerTasks: 12,
      amount: 25000,
      bankName: "GTBank",
      accountNumber: "0123456789",
      accountName: "Adewale Johnson",
      date: "2025-10-30T14:30:00Z",
      requestedDate: "2025-10-30T14:30:00Z",
      status: "Pending",
    };
  },

  getPayoutStats: async (): Promise<PayoutStats> => {
    
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      pendingRequests: 3,
      approvedThisWeek: 2,
      totalPendingAmount: 79000,
    };
  },

  approvePayout: async (id: string): Promise<void> => {
    

    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Approving payout:", id);
  },

  rejectPayout: async (id: string, reason: string): Promise<void> => {
    
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Rejecting payout:", id, "Reason:", reason);
  },

  exportPayouts: async (
    filters: PayoutListFilters,
    format: "csv" | "excel" = "csv"
  ): Promise<Blob> => {
   
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Exporting payout requests with filters:", filters, "Format:", format);

    const mimeType =
      format === "csv"
        ? "text/csv"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    return new Blob(["Mock export content"], { type: mimeType });
  },
};
