import { apiClient } from "@/lib/api/client";
import type {
  RunnerDocument,
  RunnerDocumentFilterParams,
  RunnerVerificationSummary,
  VerifyRunnerDocumentDto,
} from "@/lib/types";

export const runnerDocumentsService = {
  list(params?: RunnerDocumentFilterParams): Promise<RunnerDocument[]> {
    return apiClient.get("/runner-documents", { params }).then((r) => r.data);
  },

  getPending(): Promise<RunnerDocument[]> {
    return apiClient.get("/runner-documents/pending").then((r) => r.data);
  },

  getByRunnerId(runnerId: string): Promise<RunnerDocument[]> {
    return apiClient
      .get(`/runner-documents/runner/${runnerId}`)
      .then((r) => r.data);
  },

  getVerificationStatus(runnerId: string): Promise<RunnerVerificationSummary> {
    return apiClient
      .get(`/runner-documents/runner/${runnerId}/verification-status`)
      .then((r) => r.data);
  },

  verify(id: string, body: VerifyRunnerDocumentDto): Promise<RunnerDocument> {
    return apiClient
      .put(`/runner-documents/${id}/verify`, body)
      .then((r) => r.data);
  },
};
