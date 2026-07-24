import {
  ActiveReferralDefinition,
  ReferralTierKey,
} from "@/lib/types/enums";
import { CURRENCY_SYMBOL } from "@/lib/config/feature-flags";
import { referralService } from "@/lib/services";
import type {
  ReferralSettingsResponse,
  ReferralTier as ApiReferralTier,
} from "@/lib/types";
import type {
  ActiveReferralConfig,
  ReferralSettings,
  TierThreshold,
} from "../types/referral-settings.types";

const TIER_COLORS: Record<string, TierThreshold["color"]> = {
  [ReferralTierKey.STARTER]: "green",
  [ReferralTierKey.PRO]: "blue",
  [ReferralTierKey.ELITE]: "purple",
};

function definitionLabel(def: string, firstNAmount: number | null): string {
  switch (def) {
    case ActiveReferralDefinition.SIGNUP_ONLY:
      return "Signup only";
    case ActiveReferralDefinition.KYC_VERIFIED:
      return "KYC verified";
    case ActiveReferralDefinition.FIRST_TASK_COMPLETED:
      return "First task completed";
    case ActiveReferralDefinition.FIRST_N_AMOUNT_PROCESSED:
      return `First ${CURRENCY_SYMBOL}${(firstNAmount ?? 0).toLocaleString()} processed`;
    default:
      return def;
  }
}

function mapTier(t: ApiReferralTier): TierThreshold {
  return {
    id: t.key as ReferralTierKey,
    name: t.name,
    color: TIER_COLORS[t.key] ?? "green",
    threshold: t.threshold,
    rewardAmount: t.reward_amount_ngn,
  };
}

function mapSettings(res: ReferralSettingsResponse): ReferralSettings {
  const s = res.settings;
  const definitions: ActiveReferralConfig[] = Object.values(
    ActiveReferralDefinition,
  ).map((def) => ({
    id: def,
    label: definitionLabel(def, s.first_n_amount_ngn),
    selected: def === s.active_referral_definition,
  }));

  return {
    programActive: s.program_enabled,
    tiers: (res.tiers ?? []).map(mapTier),
    activeReferralDefinitions: definitions,
    antiFraudVerification: s.require_manual_review_elite,
    // Budget + change-log are not tracked by the backend yet.
    rewardsBudget: { total: 0, available: 0, percentage: 0 },
    recentChanges: [],
  };
}

export const referralSettingsApi = {
  async getSettings(): Promise<ReferralSettings> {
    const res = await referralService.getSettings();
    return mapSettings(res);
  },

  async updateSettings(settings: Partial<ReferralSettings>): Promise<void> {
    await referralService.updateSettings({
      settings: {
        program_enabled: settings.programActive,
        require_manual_review_elite: settings.antiFraudVerification,
      },
    });
  },

  async updateTier(tierId: string, tier: Partial<TierThreshold>): Promise<void> {
    await referralService.updateSettings({
      tiers: [
        {
          key: tierId,
          threshold: tier.threshold,
          reward_amount_ngn: tier.rewardAmount,
          name: tier.name,
        },
      ],
    });
  },

  // The settings screen does not currently collect edited state, so there is
  // nothing extra to persist here beyond updateSettings/updateTier.
  async saveConfiguration(): Promise<void> {
    return;
  },

  // No backend "reset to defaults" endpoint exists; kept as a no-op.
  async resetToDefaults(): Promise<void> {
    return;
  },
};
