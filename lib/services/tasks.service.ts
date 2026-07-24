import { apiClient } from "@/lib/api/client";
import type {
  AdminTask,
  AdminTaskListParams,
  AdminTasksListResponse,
  AdminTaskStats,
  CreateTaskDto,
  UpdateTaskDto,
  CancelTaskDto,
  TaskReassignDto,
  ReportedIssue,
} from "@/lib/types";

export const tasksService = {
  listAll(params?: AdminTaskListParams): Promise<AdminTasksListResponse> {
    return apiClient.get("/tasks", { params: { ...params, scope: "all" } }).then((r) => r.data);
  },

  getById(id: string): Promise<AdminTask> {
    return apiClient.get(`/tasks/${id}`).then((r) => r.data);
  },

  create(body: CreateTaskDto): Promise<AdminTask> {
    return apiClient.post("/tasks", body).then((r) => r.data);
  },

  update(id: string, body: UpdateTaskDto): Promise<AdminTask> {
    return apiClient.put(`/tasks/${id}`, body).then((r) => r.data);
  },

  updateStatus(id: string, status: string): Promise<AdminTask> {
    return apiClient.put(`/tasks/${id}/status`, { status }).then((r) => r.data);
  },

  startTask(id: string): Promise<AdminTask> {
    return apiClient.put(`/tasks/${id}/start`, {}).then((r) => r.data);
  },

  completeTask(id: string): Promise<AdminTask> {
    return apiClient.post(`/tasks/${id}/complete`, {}).then((r) => r.data);
  },

  cancelTask(taskIds: string[], body: CancelTaskDto): Promise<{ message: string; cancelled: number }> {
    return apiClient.put("/tasks/cancel", { task_ids: taskIds, ...body }).then((r) => r.data);
  },

  reassignTask(id: string, body: TaskReassignDto): Promise<{ message: string; task_id: string; old_runner_id?: string; new_runner_id: string }> {
    return apiClient.post(`/tasks/${id}/reassign`, body).then((r) => r.data);
  },

  approveCompletion(id: string): Promise<AdminTask> {
    return apiClient.post(`/tasks/${id}/approve-completion`, {}).then((r) => r.data);
  },

  confirmCompletion(id: string): Promise<AdminTask> {
    return apiClient.post(`/tasks/${id}/confirm-completion`, {}).then((r) => r.data);
  },

  restartTask(id: string): Promise<AdminTask> {
    return apiClient.put(`/tasks/${id}/restart`, {}).then((r) => r.data);
  },

  getAllReportedIssues(): Promise<ReportedIssue[]> {
    return apiClient.get("/tasks/admin/all-reported-issues").then((r) => r.data);
  },

  getStats(): Promise<AdminTaskStats> {
    return apiClient.get("/tasks/admin/stats").then((r) => r.data);
  },

  refund(id: string, amount: number, reason?: string): Promise<{ message: string; task_id: string; amount: number }> {
    return apiClient.post(`/tasks/${id}/refund`, { amount, reason }).then((r) => r.data);
  },
};
