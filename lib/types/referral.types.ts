/**
 * Referral admin API types
 */

import type { PaginationParams } from "./common.types";

export interface ReferralSettings {
  program_enabled: boolean;
  active_referral_definition: string;
  verification_period_hours: number;
  require_manual_review_elite: boolean;
  first_n_amount_ngn: number | null;
}

export interface ReferralTier {
  key: string;
  name: string;
  threshold: number;
  reward_amount_ngn: number;
  sort_order: number;
  requires_manual_review: boolean;
}

export interface ReferralSettingsResponse {
  settings: ReferralSettings;
  tiers: ReferralTier[];
}

export interface UpdateReferralSettingsDto {
  settings?: Partial<ReferralSettings>;
  tiers?: Partial<ReferralTier>[];
}

export interface ReferralOverviewParams {
  month?: string;
}

export interface ReferralOverviewResponse {
  month: string;
  totalReferrals: number;
  activeReferrals: number;
  rewardsUnlocked: number;
  eliteCandidates: number;
  totalPaidAmount: number;
  totalPendingAmount: number;
}

export interface ReferralRecord {
  id: string;
  referrer_id: string;
  referred_user_id: string;
  status: string;
  month: string;
}

export interface ReferralRecordsParams extends PaginationParams {
  month?: string;
  status?: string;
}

export interface ReferralRecordsResponse {
  data: ReferralRecord[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface ReferralRecordDetail {
  id: string;
  referrer_id: string;
  referred_user_id: string;
  status: string;
  month: string;
  first_task_id: string | null;
  qualified_at: string | null;
}

export interface ReferralRecordDetailResponse {
  referral: ReferralRecordDetail;
}

export interface EliteReward {
  id: string;
  referrer_id: string;
  tier_key: string;
  amount_ngn: number;
  status: string;
  month: string;
}

export interface EliteReviewListParams extends PaginationParams {}

export interface EliteReviewListResponse {
  data: EliteReward[];
  meta: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}

export interface EliteReviewApproveDto {
  notes?: string;
}

export interface EliteReviewRejectDto {
  reason: string;
  notes?: string;
}

export interface EliteRewardResponse {
  reward: EliteReward;
}

export interface WalletInfo {
  id: string;
  userId: string;
  balance: number;
}

export interface TransactionInfo {
  id: string;
  user_id: string;
  wallet_id: string;
  amount: number;
  type: string;
  status: string;
}

export interface PayoutRewardResponse {
  message: string;
  wallet: WalletInfo;
  transaction: TransactionInfo;
}
