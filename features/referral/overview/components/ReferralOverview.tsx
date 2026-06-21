"use client";

import { Users, UserCheck, Gift, Award, Wallet } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatNgn } from "@/lib/utils/money";
import { CURRENCY_SYMBOL } from "@/lib/config/feature-flags";
import { CHART_COLORS } from "@/lib/utils/chart-colors";
import { ReferralTierKey } from "@/lib/types/enums";
import { referralTierLabel } from "@/lib/utils/status";
import { statusBadgeClass, statusBadgeClasses } from "@/lib/utils/status";
import { useReferralData } from "../hooks/useReferralData";
import { ErrorState } from "@/components/ui/error-state";

const TOTAL_PAYOUTS_DISPLAY_DIVISOR = 1_000_000;

export function ReferralOverview() {
  const { data, loading, error, refetch } = useReferralData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-neutral-500">Loading referral data...</p>
      </div>
    );
  }

  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!data) return null;

  const pieData = [
    { name: "Paid", value: data.rewardStatus.paid, color: CHART_COLORS.success },
    { name: "Pending", value: data.rewardStatus.pending, color: CHART_COLORS.warning },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Referral Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-1">Total Referrals/Month</p>
          <p className="text-2xl font-semibold text-text-primary">
            {data.stats.totalReferrals.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-1">Active Referrals</p>
          <p className="text-2xl font-semibold text-text-primary">
            {data.stats.activeReferrals.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-1">Rewards Unlocked</p>
          <p className="text-2xl font-semibold text-text-primary">
            {data.stats.rewardsUnlocked.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-1">Elite Candidates</p>
          <p className="text-2xl font-semibold text-text-primary">
            {data.stats.eliteCandidates.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-teal-600" />
            </div>
          </div>
          <p className="text-sm text-text-secondary mb-1">
            Total Payouts ({CURRENCY_SYMBOL})
          </p>
          <p className="text-2xl font-semibold text-text-primary">
            {CURRENCY_SYMBOL}
            {(data.stats.totalPayouts / TOTAL_PAYOUTS_DISPLAY_DIVISOR).toFixed(1)}M
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Referrals Over Time</h2>
            <p className="text-sm text-text-secondary">Daily referral performance</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.dailyReferrals}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
              <XAxis dataKey="day" stroke={CHART_COLORS.axis} fontSize={12} />
              <YAxis stroke={CHART_COLORS.axis} fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: CHART_COLORS.tooltipBg,
                  border: `1px solid ${CHART_COLORS.tooltipBorder}`,
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Rewards Status</h2>
            <p className="text-sm text-text-secondary">Paid vs. Pending payouts</p>
          </div>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) =>
                    value !== undefined ? formatNgn(value) : ""
                  }
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Paid</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatNgn(data.rewardStatus.paid)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Pending</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatNgn(data.rewardStatus.pending)}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200">
                <p className="text-sm font-medium text-text-secondary">Total Rewards</p>
                <p className="text-xl font-semibold text-text-primary">
                  {formatNgn(data.rewardStatus.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Top Referrers This Week</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all records
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                {["Referrer", "Role", "Total Referrals", "Rewards Earned", "Status"].map((h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 text-sm font-medium text-text-secondary"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.topReferrers.map((referrer) => (
                <tr key={referrer.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-600">
                          {referrer.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-text-primary">
                        {referrer.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-text-primary">{referrer.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-text-primary">
                      {referrer.totalReferrals}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-text-primary">
                      {formatNgn(referrer.rewardsEarned)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={statusBadgeClasses(referrer.status)}
                    >
                      {referralTierLabel(referrer.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Keep the helper symbol referenced so unused imports don't sneak in during
// future refactors while we migrate the rest of the module.
export const __unused = { statusBadgeClass, ReferralTierKey };
