"use client";

import { useState, useEffect } from "react";
import { Task } from "../types/task.types";
import { taskApi } from "../api/taskApi";

export function useTask(id: string) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTaskData = async () => {
    try {
      setLoading(true);
      const taskData = await taskApi.getTaskById(id);
      setTask(taskData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch task data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchTaskData();
    }
  }, [id]);

  return { task, loading, error, refetch: fetchTaskData };
}
