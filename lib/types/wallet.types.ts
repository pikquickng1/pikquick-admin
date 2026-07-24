/**
 * Admin wallets API types (GET /admin/wallets)
 */

import type { WalletStatus } from "./enums";

export interface AdminWallet {
  id: string;
  user_id: string;
  balance: number;
  status: WalletStatus;
  currency_code: string;
  created_at: string;
  updated_at: string;
  // Present on the admin list/detail (joined with the owner profile).
  user_name?: string | null;
  user_email?: string | null;
  user_role?: string | null;
}

export interface AdminWalletsSummary {
  total_wallets: number;
  total_balance: number;
  total_balance_ngn: number;
}

export interface AdminWalletsResponse {
  summary: AdminWalletsSummary;
  data: AdminWallet[];
  total: number;
  page: number;
  limit: number;
}

/** GET /admin/wallets/:id — wallet row joined with owner profile. */
export interface AdminWalletDetail extends AdminWallet {
  pending_balance?: number;
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  user_role: string | null;
  user_created_at: string | null;
}

/** GET /admin/wallets/stats — balances split by owner role. */
export interface AdminWalletStats {
  total_wallets: number;
  total_balance: number;
  client_balance: number;
  runner_balance: number;
}

/** A single transaction row as stored by the backend. */
export interface AdminWalletTransaction {
  id: string;
  user_id: string;
  wallet_id: string;
  amount: number;
  net_amount?: number;
  type: string;
  status: string;
  created_at: string;
  metadata?: Record<string, unknown> | null;
}

/** GET /admin/wallets/:id/transactions — paginated (base.repository paginate). */
export interface AdminWalletTransactionsResponse {
  data: AdminWalletTransaction[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}
