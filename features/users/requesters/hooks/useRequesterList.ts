"use client";

import { useState, useEffect } from "react";
import { RequesterListItem, RequesterListFilters } from "../types/requester-list.types";
import { requesterApi } from "../api/requesterApi";

export function useRequesterList(filters: RequesterListFilters, page: number = 1) {
  const [requesters, setRequesters] = useState<RequesterListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchRequesters = async () => {
      try {
        setLoading(true);
        const response = await requesterApi.getRequestersList(filters, page);
        setRequesters(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch requesters");
      } finally {
        setLoading(false);
      }
    };

    fetchRequesters();
  }, [filters.search, filters.status, filters.sortBy, page]);

  return { requesters, loading, error, pagination };
}
