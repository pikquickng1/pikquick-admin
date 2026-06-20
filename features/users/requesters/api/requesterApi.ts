import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { Requester, RequesterTransaction, RequesterWallet, RequesterTaskHistory } from "../types/requester.types";
import { RequesterListFilters, RequesterListResponse } from "../types/requester-list.types";
import { RequesterPayment } from "../types/payment.types";
import { requestersService } from "@/lib/services";

const LIMIT = DEFAULT_PAGE_SIZE;

export const requesterApi = {
  getRequestersList: async (
    filters: RequesterListFilters,
    page: number = 1
  ): Promise<RequesterListResponse> => {
    const response = await requestersService.getRequesters({
      page,
      limit: filters.limit ?? LIMIT,
      search: filters.search,
      status: filters.status,
    });
    return response;
  },

  getRequesterById: async (id: string): Promise<Requester> => {
    const response = await requestersService.getRequesterById(id);
    return response.data;
  },

  getRequesterWallet: async (id: string): Promise<RequesterWallet> => {
    const response = await requestersService.getRequesterWallet(id);
    return response;
  },

  getRequesterTransactions: async (id: string): Promise<RequesterTransaction[]> => {
    const wallet = await requestersService.getRequesterWallet(id);
    return wallet.recentTransactions ?? [];
  },

  getRequesterTaskHistory: async (id: string): Promise<RequesterTaskHistory[]> => {
    const response = await requestersService.getRequesterTasks(id, { limit: LIMIT });
    return response.data ?? [];
  },

  getRequesterPayments: async (id: string): Promise<RequesterPayment[]> => {
    const response = await requestersService.getRequesterPayments(id, { limit: LIMIT });
    return response.data ?? [];
  },

  suspendRequester: async (id: string): Promise<void> => {
    await requestersService.suspendRequester(id);
  },

  activateRequester: async (id: string): Promise<void> => {
    await requestersService.activateRequester(id);
  },

  adjustWallet: async (id: string, type: "debit" | "credit", amount: number): Promise<void> => {
    await requestersService.adjustWallet(id, { type, amount });
  },

  resetPassword: async (id: string): Promise<void> => {
    await requestersService.resetPassword(id);
  },

  sendMessage: async (id: string, subject: string, message: string): Promise<void> => {
    await requestersService.sendMessage(id, { subject, message });
  },
};
