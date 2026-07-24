"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { rolesApi } from "../api/rolesApi";
import type { Role } from "../types/roles.types";
import type { DefaultPermission } from "@/lib/permissions/defaults";

const EMPTY_ROLES: Role[] = [];

export function useRoles() {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.settings.roles(),
    queryFn: () => rolesApi.getRoles(),
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: queryKeys.settings.roles() });

  const createMutation = useMutation({
    mutationFn: (payload: { name: string; permissions: DefaultPermission[] }) =>
      rolesApi.createRole(payload),
    onSuccess: () => void invalidate(),
  });

  const updatePermissionsMutation = useMutation({
    mutationFn: (vars: { id: string; permissions: DefaultPermission[] }) =>
      rolesApi.updateRolePermissions(vars.id, vars.permissions),
    onSuccess: () => void invalidate(),
  });

  return {
    roles: data ?? EMPTY_ROLES,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    createRole: (payload: { name: string; permissions: DefaultPermission[] }) =>
      createMutation.mutateAsync(payload),
    updateRolePermissions: (id: string, permissions: DefaultPermission[]) =>
      updatePermissionsMutation.mutateAsync({ id, permissions }),
    refetch: () => {
      void refetch();
    },
  };
}
