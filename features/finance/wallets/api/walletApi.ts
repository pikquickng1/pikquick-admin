import {
  Wallet,
  WalletListFilters,
  WalletListResponse,
  WalletStats,
  WalletDetails,
} from "../types/wallet.types";

export const walletApi = {
  getWalletsList: async (
    userType: "requester" | "runner",
    filters: WalletListFilters,
    page: number = 1
  ): Promise<WalletListResponse> => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: Wallet[] = Array.from({ length: 8 }, (_, i) => ({
      id: `${userType === "requester" ? "REQ" : "RUN"}${String(i + 1).padStart(3, "0")}`,
      userId: `${userType === "requester" ? "REQ" : "RUN"}001`,
      userName: "Adewale Johnson",
      userType,
      currentBalance: 15000,
      lastTransaction: "2025-10-30T14:30:00.000Z",
      totalTransactions: 24,
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

  getWalletById: async (id: string): Promise<WalletDetails> => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      id,
      userId: "REQ001",
      userName: "Adewale Johnson",
      userType: "requester",
      currentBalance: 15000,
      lastTransaction: "2025-10-30T14:30:00.000Z",
      totalTransactions: 24,
      email: "adewale@example.com",
      phone: "+234 123 456 7890",
      accountCreated: "2025-01-15T00:00:00Z",
    };
  },

  getWalletStats: async (): Promise<WalletStats> => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      totalRequesterBalance: 67200,
      totalRunnerBalance: 136500,
      totalWallets: 10,
    };
  },
};
