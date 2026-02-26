"use client";

import { useQuery } from "@tanstack/react-query";
import { walletsService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { WalletListFilters } from "../types/wallet.types";
import { mapAdminWalletToWallet } from "../lib/mapAdminWalletToWallet";

const LIMIT = 20;

export function useWalletList(
  _userType: "requester" | "runner",
  filters: WalletListFilters,
  page: number
) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.wallets.list({ page, limit: LIMIT }),
    queryFn: async () => {
      const res = await walletsService.list({ page, limit: LIMIT });
      return res;
    },
  });

  const wallets = (data?.data ?? []).map((w) =>
    mapAdminWalletToWallet(w, _userType)
  );
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
    pagination,
    refetch: () => refetch(),
  };
}
