export interface AnalyticsStats {
  totalTasks: number;
  avgCompletionTime: number;
  retentionRate: number;
  activeUsers: number;
}

export interface TaskCategory {
  name: string;
  value: number;
  color: string;
}

export interface CompletionTrendData {
  month: string;
  minutes: number;
}

export interface CityTaskVolume {
  city: string;
  volume: number;
}

export interface MonthlyEarning {
  month: string;
  earnings: number;
}

export interface RevenueBreakdown {
  name: string;
  value: number;
  color: string;
}

export interface PeakUsageData {
  time: string;
  Mon: number;
  Tue: number;
  Wed: number;
  Thu: number;
  Fri: number;
  Sat: number;
  Sun: number;
}

export interface UserMetrics {
  repeatUserRate: number;
  newUserRate: number;
  monthlyData: {
    month: string;
    newUsers: number;
    returningUsers: number;
  }[];
}

export interface AnalyticsData {
  stats: AnalyticsStats;
  tasksByCategory: TaskCategory[];
  completionTrend: CompletionTrendData[];
  topCities: CityTaskVolume[];
  monthlyEarnings: MonthlyEarning[];
  revenueBreakdown: RevenueBreakdown[];
  peakUsageHours: PeakUsageData[];
  userMetrics: UserMetrics;
}
