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
import { useReferralData } from "../hooks/useReferralData";

export function ReferralOverview() {
  const { data, loading } = useReferralData();

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
          <p className="text-sm text-neutral-500">Loading referral data...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const pieData = [
    { name: "Paid", value: data.rewardStatus.paid, color: "#10B981" },
    { name: "Pending", value: data.rewardStatus.pending, color: "#F59E0B" },
  ];

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Elite":
        return "bg-purple-100 text-purple-700";
      case "Pro":
        return "bg-blue-100 text-blue-700";
      case "Starter":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Referral Overview</h1>

      {/* Stats Cards */}
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
          <p className="text-sm text-text-secondary mb-1">Total Payouts (₦)</p>
          <p className="text-2xl font-semibold text-text-primary">
            ₦{(data.stats.totalPayouts / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referrals Over Time */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Referrals Over Time</h2>
            <p className="text-sm text-text-secondary">Daily referral performance</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.dailyReferrals}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rewards Status */}
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
                <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Paid</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatCurrency(data.rewardStatus.paid)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-500 rounded-full" />
                <div>
                  <p className="text-sm font-medium text-text-primary">Pending</p>
                  <p className="text-lg font-semibold text-text-primary">
                    {formatCurrency(data.rewardStatus.pending)}
                  </p>
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-200">
                <p className="text-sm font-medium text-text-secondary">Total Rewards</p>
                <p className="text-xl font-semibold text-text-primary">
                  {formatCurrency(data.rewardStatus.total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Referrers This Week */}
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
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                  Referrer
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                  Role
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                  Total Referrals
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                  Rewards Earned
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-secondary">
                  Status
                </th>
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
                      {formatCurrency(referrer.rewardsEarned)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        referrer.status
                      )}`}
                    >
                      {referrer.status}
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
