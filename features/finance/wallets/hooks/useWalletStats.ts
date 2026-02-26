"use client";

import { useQuery } from "@tanstack/react-query";
import { walletsService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import type { WalletStats } from "../types/wallet.types";

export function useWalletStats() {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.wallets.list({ page: 1, limit: 1 }),
    queryFn: () => walletsService.list({ page: 1, limit: 1 }),
  });

  const summary = data?.summary;
  const stats: WalletStats = {
    totalRequesterBalance: summary?.total_balance_ngn ?? summary?.total_balance ?? 0,
    totalRunnerBalance: summary?.total_balance_ngn ?? summary?.total_balance ?? 0,
    totalWallets: summary?.total_wallets ?? 0,
  };

  return { stats, loading: isLoading, error: null, refetch: () => {} };
}
