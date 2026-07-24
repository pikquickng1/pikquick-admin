import { analyticsService } from "@/lib/services/analytics.service";
import { REVENUE_CHART_COLORS } from "../types/revenue.types";
import type { RevenueData } from "../types/revenue.types";

// Colors assigned to revenue categories by position, matching the pie defaults.
const CATEGORY_COLORS = [
  REVENUE_CHART_COLORS.pieDefaults.taskPayments,
  REVENUE_CHART_COLORS.pieDefaults.dailyAccess,
  REVENUE_CHART_COLORS.pieDefaults.walletTopups,
  REVENUE_CHART_COLORS.pieDefaults.platformFees,
];

export const revenueApi = {
  getRevenueData: async (): Promise<RevenueData> => {
    const report = await analyticsService.getRevenueReport();
    return {
      stats: report.stats,
      dailyEarnings: report.dailyEarnings,
      categories: report.categories.map((c, i) => ({
        name: c.name,
        amount: c.amount,
        percentage: c.percentage,
        color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
      })),
      metrics: report.metrics,
    };
  },
};
