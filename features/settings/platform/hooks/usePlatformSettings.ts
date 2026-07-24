"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { platformSettingsApi } from "../api/platformSettingsApi";
import type {
  PlatformSettingsData,
  TaskCategory,
} from "../types/platform-settings.types";

const DEFAULT_SETTINGS: PlatformSettingsData = { accessFee: 0, platformCommission: 0 };

export function usePlatformSettings() {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: queryKeys.settings.platform(),
    queryFn: () => platformSettingsApi.getSettings(),
  });

  const categoriesQuery = useQuery({
    queryKey: queryKeys.settings.taskCategories(),
    queryFn: () => platformSettingsApi.getTaskCategories(),
  });

  const updateMutation = useMutation({
    mutationFn: (next: PlatformSettingsData) => platformSettingsApi.updateSettings(next),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.settings.platform() });
    },
  });

  const invalidateCategories = () =>
    queryClient.invalidateQueries({
      queryKey: queryKeys.settings.taskCategories(),
    });

  const addCategoryMutation = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      platformSettingsApi.addTaskCategory(data as Omit<TaskCategory, "id">),
    onSuccess: () => void invalidateCategories(),
  });

  const updateCategoryMutation = useMutation({
    mutationFn: (vars: { id: string; data: Partial<TaskCategory> }) =>
      platformSettingsApi.updateTaskCategory(vars.id, vars.data),
    onSuccess: () => void invalidateCategories(),
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => platformSettingsApi.deleteTaskCategory(id),
    onSuccess: () => void invalidateCategories(),
  });

  return {
    settings: settingsQuery.data ?? DEFAULT_SETTINGS,
    categories: categoriesQuery.data ?? ([] as TaskCategory[]),
    loading: settingsQuery.isLoading || categoriesQuery.isLoading,
    error:
      (settingsQuery.error instanceof Error ? settingsQuery.error.message : null) ??
      (categoriesQuery.error instanceof Error ? categoriesQuery.error.message : null),
    updateSettings: (next: PlatformSettingsData) => {
      updateMutation.mutate(next);
    },
    isUpdating: updateMutation.isPending,
    addCategory: (data: { name: string; description: string }) =>
      addCategoryMutation.mutateAsync(data),
    updateCategory: (id: string, data: Partial<TaskCategory>) =>
      updateCategoryMutation.mutateAsync({ id, data }),
    deleteCategory: (id: string) => deleteCategoryMutation.mutateAsync(id),
    refetch: () => {
      void settingsQuery.refetch();
      void categoriesQuery.refetch();
    },
  };
}
