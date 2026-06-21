"use client";

import { useQuery } from "@tanstack/react-query";
import { runnerDocumentsService } from "@/lib/services";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import { queryKeys } from "@/lib/query/keys";
import { ALL_FILTER, DocumentVerificationStatus } from "@/lib/types/enums";
import { statusToApi } from "@/lib/utils/status";
import type { RunnerDocumentFilters } from "../types/runner-document.types";
import { MOCK_RUNNER_DOCUMENTS } from "../types/runner-documents.mock";

const MOCK_DELAY_MS = 250;

export function useRunnerDocumentsList(filters: RunnerDocumentFilters, page: number = 1) {
  const verificationStatus =
    filters.status === ALL_FILTER
      ? undefined
      : (statusToApi(filters.status) as DocumentVerificationStatus | undefined);

  const params = {
    search: filters.search || undefined,
    verification_status: verificationStatus,
    document_type_id: filters.document_type_id || undefined,
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.runnerDocuments.list({ page, ...params }),
    queryFn: async () => {
      if (USE_MOCKS) {
        await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
        return MOCK_RUNNER_DOCUMENTS;
      }
      return runnerDocumentsService.list(params);
    },
  });

  const documents = (data as unknown as { data?: unknown[] })?.data ??
    (Array.isArray(data) ? data : []) ??
    [];
  const total =
    (data as unknown as { total?: number })?.total ??
    (Array.isArray(documents) ? documents.length : 0);

  return {
    documents,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    total,
    refetch: () => {
      void refetch();
    },
  };
}
