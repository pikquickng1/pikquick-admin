"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { notificationsApi } from "../api/notificationsApi";
import type { AdminNotification } from "../types/notifications.types";

export function useNotifications() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: queryKeys.notifications.list(),
    queryFn: () => notificationsApi.getNotifications(),
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.list() });
      const previous = queryClient.getQueryData<NotificationsShape>(queryKeys.notifications.list());
      queryClient.setQueryData<NotificationsShape>(queryKeys.notifications.list(), (old) =>
        old
          ? {
              notifications: old.notifications.map((n) =>
                n.id === id ? { ...n, isNew: false } : n,
              ),
              unreadCount: Math.max(0, old.unreadCount - 1),
            }
          : old,
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKeys.notifications.list(), ctx.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list() });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKeys.notifications.list() });
      const previous = queryClient.getQueryData<NotificationsShape>(queryKeys.notifications.list());
      queryClient.setQueryData<NotificationsShape>(queryKeys.notifications.list(), (old) =>
        old
          ? {
              notifications: old.notifications.map((n) => ({ ...n, isNew: false })),
              unreadCount: 0,
            }
          : old,
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(queryKeys.notifications.list(), ctx.previous);
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list() });
    },
  });

  return {
    notifications: data?.notifications ?? ([] as AdminNotification[]),
    unreadCount: data?.unreadCount ?? 0,
    loading: isLoading,
    markAsRead: (id: string) => {
      markAsReadMutation.mutate(id);
    },
    markAllAsRead: () => {
      markAllAsReadMutation.mutate();
    },
    refetch: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.notifications.list() });
    },
  };
}

type NotificationsShape = {
  notifications: AdminNotification[];
  unreadCount: number;
};
