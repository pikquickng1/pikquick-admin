/**
 * Dashboard & stats API types (GET /admin/dashboard/stats)
 */

export interface DashboardStatsUsers {
  total: number;
  by_role: { client: number; runner: number; admin: number };
}

export interface DashboardStatsTasks {
  total: number;
  by_status: Record<string, number>;
}

export interface DashboardStatsEscrow {
  total_pending_amount: number;
  total_pending_transactions: number;
  ready_to_release_amount: number;
  ready_to_release_count: number;
  average_hold_time_hours: number;
}

export interface DashboardStatsWithdrawals {
  pending_count: number;
}

export interface DashboardStatsResponse {
  users: DashboardStatsUsers;
  tasks: DashboardStatsTasks;
  escrow: DashboardStatsEscrow;
  withdrawals: DashboardStatsWithdrawals;
  pending_document_verifications: number;
  feedback_total: number;
}
