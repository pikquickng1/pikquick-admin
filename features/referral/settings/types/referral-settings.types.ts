import { ActiveReferralDefinition, ReferralTierKey } from "@/lib/types/enums";

export interface TierThreshold {
  id: ReferralTierKey;
  name: string;
  color: "green" | "blue" | "purple";
  threshold: number;
  rewardAmount: number;
}

export interface ActiveReferralConfig {
  id: ActiveReferralDefinition;
  label: string;
  selected: boolean;
}

export interface RecentChange {
  id: string;
  type: string;
  description: string;
  user: string;
  timestamp: string;
}

export interface ReferralSettings {
  programActive: boolean;
  tiers: TierThreshold[];
  activeReferralDefinitions: ActiveReferralConfig[];
  antiFraudVerification: boolean;
  rewardsBudget: {
    total: number;
    available: number;
    percentage: number;
  };
  recentChanges: RecentChange[];
}
