import { Requester, RequesterTransaction, RequesterWallet, RequesterTaskHistory } from "../types/requester.types";
import { RequesterListFilters, RequesterListResponse } from "../types/requester-list.types";
import { RequesterPayment } from "../types/payment.types";
import { requestersService } from "@/lib/services";

export const requesterApi = {
  getRequestersList: async (
    filters: RequesterListFilters,
    page: number = 1
  ): Promise<RequesterListResponse> => {
    try {
      const response = await requestersService.getRequesters({
        page,
        limit: filters.limit || 20,
        search: filters.search,
        status: filters.status,
      });
      return response;
    } catch (error) {
      console.error("Failed to fetch requesters list:", error);
      throw error;
    }
  },

  getRequesterById: async (id: string): Promise<Requester> => {
    try {
      const response = await requestersService.getRequesterById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch requester details:", error);
      throw error;
    }
  },

  getRequesterWallet: async (id: string): Promise<RequesterWallet> => {
    try {
      const response = await requestersService.getRequesterWallet(id);
      return response;
    } catch (error) {
      console.error("Failed to fetch requester wallet:", error);
      throw error;
    }
  },

  getRequesterTransactions: async (id: string): Promise<RequesterTransaction[]> => {
    try {
      const wallet = await requestersService.getRequesterWallet(id);
      return wallet.recentTransactions || [];
    } catch (error) {
      console.error("Failed to fetch requester transactions:", error);
      throw error;
    }
  },

  getRequesterTaskHistory: async (id: string): Promise<RequesterTaskHistory[]> => {
    try {
      const response = await requestersService.getRequesterTasks(id, { limit: 20 });
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch requester task history:", error);
      throw error;
    }
  },

  getRequesterPayments: async (id: string): Promise<RequesterPayment[]> => {
    try {
      const response = await requestersService.getRequesterPayments(id, { limit: 20 });
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch requester payments:", error);
      throw error;
    }
  },

  suspendRequester: async (id: string): Promise<void> => {
    try {
      await requestersService.suspendRequester(id);
    } catch (error) {
      console.error("Failed to suspend requester:", error);
      throw error;
    }
  },

  activateRequester: async (id: string): Promise<void> => {
    try {
      await requestersService.activateRequester(id);
    } catch (error) {
      console.error("Failed to activate requester:", error);
      throw error;
    }
  },

  adjustWallet: async (id: string, type: "debit" | "credit", amount: number): Promise<void> => {
    try {
      await requestersService.adjustWallet(id, { type, amount });
    } catch (error) {
      console.error("Failed to adjust wallet:", error);
      throw error;
    }
  },

  resetPassword: async (id: string): Promise<void> => {
    try {
      await requestersService.resetPassword(id);
    } catch (error) {
      console.error("Failed to reset password:", error);
      throw error;
    }
  },

  sendMessage: async (id: string, subject: string, message: string): Promise<void> => {
    try {
      await requestersService.sendMessage(id, { subject, message });
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },
};
