"use client";

import { useQuery } from "@tanstack/react-query";
import { walletsService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { UserType } from "@/lib/types/enums";
import { mapAdminWalletToWallet } from "../lib/mapAdminWalletToWallet";
import type { WalletListFilters } from "../types/wallet.types";

const LIMIT = DEFAULT_PAGE_SIZE;

export function useWalletList(
  userType: UserType,
  _filters: WalletListFilters,
  page: number
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.wallets.list({ page, limit: LIMIT }),
    queryFn: async () => walletsService.list({ page, limit: LIMIT }),
  });

  const wallets = (data?.data ?? []).map((w) => mapAdminWalletToWallet(w, userType));
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const pagination = {
    currentPage: data?.page ?? page,
    totalPages,
    totalItems: total,
    itemsPerPage: data?.limit ?? LIMIT,
  };

  return {
    wallets,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    pagination,
    refetch: () => {
      void refetch();
    },
  };
}
