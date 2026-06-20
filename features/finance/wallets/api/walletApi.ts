import { USE_MOCKS } from "@/lib/config/feature-flags";
import { UserType } from "@/lib/types/enums";
import { walletsService } from "@/lib/services";
import type {
  Wallet,
  WalletDetails,
  WalletListFilters,
  WalletListResponse,
  WalletStats,
} from "../types/wallet.types";

const MOCK_BALANCE = 15000;
const MOCK_TOTAL_TX = 24;
const MOCK_LAST_TX = "2025-10-30T14:30:00.000Z";
const MOCK_LIST_LENGTH = 8;
const MOCK_LIST_TOTAL_ITEMS = 100;
const MOCK_LIST_TOTAL_PAGES = 13;
const MOCK_LIST_ITEMS_PER_PAGE = 8;
const MOCK_NAME = "Adewale Johnson";
const MOCK_EMAIL = "adewale@example.com";
const MOCK_PHONE = "+234 123 456 7890";
const MOCK_ACCOUNT_CREATED = "2025-01-15T00:00:00Z";
const MOCK_DELAY_MS = 300;

const buildMockList = (userType: UserType): Wallet[] =>
  Array.from({ length: MOCK_LIST_LENGTH }, (_, i) => ({
    id: `${userType === UserType.CLIENT ? "REQ" : "RUN"}${String(i + 1).padStart(3, "0")}`,
    userId: `${userType === UserType.CLIENT ? "REQ" : "RUN"}001`,
    userName: MOCK_NAME,
    userType,
    currentBalance: MOCK_BALANCE,
    lastTransaction: MOCK_LAST_TX,
    totalTransactions: MOCK_TOTAL_TX,
  }));

export const walletApi = {
  getWalletsList: async (
    userType: UserType,
    _filters: WalletListFilters,
    page: number = 1
  ): Promise<WalletListResponse> => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
      return {
        data: buildMockList(userType),
        pagination: {
          currentPage: page,
          totalPages: MOCK_LIST_TOTAL_PAGES,
          totalItems: MOCK_LIST_TOTAL_ITEMS,
          itemsPerPage: MOCK_LIST_ITEMS_PER_PAGE,
        },
      };
    }
    const res = await walletsService.list({ page, limit: MOCK_LIST_ITEMS_PER_PAGE });
    return res as unknown as WalletListResponse;
  },

  getWalletById: async (id: string): Promise<WalletDetails> => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
      return {
        id,
        userId: "REQ001",
        userName: MOCK_NAME,
        userType: UserType.CLIENT,
        currentBalance: MOCK_BALANCE,
        lastTransaction: MOCK_LAST_TX,
        totalTransactions: MOCK_TOTAL_TX,
        email: MOCK_EMAIL,
        phone: MOCK_PHONE,
        accountCreated: MOCK_ACCOUNT_CREATED,
      };
    }
    return (await walletsService.list({ limit: 1 })).data[0] as unknown as WalletDetails;
  },

  getWalletStats: async (): Promise<WalletStats> => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
      return {
        totalRequesterBalance: 67200,
        totalRunnerBalance: 136500,
        totalWallets: 10,
      };
    }
    return { totalRequesterBalance: 0, totalRunnerBalance: 0, totalWallets: 0 };
  },
};
