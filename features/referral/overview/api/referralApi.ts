import { ReferralTierKey, UserType } from "@/lib/types/enums";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import { referralService } from "@/lib/services";
import type { ReferralData, TopReferrer } from "../types/referral.types";

const MOCK_OVERVIEW: ReferralData = {
  stats: {
    totalReferrals: 1284,
    activeReferrals: 856,
    rewardsUnlocked: 422,
    eliteCandidates: 18,
    totalPayouts: 2400000,
  },
  dailyReferrals: [
    { day: "Mon", count: 45 },
    { day: "Tue", count: 55 },
    { day: "Wed", count: 38 },
    { day: "Thu", count: 68 },
    { day: "Fri", count: 52 },
    { day: "Sat", count: 78 },
    { day: "Sun", count: 32 },
  ],
  rewardStatus: { paid: 850000, pending: 150000, total: 1000000 },
  topReferrers: [
    { id: "1", name: "Adebayo Samuel", role: UserType.RUNNER, totalReferrals: 42, rewardsEarned: 105000, status: ReferralTierKey.ELITE },
    { id: "2", name: "Chioma Okoro", role: UserType.CLIENT, totalReferrals: 28, rewardsEarned: 70000, status: ReferralTierKey.PRO },
    { id: "3", name: "Ibrahim Musa", role: UserType.RUNNER, totalReferrals: 15, rewardsEarned: 37500, status: ReferralTierKey.STARTER },
    { id: "4", name: "Osawele John", role: UserType.RUNNER, totalReferrals: 12, rewardsEarned: 30000, status: ReferralTierKey.STARTER },
  ] satisfies TopReferrer[],
};

const MOCK_FETCH_DELAY_MS = 300;

export const referralApi = {
  async getReferralData(): Promise<ReferralData> {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_FETCH_DELAY_MS));
      return MOCK_OVERVIEW;
    }
    const res = await referralService.getOverview();
    return (res as unknown as ReferralData);
  },
};
