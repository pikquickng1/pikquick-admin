import { UserType } from "@/lib/types/enums";
import { walletsService } from "@/lib/services";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import type { AdminWallet, AdminWalletDetail } from "@/lib/types";
import type {
  Wallet,
  WalletDetails,
  WalletListFilters,
  WalletListResponse,
  WalletStats,
} from "../types/wallet.types";

const ITEMS_PER_PAGE = DEFAULT_PAGE_SIZE;

function toWallet(row: AdminWallet, fallbackType: UserType): Wallet {
  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name ?? row.user_id,
    userType: (row.user_role as UserType) ?? fallbackType,
    currentBalance: Number(row.balance ?? 0),
    lastTransaction: row.updated_at,
    // Per-row transaction count is not returned by the list endpoint.
    totalTransactions: 0,
  };
}

export const walletApi = {
  getWalletsList: async (
    userType: UserType,
    filters: WalletListFilters,
    page: number = 1
  ): Promise<WalletListResponse> => {
    const res = await walletsService.list({
      page,
      limit: ITEMS_PER_PAGE,
      role: userType,
      search: filters.search || undefined,
    });
    const totalItems = res.total ?? 0;
    return {
      data: (res.data ?? []).map((w) => toWallet(w, userType)),
      pagination: {
        currentPage: res.page ?? page,
        totalPages: Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE)),
        totalItems,
        itemsPerPage: res.limit ?? ITEMS_PER_PAGE,
      },
    };
  },

  getWalletById: async (id: string): Promise<WalletDetails> => {
    const [row, tx] = await Promise.all([
      walletsService.getById(id) as Promise<AdminWalletDetail>,
      walletsService.transactions(id, { page: 1, limit: 1 }),
    ]);
    return {
      id: row.id,
      userId: row.user_id,
      userName: row.user_name ?? row.user_id,
      userType: (row.user_role as UserType) ?? UserType.CLIENT,
      currentBalance: Number(row.balance ?? 0),
      lastTransaction: row.updated_at,
      totalTransactions: tx.meta?.total ?? 0,
      email: row.user_email ?? "—",
      phone: row.user_phone ?? "—",
      accountCreated: row.user_created_at ?? row.created_at,
    };
  },

  getWalletStats: async (): Promise<WalletStats> => {
    const stats = await walletsService.stats();
    return {
      totalRequesterBalance: Number(stats.client_balance ?? 0),
      totalRunnerBalance: Number(stats.runner_balance ?? 0),
      totalWallets: Number(stats.total_wallets ?? 0),
    };
  },
};
