import { apiClient } from "@/lib/api/client";

export interface RunnerReview {
  id: string;
  runner_id: string;
  runner_name?: string;
  client_id: string;
  client_name?: string;
  task_id: string;
  rating: number;
  review?: string;
  created_at: string;
  updated_at: string;
}

export interface RunnerRatingSummary {
  runner_id: string;
  average_rating: number;
  total_reviews: number;
  rating_breakdown: Record<string, number>;
}

export const reviewsService = {
  getRunnerReviews(runnerId: string): Promise<RunnerReview[]> {
    return apiClient
      .get(`/reviews/runners/runner/${runnerId}`)
      .then((r) => r.data);
  },

  getRunnerRatingSummary(runnerId: string): Promise<RunnerRatingSummary> {
    return apiClient
      .get(`/reviews/runners/runner/${runnerId}/summary`)
      .then((r) => r.data);
  },
};
