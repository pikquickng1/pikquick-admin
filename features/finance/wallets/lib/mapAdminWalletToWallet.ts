import type { AdminWallet } from "@/lib/types";
import { UserType } from "@/lib/types/enums";
import type { Wallet } from "../types/wallet.types";

const PLACEHOLDER = "—";

export function mapAdminWalletToWallet(w: AdminWallet, userType: UserType): Wallet {
  return {
    id: w.id,
    userId: w.user_id,
    userName: PLACEHOLDER,
    userType,
    currentBalance: w.balance,
    lastTransaction: w.updated_at ?? PLACEHOLDER,
    totalTransactions: 0,
  };
}
