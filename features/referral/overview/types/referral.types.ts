export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  rewardsUnlocked: number;
  eliteCandidates: number;
  totalPayouts: number;
}

export interface DailyReferral {
  day: string;
  count: number;
}

export interface RewardStatus {
  status: "Paid" | "Pending";
  amount: number;
}

export interface TopReferrer {
  id: string;
  name: string;
  role: "Runner" | "Requester";
  totalReferrals: number;
  rewardsEarned: number;
  status: "Elite" | "Pro" | "Starter";
}

export interface ReferralData {
  stats: ReferralStats;
  dailyReferrals: DailyReferral[];
  rewardStatus: {
    paid: number;
    pending: number;
    total: number;
  };
  topReferrers: TopReferrer[];
}
