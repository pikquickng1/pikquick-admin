import { walletsService } from "@/lib/services";
import { WalletTxType } from "@/lib/types/enums";
import type { AdminWalletTransaction } from "@/lib/types";
import type {
  WalletTransaction,
  WalletTransactionHistory,
} from "../types/transaction.types";

/** Transaction types that represent money leaving the wallet (debit). */
const DEBIT_TYPES = new Set([
  "escrow_hold",
  "escrow_transfer",
  "escrow_release",
  "manual_escrow_release",
  "withdrawal",
  "daily_auto_deduction",
  "daily_fee_deducted",
  "availability_block_renewal",
  "availability_activated",
  "task_cancellation",
]);

function humanize(type: string): string {
  return type.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function toTransaction(row: AdminWalletTransaction): WalletTransaction {
  const type = (row.type ?? "").toLowerCase();
  const meta = (row.metadata ?? {}) as { description?: string };
  return {
    id: row.id,
    type: DEBIT_TYPES.has(type) ? WalletTxType.DEBIT : WalletTxType.CREDIT,
    description: meta.description ?? humanize(row.type ?? "Transaction"),
    amount: Number(row.amount ?? 0),
    // The backend does not store a per-row running balance.
    balance: 0,
    date: row.created_at,
    category: humanize(row.type ?? ""),
  };
}

export const transactionApi = {
  getTransactionHistory: async (
    walletId: string
  ): Promise<WalletTransactionHistory> => {
    const [detail, tx] = await Promise.all([
      walletsService.getById(walletId),
      walletsService.transactions(walletId, { page: 1, limit: 50 }),
    ]);
    return {
      userId: detail.user_id,
      userName: detail.user_name ?? detail.user_id,
      currentBalance: Number(detail.balance ?? 0),
      totalTransactions: tx.meta?.total ?? tx.data.length,
      transactions: (tx.data ?? []).map(toTransaction),
    };
  },
};
