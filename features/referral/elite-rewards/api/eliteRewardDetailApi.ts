import { EliteRewardDetail } from "../types/elite-reward-detail.types";

export const eliteRewardDetailApi = {
  getEliteRewardDetail: async (id: string): Promise<EliteRewardDetail> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      user: {
        id: "RUN-2045",
        name: "Adebayo Samuel",
        role: "Runner",
        joinedDate: "August 15, 2023",
      },
      metrics: {
        activeReferrals: 152,
        activeReferralsChange: "+18% vs last month",
        lifetimeTotal: 412,
        monthTargetAchieved: "February",
        tier: "ELITE",
      },
      integrityCheck: {
        systemFraudScore: {
          level: "LOW",
          message: "Candidate has consistently passed all automated integrity checks over 6 months.",
        },
        deviceSharing: {
          status: "NONE DETECTED",
        },
        ipGeolocation: {
          status: "CONSISTENT",
        },
        taskGenuinity: {
          status: "100% VALID",
        },
      },
      referralBreakdown: {
        verifiedAndActive: 152,
        pendingCompletion: 14,
        disqualifiedReferrals: 3,
        firstTaskConversionRate: 92,
      },
      rewardDetails: {
        totalPayableAmount: 25000,
        rewardType: "Elite Tier Performance",
        taxDeductions: 0,
      },
      decisionComments: "",
      historicalPerformance: [
        { month: "Sep", referrals: 45 },
        { month: "Oct", referrals: 52 },
        { month: "Nov", referrals: 48 },
        { month: "Dec", referrals: 58 },
        { month: "Jan", referrals: 62 },
        { month: "Feb", referrals: 68 },
      ],
    };
  },

  approveReward: async (id: string, comments: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Approving elite reward:", id, comments);
  },

  rejectReward: async (id: string, comments: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Rejecting elite reward:", id, comments);
  },
};
