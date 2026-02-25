import { apiClient } from "@/lib/api/client";
import type {
  RunnerProfileStatistics,
  RunnerVerificationAndAvailabilityDto,
} from "@/lib/types";

export const runnerProfileService = {
  getStatistics(): Promise<RunnerProfileStatistics> {
    return apiClient.get("/runner-profile/statistics").then((r) => r.data);
  },

  setVerificationAndAvailability(
    body: RunnerVerificationAndAvailabilityDto
  ): Promise<unknown> {
    return apiClient
      .put("/runner-profile/verification-and-availability", body)
      .then((r) => r.data);
  },

  deleteProfile(userId: string): Promise<{ message: string }> {
    return apiClient.delete(`/runner-profile/${userId}`).then((r) => r.data);
  },
};
