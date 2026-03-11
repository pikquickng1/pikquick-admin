export interface TierThreshold {
  id: string;
  name: string;
  color: string;
  threshold: number;
  rewardAmount: number;
}

export interface ActiveReferralDefinition {
  id: string;
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
  activeReferralDefinitions: ActiveReferralDefinition[];
  antiFraudVerification: boolean;
  rewardsBudget: {
    total: number;
    available: number;
    percentage: number;
  };
  recentChanges: RecentChange[];
}
