import { ReferralData } from "../types/referral.types";

export const referralApi = {
  getReferralData: async (): Promise<ReferralData> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
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
      rewardStatus: {
        paid: 850000,
        pending: 150000,
        total: 1000000,
      },
      topReferrers: [
        {
          id: "1",
          name: "Adebayo Samuel",
          role: "Runner",
          totalReferrals: 42,
          rewardsEarned: 105000,
          status: "Elite",
        },
        {
          id: "2",
          name: "Chioma Okoro",
          role: "Requester",
          totalReferrals: 28,
          rewardsEarned: 70000,
          status: "Pro",
        },
        {
          id: "3",
          name: "Ibrahim Musa",
          role: "Runner",
          totalReferrals: 15,
          rewardsEarned: 37500,
          status: "Starter",
        },
        {
          id: "4",
          name: "Osawele John",
          role: "Runner",
          totalReferrals: 12,
          rewardsEarned: 30000,
          status: "Starter",
        },
      ],
    };
  },
};
