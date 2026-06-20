import { ReferralTierKey, UserType } from "@/lib/types/enums";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import type { EliteRewardDetail } from "../types/elite-reward-detail.types";

const MOCK_DELAY_MS = 300;
const MOCK_ACTION_DELAY_MS = 500;
const MOCK_ACTIVE_REFERRALS = 152;
const MOCK_REFERRALS_CHANGE = "+18% vs last month";
const MOCK_LIFETIME_TOTAL = 412;
const MOCK_VERIFIED_REFERRALS = 152;
const MOCK_PENDING_COMPLETION = 14;
const MOCK_DISQUALIFIED_REFERRALS = 3;
const MOCK_CONVERSION_RATE = 92;
const MOCK_REWARD_AMOUNT = 25000;
const MOCK_TAX_DEDUCTIONS = 0;

const MOCK_HISTORICAL = [
  { month: "Sep", referrals: 45 },
  { month: "Oct", referrals: 52 },
  { month: "Nov", referrals: 48 },
  { month: "Dec", referrals: 58 },
  { month: "Jan", referrals: 62 },
  { month: "Feb", referrals: 68 },
];

const MOCK_DETAIL: EliteRewardDetail = {
  user: {
    id: "RUN-2045",
    name: "Adebayo Samuel",
    role: UserType.RUNNER,
    joinedDate: "August 15, 2023",
  },
  metrics: {
    activeReferrals: MOCK_ACTIVE_REFERRALS,
    activeReferralsChange: MOCK_REFERRALS_CHANGE,
    lifetimeTotal: MOCK_LIFETIME_TOTAL,
    monthTargetAchieved: "February",
    tier: ReferralTierKey.ELITE,
  },
  integrityCheck: {
    systemFraudScore: {
      level: "LOW",
      message:
        "Candidate has consistently passed all automated integrity checks over 6 months.",
    },
    deviceSharing: { status: "NONE DETECTED" },
    ipGeolocation: { status: "CONSISTENT" },
    taskGenuinity: { status: "100% VALID" },
  },
  referralBreakdown: {
    verifiedAndActive: MOCK_VERIFIED_REFERRALS,
    pendingCompletion: MOCK_PENDING_COMPLETION,
    disqualifiedReferrals: MOCK_DISQUALIFIED_REFERRALS,
    firstTaskConversionRate: MOCK_CONVERSION_RATE,
  },
  rewardDetails: {
    totalPayableAmount: MOCK_REWARD_AMOUNT,
    rewardType: "Elite Tier Performance",
    taxDeductions: MOCK_TAX_DEDUCTIONS,
  },
  decisionComments: "",
  historicalPerformance: MOCK_HISTORICAL,
};

export const eliteRewardDetailApi = {
  async getEliteRewardDetail(_id: string): Promise<EliteRewardDetail> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
      return MOCK_DETAIL;
    }
    throw new Error("Live elite-reward-detail endpoint not yet wired in the admin UI");
  },

  async approveReward(_id: string, _comments: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live approve-reward-detail endpoint not yet wired in the admin UI");
  },

  async rejectReward(_id: string, _comments: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live reject-reward-detail endpoint not yet wired in the admin UI");
  },
};
