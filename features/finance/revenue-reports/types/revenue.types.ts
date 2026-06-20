import { colors } from "@/lib/design-tokens";

export interface RevenueStats {
  totalInflow: number;
  totalOutflow: number;
  netProfit: number;
}

export interface DailyEarning {
  date: string;
  amount: number;
}

export interface RevenueCategory {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface RevenueMetrics {
  averageTransaction: number;
  transactionVolume: number;
  activeUsers: number;
  platformFee: number;
}

export interface RevenueData {
  stats: RevenueStats;
  dailyEarnings: DailyEarning[];
  categories: RevenueCategory[];
  metrics: RevenueMetrics;
}

export interface RevenueFilters {
  period: "last_7_days" | "last_30_days" | "last_3_months";
  location: "all" | "lagos" | "abuja";
}

export const REVENUE_CHART_COLORS = {
  line: colors.primary[500],
  gridStroke: colors.border.light,
  axisStroke: colors.neutral[600],
  pieDefaults: {
    taskPayments: colors.primary[500],
    dailyAccess: colors.semantic.success,
    walletTopups: colors.semantic.warning,
    platformFees: "#8B5CF6",
  },
} as const;
