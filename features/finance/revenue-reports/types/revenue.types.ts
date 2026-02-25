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
  period: string;
  location: string;
}
