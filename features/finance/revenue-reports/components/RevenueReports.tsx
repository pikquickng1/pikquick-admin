"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Calendar, MapPin, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRevenueData } from "../hooks/useRevenueData";

export function RevenueReports() {
  const { data, loading } = useRevenueData();
  const [period, setPeriod] = useState("Last 7 Days");
  const [location, setLocation] = useState("All Locations");

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
          <p className="text-sm text-neutral-500">Loading revenue data...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">Revenue Reports</h1>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded text-sm text-text-primary hover:bg-neutral-200">
              <Calendar className="w-4 h-4" />
              {period}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setPeriod("Last 7 Days")}>
                Last 7 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("Last 30 Days")}>
                Last 30 Days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setPeriod("Last 3 Months")}>
                Last 3 Months
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded text-sm text-text-primary hover:bg-neutral-200">
              <MapPin className="w-4 h-4" />
              {location}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLocation("All Locations")}>
                All Locations
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("Lagos")}>Lagos</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation("Abuja")}>Abuja</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">
                {formatCurrency(data.stats.totalInflow)}
              </p>
              <p className="text-sm text-text-secondary">Total Inflow</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">
                {formatCurrency(data.stats.totalOutflow)}
              </p>
              <p className="text-sm text-text-secondary">Total Outflow</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">
                {formatCurrency(data.stats.netProfit)}
              </p>
              <p className="text-sm text-text-secondary">Net Profit</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Earnings Trend */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Daily Earnings Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dailyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
                formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Revenue by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.name}: ${entry.percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
              >
                {data.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ""} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">
          Revenue Breakdown by Category
        </h2>
        <div className="space-y-3">
          {data.categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">{category.name}</p>
                  <p className="text-xs text-text-secondary">
                    {category.percentage}% of total revenue
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-text-primary">
                  {formatCurrency(category.amount)}
                </p>
                <p className="text-xs text-text-secondary">This period</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <p className="text-2xl font-semibold text-text-primary mb-1">
            {formatCurrency(data.metrics.averageTransaction)}
          </p>
          <p className="text-sm text-text-secondary">Average Transaction</p>
          <p className="text-xs text-text-secondary mt-1">Per transaction</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <p className="text-2xl font-semibold text-text-primary mb-1">
            {data.metrics.transactionVolume}
          </p>
          <p className="text-sm text-text-secondary">Transaction Volume</p>
          <p className="text-xs text-text-secondary mt-1">Total transactions</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <p className="text-2xl font-semibold text-text-primary mb-1">
            {data.metrics.activeUsers}
          </p>
          <p className="text-sm text-text-secondary">Active Users</p>
          <p className="text-xs text-text-secondary mt-1">This period</p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <p className="text-2xl font-semibold text-text-primary mb-1">
            {formatCurrency(data.metrics.platformFee)}
          </p>
          <p className="text-sm text-text-secondary">Platform Fee</p>
          <p className="text-xs text-text-secondary mt-1">Total collected</p>
        </div>
      </div>
    </div>
  );
}
