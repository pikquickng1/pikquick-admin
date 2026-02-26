import {
  Transaction,
  TransactionListFilters,
  TransactionListResponse,
  TransactionStats,
  TransactionDetails,
} from "../types/transaction.types";

export const transactionApi = {
  getTransactionsList: async (
    filters: TransactionListFilters,
    page: number = 1
  ): Promise<TransactionListResponse> => {

    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock data
    const mockData: Transaction[] = Array.from({ length: 8 }, (_, i) => ({
      id: `TXN${String(i + 1).padStart(3, "0")}`,
      userId: `USR${String(i + 1).padStart(3, "0")}`,
      userName: "Adewale Johnson",
      userType: i % 2 === 0 ? ("Requester" as const) : ("Runner" as const),
      type:
        i === 0 || i === 2 || i === 4
          ? ("Task Payment" as const)
          : i === 1 || i === 3
            ? ("Daily Access" as const)
            : ("Wallet Top-up" as const),
      amount: 2500,
      date: "2025-10-30T14:30:00Z",
      status:
        i === 1
          ? ("Pending" as const)
          : i === 3
            ? ("Failed" as const)
            : ("Completed" as const),
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

  getTransactionById: async (id: string): Promise<TransactionDetails> => {

    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock detailed transaction data
    return {
      id: id,
      userId: "USR001",
      userName: "Adewale Johnson",
      userType: "Requester",
      type: "Task Payment",
      amount: 2500,
      date: "2025-10-30T14:30:00Z",
      status: "Failed",
      paymentGateway: "Paystack",
      gatewayResponse: {
        reference: "PSK-2025-001",
        gatewayStatus: "Failed",
        processingFee: "-",
        errorMessage: "Insufficient funds",
      },
    };
  },

  getTransactionStats: async (): Promise<TransactionStats> => {

    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      totalPlatformEarnings: 125800,
      dailyAccessPayments: 45000,
      taskPayments: 68500,
      refunds: 12300,
    };
  },

  downloadReceipt: async (transactionId: string): Promise<Blob> => {
    
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log("Downloading receipt for transaction:", transactionId);

    return new Blob(["Mock receipt content"], { type: "application/pdf" });
  },

  exportTransactions: async (
    filters: TransactionListFilters,
    format: "csv" | "excel" = "csv"
  ): Promise<Blob> => {
    
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("Exporting transactions with filters:", filters, "Format:", format);

    const mimeType = format === "csv" ? "text/csv" : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    return new Blob(["Mock export content"], { type: mimeType });
  },
};
