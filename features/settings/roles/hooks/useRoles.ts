"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { rolesApi } from "../api/rolesApi";
import type { Role } from "../types/roles.types";

const EMPTY_ROLES: Role[] = [];

export function useRoles() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.settings.roles(),
    queryFn: () => rolesApi.getRoles(),
  });

  return {
    roles: data ?? EMPTY_ROLES,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}
