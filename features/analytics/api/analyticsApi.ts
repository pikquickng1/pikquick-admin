import { AnalyticsData } from "../types/analytics.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

// Mock data for development
const mockAnalyticsData: AnalyticsData = {
  stats: {
    totalTasks: 2756,
    avgCompletionTime: 42,
    retentionRate: 72,
    activeUsers: 6250,
  },
  tasksByCategory: [
    { name: "Delivery", value: 45, color: "#3B82F6" },
    { name: "Errand", value: 25, color: "#10B981" },
    { name: "Food", value: 20, color: "#F59E0B" },
    { name: "Others", value: 10, color: "#8B5CF6" },
  ],
  completionTrend: [
    { month: "May", minutes: 48 },
    { month: "Jun", minutes: 45 },
    { month: "Jul", minutes: 43 },
    { month: "Aug", minutes: 44 },
    { month: "Sep", minutes: 42 },
    { month: "Oct", minutes: 41 },
  ],
  topCities: [
    { city: "Lagos", volume: 1400 },
    { city: "Abuja", volume: 850 },
    { city: "Ibadan", volume: 650 },
    { city: "Port Harcourt", volume: 550 },
    { city: "Kano", volume: 450 },
  ],
  monthlyEarnings: [
    { month: "Jan", earnings: 2.5 },
    { month: "Feb", earnings: 2.7 },
    { month: "Mar", earnings: 3.2 },
    { month: "Apr", earnings: 2.9 },
    { month: "May", earnings: 3.5 },
    { month: "Jun", earnings: 3.8 },
    { month: "Jul", earnings: 4.2 },
    { month: "Aug", earnings: 4.5 },
    { month: "Sep", earnings: 4.8 },
    { month: "Oct", earnings: 5.2 },
  ],
  revenueBreakdown: [
    { name: "Platform Fee", value: 60, color: "#3B82F6" },
    { name: "Service Charge", value: 25, color: "#10B981" },
    { name: "Premium Features", value: 10, color: "#F59E0B" },
    { name: "Other", value: 5, color: "#8B5CF6" },
  ],
  peakUsageHours: [
    { time: "6AM", Mon: 20, Tue: 18, Wed: 22, Thu: 19, Fri: 35, Sat: 30, Sun: 28 },
    { time: "9AM", Mon: 58, Tue: 55, Wed: 68, Thu: 60, Fri: 75, Sat: 45, Sun: 42 },
    { time: "12PM", Mon: 85, Tue: 82, Wed: 88, Thu: 86, Fri: 95, Sat: 62, Sun: 58 },
    { time: "3PM", Mon: 70, Tue: 68, Wed: 75, Thu: 72, Fri: 80, Sat: 58, Sun: 55 },
    { time: "6PM", Mon: 95, Tue: 92, Wed: 92, Thu: 90, Fri: 100, Sat: 78, Sun: 75 },
    { time: "9PM", Mon: 50, Tue: 48, Wed: 52, Thu: 55, Fri: 70, Sat: 68, Sun: 65 },
  ],
  userMetrics: {
    repeatUserRate: 68,
    newUserRate: 32,
    monthlyData: [
      { month: "Aug", newUsers: 420, returningUsers: 1180 },
      { month: "Sep", newUsers: 520, returningUsers: 1380 },
      { month: "Oct", newUsers: 580, returningUsers: 1520 },
    ],
  },
};

export const analyticsApi = {
  async getAnalyticsData(): Promise<AnalyticsData> {
    try {
      // In production, this would be an actual API call
      // const response = await fetch(`${API_BASE_URL}/analytics`);
      // return await response.json();

      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockAnalyticsData;
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
      throw error;
    }
  },
};
