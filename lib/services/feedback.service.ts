import { apiClient } from "@/lib/api/client";
import type {
  FeedbackItem,
  FeedbackListParams,
  FeedbackListResponse,
} from "@/lib/types";

export const feedbackService = {
  list(params?: FeedbackListParams): Promise<FeedbackListResponse> {
    return apiClient.get("/feedback", { params }).then((r) => r.data);
  },

  getById(id: string): Promise<FeedbackItem> {
    return apiClient.get(`/feedback/${id}`).then((r) => r.data);
  },

  archive(id: string): Promise<FeedbackItem> {
    return apiClient.patch(`/feedback/${id}/archive`).then((r) => r.data);
  },

  unarchive(id: string): Promise<FeedbackItem> {
    return apiClient.patch(`/feedback/${id}/unarchive`).then((r) => r.data);
  },

  delete(id: string): Promise<void> {
    return apiClient.delete(`/feedback/${id}`).then(() => {});
  },
};
