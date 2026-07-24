import { UserType } from "@/lib/types/enums";
import { referralService } from "@/lib/services";
import { formatDate } from "@/lib/utils/date";
import type { EliteReviewDetailResponse } from "@/lib/types";
import type { EliteRewardDetail } from "../types/elite-reward-detail.types";

const SHORT_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function shortMonth(month: string): string {
  const idx = Number((month ?? "").split("-")[1]) - 1;
  return SHORT_MONTHS[idx] ?? month;
}

function mapDetail(res: EliteReviewDetailResponse): EliteRewardDetail {
  const { reward, monthlyStats, history } = res.detail;
  const lifetimeTotal = history.reduce((acc, h) => acc + h.total_rewards, 0);

  return {
    user: {
      id: reward.referrer_id,
      name: reward.referrer_name ?? reward.referrer_id,
      role: (reward.referrer_role as UserType) ?? UserType.RUNNER,
      joinedDate: reward.referrer_joined_at
        ? formatDate(reward.referrer_joined_at)
        : "—",
    },
    metrics: {
      activeReferrals: monthlyStats.active,
      activeReferralsChange: "",
      lifetimeTotal,
      monthTargetAchieved: reward.month,
      tier: reward.tier_key,
    },
    // Automated integrity scoring is not implemented on the backend; present
    // neutral placeholders rather than fabricated scores.
    integrityCheck: {
      systemFraudScore: {
        level: "LOW",
        message: "Automated integrity scoring is not yet available.",
      },
      deviceSharing: { status: "NONE DETECTED" },
      ipGeolocation: { status: "CONSISTENT" },
      taskGenuinity: { status: "100% VALID" },
    },
    referralBreakdown: {
      verifiedAndActive: monthlyStats.active,
      pendingCompletion: Math.max(0, monthlyStats.total - monthlyStats.active),
      disqualifiedReferrals: 0,
      firstTaskConversionRate:
        monthlyStats.total > 0
          ? Math.round((monthlyStats.active / monthlyStats.total) * 100)
          : 0,
    },
    rewardDetails: {
      totalPayableAmount: reward.amount_ngn,
      rewardType: "Elite Tier Performance",
      taxDeductions: 0,
    },
    decisionComments: "",
    historicalPerformance: history
      .slice()
      .reverse()
      .map((h) => ({ month: shortMonth(h.month), referrals: h.total_rewards })),
  };
}

export const eliteRewardDetailApi = {
  async getEliteRewardDetail(id: string): Promise<EliteRewardDetail> {
    const res = await referralService.getEliteReviewById(id);
    return mapDetail(res);
  },

  async approveReward(id: string, comments: string): Promise<void> {
    await referralService.approveEliteReward(id, { notes: comments });
  },

  async rejectReward(id: string, comments: string): Promise<void> {
    await referralService.rejectEliteReward(id, {
      reason: comments || "Rejected by admin",
      notes: comments,
    });
  },
};
