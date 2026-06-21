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
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { PageHeader } from "@/components/ui/page-header";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
import {
  CHART_COLORS,
  CHART_LINE_DEFAULT_WIDTH,
  CHART_DOT_DEFAULT_RADIUS,
  CHART_ACTIVE_DOT_DEFAULT_RADIUS,
  CHART_PIE_DEFAULT_OUTER_RADIUS,
  CHART_BAR_DEFAULT_SIZE,
  CHART_WEEKDAY_PALETTE,
  CHART_PIE_PALETTE,
} from "@/lib/utils/chart-colors";
import { formatNgn } from "@/lib/utils/money";
import { TaskCategoryDetailsModal } from "./TaskCategoryDetailsModal";
import { CompareCitiesModal } from "./CompareCitiesModal";

function formatNgnMillions(value: number): string {
  return formatNgn(value * 1_000_000);
}

function axisTickMillions(value: number): string {
  return `${value}M`;
}

const STAT_CARDS = [
  { key: "totalTasks", label: "Total Tasks", Icon: Users, color: "blue" },
  { key: "avgCompletionTime", label: "Avg Completion Time", Icon: Clock, color: "green", suffix: " mins" },
  { key: "retentionRate", label: "Retention Rate", Icon: TrendingUp, color: "orange", suffix: "%" },
  { key: "activeUsers", label: "Active Users", Icon: Activity, color: "purple" },
] as const;

const STAT_COLOR_CLASS: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-600" },
  orange: { bg: "bg-orange-100", text: "text-orange-600" },
  purple: { bg: "bg-purple-100", text: "text-purple-600" },
};

export function AnalyticsDashboard() {
  const { data, loading, error, refetch } = useAnalyticsData();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCompareCitiesModal, setShowCompareCitiesModal] = useState(false);

  if (loading) return <LoadingState label="Loading analytics..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-neutral-500">No analytics data available</p>
      </div>
    );
  }

  const categoryDetails = (data.tasksByCategory ?? []).map((cat) => ({
    name: cat.name,
    color: cat.color,
    taskCount: cat.value,
    percentage: cat.value,
    avgTime: 0,
    successRate: 0,
  }));
  const cityNames = (data.topCities ?? []).map((city) => city.city);

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics & Insights" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {STAT_CARDS.map((card) => {
          const value = (data.stats as unknown as Record<string, number>)[card.key] ?? 0;
          const formatted = card.key === "totalTasks" || card.key === "activeUsers"
            ? value.toLocaleString()
            : `${value}${"suffix" in card ? card.suffix : ""}`;
          const colors = STAT_COLOR_CLASS[card.color];
          return (
            <div key={card.key} className="bg-white rounded-lg border border-neutral-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold text-text-primary">{formatted}</p>
                  <p className="text-sm text-text-secondary mt-1">{card.label}</p>
                </div>
                <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                  <card.Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  outerRadius={CHART_PIE_DEFAULT_OUTER_RADIUS}
                  dataKey="value"
                >
                  {data.tasksByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || CHART_PIE_PALETTE[index % CHART_PIE_PALETTE.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-base font-semibold text-text-primary mb-6">
            Task Completion Time Trend
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.completionTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                  axisLine={{ stroke: CHART_COLORS.grid }}
                />
                <YAxis
                  label={{ value: "Minutes", angle: -90, position: "insideLeft", fill: CHART_COLORS.axis }}
                  tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                  axisLine={{ stroke: CHART_COLORS.grid }}
                  domain={[0, 60]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={CHART_LINE_DEFAULT_WIDTH}
                  dot={{ fill: CHART_COLORS.primary, r: CHART_DOT_DEFAULT_RADIUS }}
                  activeDot={{ r: CHART_ACTIVE_DOT_DEFAULT_RADIUS }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

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
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
                domain={[0, 1500]}
              />
              <YAxis
                type="category"
                dataKey="city"
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
                width={100}
              />
              <Tooltip />
              <Bar dataKey="volume" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

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
          <div>
            <h3 className="text-base font-semibold text-text-primary mb-4">Monthly Earnings Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                    axisLine={{ stroke: CHART_COLORS.grid }}
                  />
                  <YAxis
                    tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                    axisLine={{ stroke: CHART_COLORS.grid }}
                    domain={[0, 6]}
                    ticks={[0, 1.5, 3, 4.5, 6]}
                    tickFormatter={axisTickMillions}
                  />
                  <Tooltip formatter={(value) => formatNgnMillions(Number(value))} />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke={CHART_COLORS.success}
                    strokeWidth={CHART_LINE_DEFAULT_WIDTH}
                    dot={{ fill: CHART_COLORS.success, r: CHART_DOT_DEFAULT_RADIUS }}
                    activeDot={{ r: CHART_ACTIVE_DOT_DEFAULT_RADIUS }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

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
                    outerRadius={CHART_PIE_DEFAULT_OUTER_RADIUS}
                    dataKey="value"
                    style={{ fontSize: "13px" }}
                  >
                    {data.revenueBreakdown.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color || CHART_PIE_PALETTE[index % CHART_PIE_PALETTE.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-text-primary">Peak Usage Hours (Weekly Heatmap)</h2>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.peakUsageHours}>
              <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
              <XAxis
                dataKey="time"
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
              />
              <YAxis
                tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                axisLine={{ stroke: CHART_COLORS.grid }}
                domain={[0, 100]}
              />
              <Tooltip />
              <Legend />
              {(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const).map((day, i) => (
                <Bar
                  key={day}
                  dataKey={day}
                  fill={CHART_WEEKDAY_PALETTE[i]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  label={(entry: { name?: string; value?: number }) =>
                    `${entry.name ?? ""}: ${entry.value ?? 0}%`
                  }
                  outerRadius={CHART_PIE_DEFAULT_OUTER_RADIUS}
                  dataKey="value"
                  style={{ fontSize: "13px" }}
                >
                  <Cell fill={CHART_COLORS.success} />
                  <Cell fill={CHART_COLORS.primary} />
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-base font-semibold text-text-primary mb-6">New vs Returning Users</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.userMetrics.monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                  axisLine={{ stroke: CHART_COLORS.grid }}
                />
                <YAxis
                  tick={{ fill: CHART_COLORS.axis, fontSize: 12 }}
                  axisLine={{ stroke: CHART_COLORS.grid }}
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
                  fill={CHART_COLORS.primary}
                  name="New Users"
                  radius={[4, 4, 0, 0]}
                  barSize={CHART_BAR_DEFAULT_SIZE}
                />
                <Bar
                  dataKey="returningUsers"
                  fill={CHART_COLORS.success}
                  name="Returning Users"
                  radius={[4, 4, 0, 0]}
                  barSize={CHART_BAR_DEFAULT_SIZE}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <TaskCategoryDetailsModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        categories={categoryDetails}
      />

      <CompareCitiesModal
        isOpen={showCompareCitiesModal}
        onClose={() => setShowCompareCitiesModal(false)}
        cities={cityNames}
      />
    </div>
  );
}
