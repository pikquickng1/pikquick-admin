import { apiClient } from "@/lib/api/client";
import type {
  EscrowStatisticsResponse,
  EscrowReleaseResponse,
  EscrowProcessReleasesResponse,
} from "@/lib/types";

export const escrowService = {
  getStatistics(): Promise<EscrowStatisticsResponse> {
    return apiClient.get("/escrow/admin/statistics").then((r) => r.data);
  },

  release(transactionId: string, reason: string): Promise<EscrowReleaseResponse> {
    return apiClient
      .post(`/escrow/admin/release/${transactionId}`, { reason })
      .then((r) => r.data);
  },

  processReleases(): Promise<EscrowProcessReleasesResponse> {
    return apiClient.post("/escrow/admin/process-releases").then((r) => r.data);
  },
};
