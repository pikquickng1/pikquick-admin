export type EliteRewardStatus = "Pending" | "Approved" | "Rejected";

export interface EliteReward {
  id: string;
  user: string;
  role: "Runner" | "Requester";
  referralsCount: number;
  monthAchieved: string;
  rewardAmount: number;
  status: EliteRewardStatus;
}

export interface EliteRewardStats {
  awaitingReview: number;
  approvedMTD: number;
  totalElitePayouts: number;
}

export interface EliteRewardFilters {
  search: string;
  status?: EliteRewardStatus;
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
