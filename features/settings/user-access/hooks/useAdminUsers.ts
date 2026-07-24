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

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.settings.adminUsers() });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => userAccessApi.deleteAdminUser(id),
    onSuccess: () => void invalidate(),
  });

  const createMutation = useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      password: string;
      role: string;
    }) => userAccessApi.createAdminUser(data),
    onSuccess: () => void invalidate(),
  });

  const updateMutation = useMutation({
    mutationFn: (vars: {
      id: string;
      data: { role?: string; status?: string };
    }) => userAccessApi.updateAdminUser(vars.id, vars.data),
    onSuccess: () => void invalidate(),
  });

  return {
    users: data ?? EMPTY_USERS,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    deleteUser: (id: string) => {
      deleteMutation.mutate(id);
    },
    createUser: (data: {
      name: string;
      email: string;
      password: string;
      role: string;
    }) => createMutation.mutateAsync(data),
    updateUser: (id: string, data: { role?: string; status?: string }) =>
      updateMutation.mutateAsync({ id, data }),
    isDeleting: deleteMutation.isPending,
    refetch: () => {
      void refetch();
    },
  };
}
