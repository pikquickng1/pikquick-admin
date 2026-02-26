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
