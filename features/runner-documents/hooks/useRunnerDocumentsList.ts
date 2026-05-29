"use client";

import { useState, useEffect } from "react";
import { runnerDocumentsService } from "@/lib/services";
import type { RunnerDocument, RunnerDocumentFilterParams } from "@/lib/types";

export function useRunnerDocumentsList(
  filters: RunnerDocumentFilterParams = {},
  page = 1,
  pageSize = 10,
) {
  const [documents, setDocuments] = useState<RunnerDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const { verification_status, document_type_id, search = "" } = filters;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        // Only include defined filter parameters
        const params: Partial<RunnerDocumentFilterParams>  = {};
        if (verification_status)
          params.verification_status = verification_status;
        if (document_type_id) params.document_type_id = document_type_id;
        if (search) params.search = search;

        const response = await runnerDocumentsService.list(params);

        if (Array.isArray(response)) {
          setDocuments(response);
          setTotal(response.length);
        } else if (response && "data" in response) {
          setDocuments((response as { data: RunnerDocument[] }).data);
          setTotal((response as { total: number }).total);
        }
        setError(null);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch runner documents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [verification_status, document_type_id, search, page, pageSize]);
  return { documents, loading, total, error };
}
