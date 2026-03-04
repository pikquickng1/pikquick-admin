"use client";

import { Users, Clock, TrendingUp, Activity, Eye, Download } from "lucide-react";
import { useState } from "react";
import { useAnalyticsData } from "../hooks/useAnalyticsData";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import { TaskCategoryDetailsModal } from "./TaskCategoryDetailsModal";
import { CompareCitiesModal } from "./CompareCitiesModal";

export function AnalyticsDashboard() {
  const { data, loading } = useAnalyticsData();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCompareCitiesModal, setShowCompareCitiesModal] = useState(false);
  const [showPeakUsageModal, setShowPeakUsageModal] = useState(false);
  const [showPeakUsageCalendar, setShowPeakUsageCalendar] = useState(false);

  const categoryDetails = data?.tasksByCategory.map((cat) => ({
    name: cat.name,
    color: cat.color,
    taskCount: cat.name === "Delivery" ? 1240 : cat.name === "Errand" ? 689 : cat.name === "Food" ? 551 : 276,
    percentage: cat.value,
    avgTime: cat.name === "Delivery" ? 40 : cat.name === "Errand" ? 43 : cat.name === "Food" ? 46 : 49,
    successRate: cat.name === "Delivery" ? 95 : cat.name === "Errand" ? 93 : cat.name === "Food" ? 91 : 89,
  })) || [];

  const cityNames = data?.topCities.map((city) => city.city) || [];

  const handlePeakUsageDateSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setShowPeakUsageCalendar(false);
      setShowPeakUsageModal(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.monthlyEarnings || !data.revenueBreakdown || !data.peakUsageHours || !data.userMetrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-neutral-500">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Analytics & Insights</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold text-text-primary">{data.stats.totalTasks.toLocaleString()}</p>
              <p className="text-sm text-text-secondary mt-1">Total Tasks</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold text-text-primary">{data.stats.avgCompletionTime} mins</p>
              <p className="text-sm text-text-secondary mt-1">Avg Completion Time</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold text-text-primary">{data.stats.retentionRate}%</p>
              <p className="text-sm text-text-secondary mt-1">Retention Rate</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-3xl font-bold text-text-primary">{data.stats.activeUsers.toLocaleString()}</p>
              <p className="text-sm text-text-secondary mt-1">Active Users</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Category - Pie Chart */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-semibold text-text-primary">Tasks by Category</h2>
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
            >
              <Eye className="w-4 h-4" />
              View Details
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.tasksByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.tasksByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Completion Time Trend - Line Chart */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-base font-semibold text-text-primary mb-6">
            Task Completion Time Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.completionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                />
                <YAxis
                  label={{ value: "Minutes", angle: -90, position: "insideLeft", fill: "#6B7280" }}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  domain={[0, 60]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top 5 Cities by Task Volume - Bar Chart */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-text-primary">Top 5 Cities by Task Volume</h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCompareCitiesModal(true)}
              className="text-sm text-text-secondary px-4 py-2 hover:text-text-primary border border-neutral-200 rounded"
            >
              Compare Cities
            </button>
            <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary px-4 py-2 border border-neutral-200 rounded">
              <Download className="w-4 h-4" />
              Export City Data
            </button>
          </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.topCities}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                domain={[0, 1500]}
              />
              <YAxis
                type="category"
                dataKey="city"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                width={100}
              />
              <Tooltip />
              <Bar dataKey="volume" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Performance Section */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">Financial Performance</h2>
          <div className="flex items-center gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-neutral-200 rounded">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {dateRange?.from && dateRange?.to
                    ? `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                    : "Filter by Date Range"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  defaultMonth={dateRange?.from}
                />
              </PopoverContent>
            </Popover>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-neutral-200 rounded">
              <Download className="w-4 h-4" />
              Export Financial Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Earnings Trend */}
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-4">Monthly Earnings Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                    domain={[0, 6]}
                    ticks={[0, 1.5, 3, 4.5, 6]}
                    tickFormatter={(value) => `₦${value}M`}
                  />
                  <Tooltip formatter={(value) => `₦${value}M`} />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ fill: "#10B981", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Access Fee Revenue Summary */}
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-4">
              Access Fee Revenue Summary
            </h3>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.revenueBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    style={{ fontSize: "13px" }}
                  >
                    {data.revenueBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Peak Usage Hours Heatmap */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-text-primary">Peak Usage Hours (Weekly Heatmap)</h2>
          <Popover open={showPeakUsageCalendar} onOpenChange={setShowPeakUsageCalendar}>
            <PopoverTrigger asChild>
              <button className="text-sm text-text-secondary hover:text-text-primary px-4 py-2 border border-neutral-200 ">
                Drill Down
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-text-primary mb-3">
                </h3>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={handlePeakUsageDateSelect}
                  numberOfMonths={1}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.peakUsageHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="time"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                domain={[0, 100]}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="Mon" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Tue" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Wed" fill="#F59E0B" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Thu" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Fri" fill="#EF4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Sat" fill="#EC4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Sun" fill="#14B8A6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Repeat User Rate */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-base font-semibold text-text-primary mb-6">Repeat User Rate</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "Repeat Users", value: data.userMetrics.repeatUserRate },
                    { name: "New Users", value: data.userMetrics.newUserRate },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  style={{ fontSize: "13px" }}
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#3B82F6" />
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* New vs Returning Users */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-base font-semibold text-text-primary mb-6">New vs Returning Users</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data.userMetrics.monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  domain={[0, 1600]}
                  ticks={[0, 400, 800, 1200, 1600]}
                />
                <Tooltip />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="square"
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Bar 
                  dataKey="newUsers" 
                  fill="#3B82F6" 
                  name="New Users" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
                <Bar 
                  dataKey="returningUsers" 
                  fill="#10B981" 
                  name="Returning Users" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Task Category Details Modal */}
      <TaskCategoryDetailsModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categories={categoryDetails}
      />

      {/* Compare Cities Modal */}
      <CompareCitiesModal
        isOpen={showCompareCitiesModal}
        onClose={() => setShowCompareCitiesModal(false)}
        cities={cityNames}
      />

      
    </div>
  );
}
