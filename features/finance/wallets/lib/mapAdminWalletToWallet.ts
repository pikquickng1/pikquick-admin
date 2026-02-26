import type { AdminWallet } from "@/lib/types";
import type { Wallet } from "../types/wallet.types";

export function mapAdminWalletToWallet(
  w: AdminWallet,
  userType: "requester" | "runner"
): Wallet {
  return {
    id: w.id,
    userId: w.user_id,
    userName: "—",
    userType,
    currentBalance: w.balance,
    lastTransaction: w.updated_at ?? "—",
    totalTransactions: 0,
  };
}
