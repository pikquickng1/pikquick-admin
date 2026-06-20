import { ReferralRewardStatus, UserType } from "@/lib/types/enums";

export interface EliteRewardUserProfile {
  id: string;
  name: string;
  role: UserType;
  joinedDate: string;
  avatar?: string;
}

export interface EliteRewardMetrics {
  activeReferrals: number;
  activeReferralsChange: string;
  lifetimeTotal: number;
  monthTargetAchieved: string;
  tier: string;
}

export type IntegrityLevel = "LOW" | "MEDIUM" | "HIGH";

export interface IntegrityCheck {
  systemFraudScore: {
    level: IntegrityLevel;
    message: string;
  };
  deviceSharing: {
    status: "NONE DETECTED" | "DETECTED";
  };
  ipGeolocation: {
    status: "CONSISTENT" | "INCONSISTENT";
  };
  taskGenuinity: {
    status: "100% VALID" | "INVALID";
  };
}

export interface ReferralBreakdown {
  verifiedAndActive: number;
  pendingCompletion: number;
  disqualifiedReferrals: number;
  firstTaskConversionRate: number;
}

export interface RewardDetails {
  totalPayableAmount: number;
  rewardType: string;
  taxDeductions: number;
}

export interface EliteRewardDetail {
  user: EliteRewardUserProfile;
  metrics: EliteRewardMetrics;
  integrityCheck: IntegrityCheck;
  referralBreakdown: ReferralBreakdown;
  rewardDetails: RewardDetails;
  decisionComments: string;
  historicalPerformance: {
    month: string;
    referrals: number;
  }[];
}
