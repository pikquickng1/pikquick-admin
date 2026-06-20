"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { notificationsApi } from "../api/notificationsApi";
import type { AdminNotificationLogItem, CreateNotificationPayload } from "../types/notifications.types";

const EMPTY_LOG: AdminNotificationLogItem[] = [];

export function useNotificationsLog(params: { page: number; limit: number }) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.settings.notificationsLog(params),
    queryFn: () => notificationsApi.getNotificationsLog(params),
  });

  return {
    notifications: data?.notifications ?? EMPTY_LOG,
    loading: isLoading,
    total: data?.total ?? 0,
    page: data?.page ?? params.page,
    totalPages: data?.totalPages ?? 1,
    error: error instanceof Error ? error.message : null,
    refetch: () => {
      void refetch();
    },
  };
}

export function useCreateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateNotificationPayload) =>
      notificationsApi.createNotification(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: [...queryKeys.settings.all, "notifications-log"],
      });
    },
  });
}
