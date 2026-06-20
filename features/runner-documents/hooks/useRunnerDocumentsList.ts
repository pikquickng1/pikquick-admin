"use client";

import { useQuery } from "@tanstack/react-query";
import { runnerDocumentsService } from "@/lib/services";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import { queryKeys } from "@/lib/query/keys";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { ALL_FILTER, DocumentVerificationStatus } from "@/lib/types/enums";
import { statusToApi } from "@/lib/utils/status";
import type { RunnerDocumentFilters } from "../types/runner-document.types";
import { MOCK_RUNNER_DOCUMENTS } from "../types/runner-documents.mock";

const LIMIT = DEFAULT_PAGE_SIZE;
const MOCK_DELAY_MS = 250;

export function useRunnerDocumentsList(filters: RunnerDocumentFilters, page: number = 1) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.runnerDocuments.list({
      page,
      limit: LIMIT,
      search: filters.search,
      verification_status: filters.status === ALL_FILTER ? undefined : filters.status,
      document_type_id: filters.document_type_id,
    }),
    queryFn: async () => {
      if (USE_MOCKS) {
        await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS));
        return MOCK_RUNNER_DOCUMENTS;
      }
      return runnerDocumentsService.list({
        page,
        limit: LIMIT,
        search: filters.search,
        verification_status: statusToApi(filters.status) as DocumentVerificationStatus | undefined,
        document_type_id: filters.document_type_id,
      });
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
