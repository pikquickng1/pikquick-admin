import { ReferralSettings, TierThreshold } from "../types/referral-settings.types";

export const referralSettingsApi = {
  getSettings: async (): Promise<ReferralSettings> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      programActive: true,
      tiers: [
        {
          id: "starter",
          name: "Starter Tier",
          color: "green",
          threshold: 10,
          rewardAmount: 2500,
        },
        {
          id: "pro",
          name: "Pro Tier",
          color: "blue",
          threshold: 50,
          rewardAmount: 7500,
        },
        {
          id: "elite",
          name: "Elite Tier",
          color: "purple",
          threshold: 150,
          rewardAmount: 25000,
        },
      ],
      activeReferralDefinitions: [
        { id: "signup", label: "Signup only", selected: false },
        { id: "kyc", label: "KYC verified", selected: false },
        { id: "first_task", label: "First task completed", selected: true },
        { id: "first_payment", label: "First ₦10,000 processed", selected: false },
      ],
      antiFraudVerification: true,
      rewardsBudget: {
        total: 2450000,
        available: 2450000,
        percentage: 75,
      },
      recentChanges: [
        {
          id: "1",
          type: "Elite Reward ↑",
          description: "Aisha G.",
          user: "Aisha G.",
          timestamp: "3h ago",
        },
        {
          id: "2",
          type: "Program Disabled",
          description: "Aisha G.",
          user: "Aisha G.",
          timestamp: "1d ago",
        },
        {
          id: "3",
          type: "Starter Threshold ↓",
          description: "Aisha G.",
          user: "Aisha G.",
          timestamp: "5d ago",
        },
      ],
    };
  },

  updateSettings: async (settings: Partial<ReferralSettings>): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating settings:", settings);
  },

  updateTier: async (tierId: string, tier: Partial<TierThreshold>): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Updating tier:", tierId, tier);
  },

  saveConfiguration: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Saving configuration");
  },

  resetToDefaults: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Resetting to defaults");
  },
};
