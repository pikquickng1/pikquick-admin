import { referralService } from "@/lib/services";
import type { ReferralData } from "../types/referral.types";

export const referralApi = {
  async getReferralData(): Promise<ReferralData> {
    const res = await referralService.getOverview();
    const paid = res.totalPaidAmount ?? 0;
    const pending = res.totalPendingAmount ?? 0;

    return {
      stats: {
        totalReferrals: res.totalReferrals ?? 0,
        activeReferrals: res.activeReferrals ?? 0,
        rewardsUnlocked: res.rewardsUnlocked ?? 0,
        eliteCandidates: res.eliteCandidates ?? 0,
        totalPayouts: paid,
      },
      // Daily breakdown and top-referrer leaderboard are not exposed by the
      // overview endpoint yet.
      dailyReferrals: [],
      rewardStatus: { paid, pending, total: paid + pending },
      topReferrers: [],
    };
  },
};
