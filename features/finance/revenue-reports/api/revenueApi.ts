import { RevenueData } from "../types/revenue.types";

export const revenueApi = {
  getRevenueData: async (): Promise<RevenueData> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
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
        { name: "Task Payments", amount: 68500, percentage: 45, color: "#3B82F6" },
        { name: "Daily Access", amount: 45000, percentage: 30, color: "#10B981" },
        { name: "Wallet Top-ups", amount: 30200, percentage: 20, color: "#F59E0B" },
        { name: "Platform Fees", amount: 7600, percentage: 5, color: "#8B5CF6" },
      ],
      metrics: {
        averageTransaction: 2847,
        transactionVolume: 342,
        activeUsers: 156,
        platformFee: 7600,
      },
    };
  },
};
