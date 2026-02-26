"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Users,
  CheckSquare,
  DollarSign,
  TrendingUp,
  UserCheck,
  MapPin,
  FileCheck,
  MessageSquare,
} from "lucide-react";
import { TaskTrendsChart } from "@/components/dashboard/TaskTrendsChart";
import { RevenueGrowthChart } from "@/components/dashboard/RevenueGrowthChart";
import { TopActiveAreas } from "@/components/dashboard/TopActiveAreas";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { dashboardService } from "@/lib/services";
import { queryKeys } from "@/lib/query/keys";
import { formatNgnFromKobo } from "@/lib/utils/money";
import Link from "next/link";

export default function DashboardPage() {
  const { data: stats, isLoading, isError, error } = useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: () => dashboardService.getStats(),
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <p className="font-medium">Failed to load dashboard stats</p>
          <p className="text-sm mt-1">
            {error instanceof Error ? error.message : "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const { users, tasks, escrow, withdrawals, pending_document_verifications, feedback_total } =
    stats;

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded py-6 px-4 bg-white text-text-primary border-neutral-300 hover:bg-neutral-50 shadow-none"
            asChild
          >
            <Link href="/dashboard/tasks">View Disputes</Link>
          </Button>
          <Button
            variant="outline"
            className="rounded py-6 px-4 bg-white text-text-primary border-neutral-300 hover:bg-neutral-50 shadow-none"
            asChild
          >
            <Link href="/dashboard/finance/payouts">Review Payouts</Link>
          </Button>
          <Button className="bg-primary-500 rounded py-6 px-4 hover:bg-primary-600 text-white shadow-none" asChild>
            <Link href="/dashboard/users/runners">Approve KYC</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {users.total.toLocaleString()}
            </div>
            <p className="text-sm text-text-secondary mt-1">Total Users</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {/* Active Tasks */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-text-primary">
              {tasks.total.toLocaleString()}
            </div>
            <p className="text-sm text-text-secondary mt-1">Active Tasks</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        {/* Escrow Pending */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {formatNgnFromKobo(escrow.total_pending_amount)}
            </div>
            <p className="text-sm text-text-secondary mt-1">Escrow Pending</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Ready to Release */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {formatNgnFromKobo(escrow.ready_to_release_amount)}
            </div>
            <p className="text-sm text-text-secondary mt-1">Ready to Release</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Active Runners */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {(users.by_role?.runner ?? 0).toLocaleString()}
            </div>
            <p className="text-sm text-text-secondary mt-1">Active Runners</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-orange-500" />
          </div>
        </div>

        {/* Pending Withdrawals */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {(withdrawals?.pending_count ?? 0).toLocaleString()}
            </div>
            <p className="text-sm text-text-secondary mt-1">Pending Withdrawals</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-amber-600" />
          </div>
        </div>

        {/* Pending KYC */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {(pending_document_verifications ?? 0).toLocaleString()}
            </div>
            <p className="text-sm text-text-secondary mt-1">Pending KYC</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <FileCheck className="w-6 h-6 text-indigo-500" />
          </div>
        </div>

        {/* Feedback */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">
              {(feedback_total ?? 0).toLocaleString()}
            </div>
            <p className="text-sm text-text-secondary mt-1">Feedback</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-slate-500" />
          </div>
        </div>

        {/* Top City - placeholder (not from API) */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">—</div>
            <p className="text-sm text-text-secondary mt-1">Top City</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskTrendsChart />
        <RevenueGrowthChart />
      </div>

      {/* Top Active Areas */}
      <TopActiveAreas />
    </div>
  );
}
