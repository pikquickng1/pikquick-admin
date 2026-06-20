import { USE_MOCKS } from "@/lib/config/feature-flags";
import { REVENUE_CHART_COLORS } from "../types/revenue.types";
import type { RevenueData } from "../types/revenue.types";

const MOCK_DELAY_MS = 300;

const MOCK_REVENUE: RevenueData = {
  stats: {
    totalInflow: 151300,
    totalOutflow: 95000,
    netProfit: 56300,
  },
  dailyEarnings: [
    { date: "Oct 24", amount: 120000 },
    { date: "Oct 25", amount: 110000 },
    { date: "Oct 26", amount: 135000 },
    { date: "Oct 27", amount: 145000 },
    { date: "Oct 28", amount: 125000 },
    { date: "Oct 29", amount: 155000 },
    { date: "Oct 30", amount: 165000 },
  ],
  categories: [
    { name: "Task Payments", amount: 68500, percentage: 45, color: REVENUE_CHART_COLORS.pieDefaults.taskPayments },
    { name: "Daily Access", amount: 45000, percentage: 30, color: REVENUE_CHART_COLORS.pieDefaults.dailyAccess },
    { name: "Wallet Top-ups", amount: 30200, percentage: 20, color: REVENUE_CHART_COLORS.pieDefaults.walletTopups },
    { name: "Platform Fees", amount: 7600, percentage: 5, color: REVENUE_CHART_COLORS.pieDefaults.platformFees },
  ],
  metrics: {
    averageTransaction: 2847,
    transactionVolume: 342,
    activeUsers: 156,
    platformFee: 7600,
  },
};

export const revenueApi = {
  getRevenueData: async (): Promise<RevenueData> => {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
      return MOCK_REVENUE;
    }
    throw new Error("Live revenue endpoint not yet wired in the admin UI");
  },
};
