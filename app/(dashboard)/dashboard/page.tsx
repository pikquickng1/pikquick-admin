import { Button } from "@/components/ui/button";
import { Users, CheckSquare, DollarSign, TrendingUp, UserCheck, MapPin } from "lucide-react";
import { TaskTrendsChart } from "@/components/dashboard/TaskTrendsChart";
import { RevenueGrowthChart } from "@/components/dashboard/RevenueGrowthChart";
import { TopActiveAreas } from "@/components/dashboard/TopActiveAreas";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 bg-white text-text-primary border-neutral-300 hover:bg-neutral-50 shadow-none">
            View Disputes
          </Button>
          <Button variant="outline" className="h-12 bg-white text-text-primary border-neutral-300 hover:bg-neutral-50 shadow-none">
            Review Payouts
          </Button>
          <Button className="h-12 bg-primary-500 hover:bg-primary-600 text-white shadow-none">
            Approve KYC
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Users */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">4,275</div>
            <p className="text-sm text-text-secondary mt-1">Total Users</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        {/* Active Tasks */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-text-primary">1,145</div>
            <p className="text-sm text-text-secondary mt-1">Active Tasks</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <CheckSquare className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        {/* Daily Access Fee Revenue */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">₦36,200</div>
            <p className="text-sm text-text-secondary mt-1">Daily Access Fee Revenue</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">₦8.57M</div>
            <p className="text-sm text-text-secondary mt-1">Total Revenue</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Active Runners */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">362</div>
            <p className="text-sm text-text-secondary mt-1">Active Runners</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-orange-500" />
          </div>
        </div>

        {/* Top City */}
        <div className="bg-white rounded-l p-6 border border-neutral-200 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold text-text-primary">Lekki, Lagos</div>
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
