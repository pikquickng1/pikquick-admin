"use client";

import { useState, useEffect } from "react";
import { TaskListItem, TaskListFilters } from "../types/task.types";
import { taskApi } from "../api/taskApi";

export function useTaskList(filters: TaskListFilters, page: number = 1) {
  const [tasks, setTasks] = useState<TaskListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await taskApi.getTasksList(filters, page);
        setTasks(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [filters.search, filters.status, filters.sortBy, page]);

  return { tasks, loading, error, pagination };
}
