/**
 * Admin withdrawals API types
 */

import type { WithdrawalStatus } from "./enums";

export interface AdminWithdrawal {
  id: string;
  user_id: string;
  amount: number;
  reference: string;
  status: WithdrawalStatus;
  transfer_code?: string;
  failure_reason?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface AdminWithdrawalsListParams {
  page?: number;
  limit?: number;
  status?: string;
  user_id?: string;
}
