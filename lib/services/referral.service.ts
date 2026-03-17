/**
 * Referral admin service. Backend: /admin/referral endpoints.
 */

import { apiClient } from "@/lib/api/client";
import type {
  ReferralSettingsResponse,
  UpdateReferralSettingsDto,
  ReferralOverviewParams,
  ReferralOverviewResponse,
  ReferralRecordsParams,
  ReferralRecordsResponse,
  ReferralRecordDetailResponse,
  EliteReviewListParams,
  EliteReviewListResponse,
  EliteReviewApproveDto,
  EliteReviewRejectDto,
  EliteRewardResponse,
  PayoutRewardResponse,
} from "@/lib/types";

export const referralService = {
  getSettings(): Promise<ReferralSettingsResponse> {
    return apiClient.get("/admin/referral/settings").then((r) => r.data);
  },

  updateSettings(
    body: UpdateReferralSettingsDto
  ): Promise<ReferralSettingsResponse> {
    return apiClient
      .post("/admin/referral/settings", body)
      .then((r) => r.data);
  },

  getOverview(
    params?: ReferralOverviewParams
  ): Promise<ReferralOverviewResponse> {
    return apiClient
      .get("/admin/referral/overview", { params })
      .then((r) => r.data);
  },

  getRecords(
    params?: ReferralRecordsParams
  ): Promise<ReferralRecordsResponse> {
    return apiClient
      .get("/admin/referral/records", { params })
      .then((r) => r.data);
  },

  getRecordById(id: string): Promise<ReferralRecordDetailResponse> {
    return apiClient
      .get(`/admin/referral/records/${id}`)
      .then((r) => r.data);
  },

  getEliteReview(
    params?: EliteReviewListParams
  ): Promise<EliteReviewListResponse> {
    return apiClient
      .get("/admin/referral/elite-review", { params })
      .then((r) => r.data);
  },

  approveEliteReward(
    id: string,
    body?: EliteReviewApproveDto
  ): Promise<EliteRewardResponse> {
    return apiClient
      .post(`/admin/referral/elite-review/${id}/approve`, body)
      .then((r) => r.data);
  },

  rejectEliteReward(
    id: string,
    body: EliteReviewRejectDto
  ): Promise<EliteRewardResponse> {
    return apiClient
      .post(`/admin/referral/elite-review/${id}/reject`, body)
      .then((r) => r.data);
  },

  payoutReward(id: string): Promise<PayoutRewardResponse> {
    return apiClient
      .post(`/admin/referral/rewards/${id}/payout`)
      .then((r) => r.data);
  },
};
