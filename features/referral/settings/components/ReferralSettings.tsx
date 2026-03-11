"use client";

import { useState } from "react";
import { Settings, Save, RotateCcw, Award, Info, AlertCircle } from "lucide-react";
import { useReferralSettings } from "../hooks/useReferralSettings";
import { referralSettingsApi } from "../api/referralSettingsApi";

export function ReferralSettings() {
  const { settings, loading } = useReferralSettings();
  const [saving, setSaving] = useState(false);

  const handleSaveConfiguration = async () => {
    try {
      setSaving(true);
      await referralSettingsApi.saveConfiguration();
    } catch (error) {
      console.error("Failed to save configuration:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefaults = async () => {
    try {
      await referralSettingsApi.resetToDefaults();
    } catch (error) {
      console.error("Failed to reset to defaults:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Referral Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Program Configuration */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-text-primary">Program Configuration</h2>
                  <p className="text-sm text-text-secondary">Manage referral tiers, rewards, and rules</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-600">ACTIVE</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.programActive} className="sr-only peer" readOnly />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Tier Thresholds & Rewards */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                <h3 className="text-base font-semibold text-text-primary">TIER THRESHOLDS & REWARDS</h3>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                + Add Tier
              </button>
            </div>

            <div className="space-y-4">
              {settings.tiers.map((tier) => (
                <div key={tier.id} className="border border-neutral-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className={`text-sm font-medium ${
                        tier.color === "green"
                          ? "text-green-600"
                          : tier.color === "blue"
                          ? "text-blue-600"
                          : "text-purple-600"
                      }`}
                    >
                      {tier.name}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-text-secondary uppercase mb-2">
                        THRESHOLD (REFERRALS)
                      </label>
                      <input
                        type="number"
                        value={tier.threshold}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-secondary uppercase mb-2">
                        REWARD AMOUNT (₦)
                      </label>
                      <input
                        type="number"
                        value={tier.rewardAmount}
                        className="w-full px-3 py-2 border border-neutral-200 rounded-lg text-sm"
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rules & Definitions */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-5 h-5 text-blue-500" />
              <h3 className="text-base font-semibold text-text-primary">RULES & DEFINITIONS</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-text-primary mb-3">
                  Definition of "Active Referral"
                </p>
                <div className="space-y-2">
                  {settings.activeReferralDefinitions.map((def) => (
                    <label key={def.id} className="flex items-center gap-3 p-3 border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50">
                      <input
                        type="radio"
                        name="activeReferral"
                        checked={def.selected}
                        className="w-4 h-4 text-blue-600"
                        readOnly
                      />
                      <span className="text-sm text-text-primary">{def.label}</span>
                      {def.selected && (
                        <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-primary">Anti-Fraud Verification</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Require manual review for all Elite rewards
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.antiFraudVerification} className="sr-only peer" readOnly />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* System Control */}
          <div className="bg-gray-900 rounded-lg p-6 text-white">
            <h3 className="text-base font-semibold mb-6">SYSTEM CONTROL</h3>
            <div className="space-y-4">
              <button
                onClick={handleSaveConfiguration}
                disabled={saving}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Configuration"}
              </button>
              <button
                onClick={handleResetToDefaults}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Defaults
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium mb-1">LIVE STATUS</p>
                  <p className="text-xs opacity-80">
                    Changes to reward amounts will only apply to new referrals generated after save.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Changes */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-text-primary">RECENT CHANGES</h3>
            </div>
            <div className="space-y-3">
              {settings.recentChanges.map((change) => (
                <div key={change.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-text-primary">
                      {change.user.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{change.type}</p>
                    <p className="text-xs text-text-secondary">{change.description}</p>
                  </div>
                  <span className="text-xs text-text-secondary whitespace-nowrap">
                    {change.timestamp}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              View Full Audit Log
            </button>
          </div>

          {/* Rewards Budget */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-base font-semibold text-text-primary">REWARDS BUDGET</h3>
            </div>
            <p className="text-3xl font-bold text-text-primary mb-2">
              {formatCurrency(settings.rewardsBudget.total)}
            </p>
            <p className="text-sm text-text-secondary mb-4">
              Available for referral payouts this month
            </p>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${settings.rewardsBudget.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
