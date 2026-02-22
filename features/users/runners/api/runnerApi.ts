import { Runner, RunnerTransaction, RunnerWallet, RunnerTaskHistory } from "../types/runner.types";
import { RunnerListFilters, RunnerListResponse } from "../types/runner-list.types";

// Mock data - replace with actual API calls
// In-memory store for demo purposes
let mockRunnerStatus: "Available" | "Unavailable" | "Suspended" = "Available";

export const runnerApi = {
  getRunnersList: async (
    filters: RunnerListFilters,
    page: number = 1
  ): Promise<RunnerListResponse> => {
    // TODO: Replace with actual API call
    
    // Mock data
    const mockData = Array.from({ length: 8 }, (_, i) => ({
      id: `RUN${String(i + 1).padStart(3, "0")}`,
      name: "Zainab Hassan",
      email: "zainab.h@email.com",
      phone: "+234 801 234 5678",
      verification: i === 4 ? ("Pending" as const) : i === 5 ? ("Failed" as const) : ("Verified" as const),
      balance: 67800,
      dailyFee: 5000,
      rating: 5,
      totalReviews: 42,
      status: i === 5 ? ("Suspended" as const) : i === 4 ? ("Unavailable" as const) : ("Available" as const),
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

  getRunnerById: async (id: string): Promise<Runner> => {
    // TODO: Replace with actual API call
    return {
      id: "RUN004",
      name: "Zainab Hassan",
      email: "zainab.h@email.com",
      phone: "+234 801 234 5678",
      address: "15 Lekki-Epe Expressway, Lagos",
      joinedDate: "2025-01-10",
      verification: "Verified",
      status: mockRunnerStatus,
      balance: 67800,
      dailyFee: 5000,
      rating: 5,
      totalReviews: 42,
      tasksCompleted: 156,
    };
  },

  getRunnerWallet: async (id: string): Promise<RunnerWallet> => {
    // TODO: Replace with actual API call
    return {
      balance: 67800,
      totalEarnings: 250000,
      totalWithdrawals: 182200,
      pendingAmount: 8000,
    };
  },

  getRunnerTransactions: async (id: string): Promise<RunnerTransaction[]> => {
    // TODO: Replace with actual API call
    return [
      {
        id: "TXN001",
        date: "2025-10-28",
        amount: 5000,
        type: "credit",
        description: "Task Completion",
        status: "completed",
      },
      {
        id: "TXN002",
        date: "2025-10-27",
        amount: 20000,
        type: "debit",
        description: "Withdrawal",
        status: "completed",
      },
    ];
  },

  getRunnerTaskHistory: async (id: string): Promise<RunnerTaskHistory[]> => {
    // TODO: Replace with actual API call
    return [
      {
        id: "TSK001",
        title: "Grocery Shopping",
        status: "completed",
        amount: 5000,
        date: "2025-10-28",
        requesterName: "Adewale Johnson",
      },
      {
        id: "TSK002",
        title: "Package Delivery",
        status: "completed",
        amount: 3500,
        date: "2025-10-27",
        requesterName: "Chioma Okafor",
      },
    ];
  },

  suspendRunner: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    mockRunnerStatus = "Suspended";
    console.log("Suspending runner:", id);
  },

  activateRunner: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    mockRunnerStatus = "Available";
    console.log("Activating runner:", id);
  },

  adjustWallet: async (id: string, type: "debit" | "credit", amount: number): Promise<void> => {
    // TODO: Replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Adjusting wallet for ${id}: ${type} ₦${amount}`);
  },

  resetPassword: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    console.log("Resetting password for:", id);
  },

  sendMessage: async (id: string, subject: string, message: string): Promise<void> => {
    // TODO: Replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Sending message to:", id, "Subject:", subject, "Message:", message);
  },
};
