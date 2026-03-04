"use client";

import { useState, useEffect } from "react";
import { Notification, NotificationListResponse } from "../types/notifications.types";
import { notificationsApi } from "../api/notificationsApi";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 8;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await notificationsApi.getNotifications({ page, limit });
        setNotifications(response.notifications);
        setTotalPages(response.totalPages);
        setTotal(response.total);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [page]);

  return {
    notifications,
    loading,
    page,
    setPage,
    totalPages,
    total,
    limit,
  };
}
