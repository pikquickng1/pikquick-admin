import { ALL_FILTER, ReferralRewardStatus, UserType } from "@/lib/types/enums";

export interface EliteReward {
  id: string;
  user: string;
  role: UserType;
  referralsCount: number;
  monthAchieved: string;
  rewardAmount: number;
  status: ReferralRewardStatus;
}

export interface EliteRewardStats {
  awaitingReview: number;
  approvedMTD: number;
  totalElitePayouts: number;
}

export interface EliteRewardFilters {
  search: string;
  status?: ReferralRewardStatus | typeof ALL_FILTER;
}

export interface EliteRewardListResponse {
  data: EliteReward[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
