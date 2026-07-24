import { apiClient } from "@/lib/api/client";

export interface AdminRevenueReport {
  stats: { totalInflow: number; totalOutflow: number; netProfit: number };
  dailyEarnings: Array<{ date: string; amount: number }>;
  categories: Array<{ name: string; amount: number; percentage: number }>;
  metrics: {
    averageTransaction: number;
    transactionVolume: number;
    activeUsers: number;
    platformFee: number;
  };
  caveat?: string;
}

export const analyticsService = {
  getAnalytics() {
    return apiClient.get("/admin/analytics").then((r) => r.data);
  },

  getRevenueReport(): Promise<AdminRevenueReport> {
    return apiClient.get("/admin/analytics/revenue-report").then((r) => r.data);
  },
};
