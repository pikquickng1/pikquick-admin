"use client";

import { useState, useEffect } from "react";
import { Wallet, WalletListFilters } from "../types/wallet.types";
import { walletApi } from "../api/walletApi";

export function useWalletList(
  userType: "requester" | "runner",
  filters: WalletListFilters,
  page: number
) {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8,
  });

  const fetchWallets = async () => {
    try {
      setLoading(true);
      const response = await walletApi.getWalletsList(userType, filters, page);
      setWallets(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [userType, filters, page]);

  return { wallets, loading, pagination, refetch: fetchWallets };
}
