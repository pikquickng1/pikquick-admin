"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { userAccessApi } from "../api/userAccessApi";
import type { AdminUser } from "../types/user-access.types";

const EMPTY_USERS: AdminUser[] = [];

export function useAdminUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.settings.adminUsers(),
    queryFn: () => userAccessApi.getAdminUsers(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userAccessApi.deleteAdminUser(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.settings.adminUsers() });
    },
  });

  return {
    users: data ?? EMPTY_USERS,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    deleteUser: (id: string) => {
      deleteMutation.mutate(id);
    },
    isDeleting: deleteMutation.isPending,
    refetch: () => {
      void refetch();
    },
  };
}
