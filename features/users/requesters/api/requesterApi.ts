import { Requester, RequesterTransaction, RequesterWallet, RequesterTaskHistory } from "../types/requester.types";
import { RequesterListFilters, RequesterListResponse } from "../types/requester-list.types";
import { RequesterPayment } from "../types/payment.types";

// Mock data - replace with actual API calls
// In-memory store for demo purposes
let mockRequesterStatus: "Active" | "Suspended" | "Inactive" = "Active";

export const requesterApi = {
  getRequestersList: async (
    filters: RequesterListFilters,
    page: number = 1
  ): Promise<RequesterListResponse> => {
    // TODO: Replace with actual API call
    // const params = new URLSearchParams({
    //   search: filters.search,
    //   status: filters.status,
    //   sortBy: filters.sortBy,
    //   page: page.toString(),
    // });
    // const response = await fetch(`/api/requesters?${params}`);
    // return response.json();

    // Mock data
    const mockData = Array.from({ length: 8 }, (_, i) => ({
      id: `REQ${String(i + 1).padStart(3, "0")}`,
      name: "Adewale Johnson",
      email: "adewale.j@email.com",
      phone: "+234 801 234 5678",
      balance: 45000,
      tasksPosted: 24,
      status: i === 2 ? ("Suspended" as const) : ("Active" as const),
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
  getRequesterById: async (id: string): Promise<Requester> => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/requesters/${id}`);
    // return response.json();

    return {
      id: "REQ001",
      name: "Adewale Johnson",
      email: "adewale.j@email.com",
      phone: "+234 801 234 5678",
      address: "23 Admiralty Way, Lekki Phase 1, Lagos",
      joinedDate: "2025-01-15",
      status: mockRequesterStatus,
      balance: 45000,
      tasksPosted: 24,
    };
  },

  getRequesterWallet: async (id: string): Promise<RequesterWallet> => {
    // TODO: Replace with actual API call
    return {
      balance: 45000,
      totalDeposits: 150000,
      totalWithdrawals: 105000,
      pendingAmount: 5000,
    };
  },

  getRequesterTransactions: async (id: string): Promise<RequesterTransaction[]> => {
    // TODO: Replace with actual API call
    return [
      {
        id: "TXN001",
        date: "2025-10-28",
        amount: 15000,
        type: "debit",
        description: "Task Payment",
        status: "completed",
      },
      {
        id: "TXN002",
        date: "2025-10-28",
        amount: 25000,
        type: "credit",
        description: "Wallet Funding",
        status: "completed",
      },
    ];
  },

  getRequesterTaskHistory: async (id: string): Promise<RequesterTaskHistory[]> => {
    // TODO: Replace with actual API call
    return [
      {
        id: "TSK001",
        title: "Grocery Shopping",
        status: "completed",
        amount: 2500,
        date: "2025-10-28",
      },
      {
        id: "TSK002",
        title: "Grocery Shopping",
        status: "completed",
        amount: 2500,
        date: "2025-10-28",
      },
      {
        id: "TSK003",
        title: "Grocery Shopping",
        status: "completed",
        amount: 2500,
        date: "2025-10-28",
      },
      {
        id: "TSK004",
        title: "Grocery Shopping",
        status: "completed",
        amount: 2500,
        date: "2025-10-28",
      },
    ];
  },

  getRequesterPayments: async (id: string): Promise<RequesterPayment[]> => {
    // TODO: Replace with actual API call
    return [
      {
        id: "PAY001",
        date: "2025-10-28",
        amount: 2500,
        type: "Task Payment",
        status: "completed",
      },
      {
        id: "PAY002",
        date: "2025-10-28",
        amount: 2500,
        type: "Task Payment",
        status: "completed",
      },
      {
        id: "PAY003",
        date: "2025-10-28",
        amount: 2500,
        type: "Task Payment",
        status: "completed",
      },
      {
        id: "PAY004",
        date: "2025-10-28",
        amount: 2500,
        type: "Task Payment",
        status: "completed",
      },
    ];
  },

  suspendRequester: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    // await fetch(`/api/requesters/${id}/suspend`, { method: 'POST' });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    mockRequesterStatus = "Suspended";
    console.log("Suspending requester:", id);
  },

  activateRequester: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    // await fetch(`/api/requesters/${id}/activate`, { method: 'POST' });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    mockRequesterStatus = "Active";
    console.log("Activating requester:", id);
  },

  adjustWallet: async (id: string, type: "debit" | "credit", amount: number): Promise<void> => {
    // TODO: Replace with actual API call
    // await fetch(`/api/requesters/${id}/wallet/adjust`, {
    //   method: 'POST',
    //   body: JSON.stringify({ type, amount })
    // });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Adjusting wallet for ${id}: ${type} ₦${amount}`);
  },

  resetPassword: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    console.log("Resetting password for:", id);
  },

  sendMessage: async (id: string, subject: string, message: string): Promise<void> => {
    // TODO: Replace with actual API call
    // await fetch(`/api/requesters/${id}/message`, {
    //   method: 'POST',
    //   body: JSON.stringify({ subject, message })
    // });
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Sending message to:", id, "Subject:", subject, "Message:", message);
  },
};
