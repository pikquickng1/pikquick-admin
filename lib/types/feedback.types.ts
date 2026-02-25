/**
 * Feedback admin API types
 */

export interface FeedbackItem {
  id: string;
  full_name: string;
  email: string;
  message: string;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeedbackListParams {
  page?: number;
  limit?: number;
  archived?: boolean;
}

export interface FeedbackListResponse {
  data: FeedbackItem[];
  total: number;
  page: number;
  limit: number;
}
