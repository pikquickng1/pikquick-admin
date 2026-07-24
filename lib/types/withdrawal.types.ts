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
  // Present on the admin list/detail (joined with the requester profile).
  user_name?: string | null;
  user_email?: string | null;
}

export interface AdminWithdrawalsListParams {
  page?: number;
  limit?: number;
  status?: string;
  user_id?: string;
}

/** GET /admin/withdrawals/:id — withdrawal joined with requester profile. */
export interface AdminWithdrawalDetail extends AdminWithdrawal {
  user_name: string | null;
  user_email: string | null;
  user_phone: string | null;
  recipient_code: string | null;
}
