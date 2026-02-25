/**
 * Escrow admin API types
 */

export interface EscrowStatisticsResponse {
  total_pending_amount: number;
  total_pending_transactions: number;
  ready_to_release_amount: number;
  ready_to_release_count: number;
  average_hold_time_hours: number;
  total_pending_amount_ngn: number;
  ready_to_release_amount_ngn: number;
}

export interface EscrowReleaseResponse {
  message: string;
  transaction_id: string;
  released_by: string;
  reason: string;
}

export interface EscrowProcessReleasesResponse {
  message: string;
  triggered_by: string;
  triggered_at: string;
}
