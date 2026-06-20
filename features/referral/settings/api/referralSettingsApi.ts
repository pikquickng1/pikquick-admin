import { ActiveReferralDefinition, ReferralTierKey } from "@/lib/types/enums";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import { CURRENCY_SYMBOL } from "@/lib/config/feature-flags";
import type {
  ReferralSettings,
  TierThreshold,
} from "../types/referral-settings.types";

const MOCK_FETCH_DELAY_MS = 300;
const MOCK_ACTION_DELAY_MS = 500;
const MOCK_TOTAL_BUDGET = 2450000;
const MOCK_BUDGET_PERCENTAGE = 75;

const MOCK_TIERS: TierThreshold[] = [
  { id: ReferralTierKey.STARTER, name: "Starter Tier", color: "green", threshold: 10, rewardAmount: 2500 },
  { id: ReferralTierKey.PRO,     name: "Pro Tier",     color: "blue",  threshold: 50, rewardAmount: 7500 },
  { id: ReferralTierKey.ELITE,   name: "Elite Tier",   color: "purple", threshold: 150, rewardAmount: 25000 },
];

const MOCK_DEFS = [
  { id: ActiveReferralDefinition.SIGNUP_ONLY,            label: "Signup only",            selected: false },
  { id: ActiveReferralDefinition.KYC_VERIFIED,           label: "KYC verified",           selected: false },
  { id: ActiveReferralDefinition.FIRST_TASK_COMPLETED,   label: "First task completed",   selected: true  },
  { id: ActiveReferralDefinition.FIRST_N_AMOUNT_PROCESSED, label: `First ${CURRENCY_SYMBOL}10,000 processed`, selected: false },
];

const MOCK_SETTINGS: ReferralSettings = {
  programActive: true,
  tiers: MOCK_TIERS,
  activeReferralDefinitions: MOCK_DEFS,
  antiFraudVerification: true,
  rewardsBudget: {
    total: MOCK_TOTAL_BUDGET,
    available: MOCK_TOTAL_BUDGET,
    percentage: MOCK_BUDGET_PERCENTAGE,
  },
  recentChanges: [
    { id: "1", type: "Elite Reward ↑", description: "Aisha G.", user: "Aisha G.", timestamp: "3h ago" },
    { id: "2", type: "Program Disabled", description: "Aisha G.", user: "Aisha G.", timestamp: "1d ago" },
    { id: "3", type: "Starter Threshold ↓", description: "Aisha G.", user: "Aisha G.", timestamp: "5d ago" },
  ],
};

export const referralSettingsApi = {
  async getSettings(): Promise<ReferralSettings> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_FETCH_DELAY_MS));
      return MOCK_SETTINGS;
    }
    throw new Error("Live referral-settings endpoint not yet wired in the admin UI");
  },

  async updateSettings(_settings: Partial<ReferralSettings>): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live referral-settings update endpoint not yet wired in the admin UI");
  },

  async updateTier(_tierId: string, _tier: Partial<TierThreshold>): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live tier-update endpoint not yet wired in the admin UI");
  },

  async saveConfiguration(): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live save-configuration endpoint not yet wired in the admin UI");
  },

  async resetToDefaults(): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live reset-defaults endpoint not yet wired in the admin UI");
  },
};
