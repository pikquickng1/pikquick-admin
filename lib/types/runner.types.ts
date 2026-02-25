/**
 * Runners admin & runner-profile admin API types
 */

export interface ManualDeductionResultDto {
  processed: number;
  successful: number;
  failed: number;
  message: string;
}

export interface RunnerSubscription {
  id: string;
  userId: string;
  isSubscribed: boolean;
  subscribedAt: string;
  lastDeductionAt: string | null;
  lastDeductionAmount: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface RunnerSubscriptionStats {
  totalSubscribed: number;
  totalUnsubscribed: number;
  recentSubscriptions: RunnerSubscription[];
}

export interface RunnerProfileStatistics {
  total_runners: number;
  verified_runners: number;
  available_runners: number;
  average_trust_score: number;
  transportModeDistribution: Array<{ transport_mode: string; count: number }>;
}

export interface RunnerVerificationAndAvailabilityDto {
  userId: string;
  is_available: boolean;
  status: "verified" | "unverified";
  reason?: string;
}
