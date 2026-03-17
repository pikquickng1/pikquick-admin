import { apiClient } from "@/lib/api/client";
import type {
  AdminTask,
  AdminTaskListParams,
  AdminTasksListResponse,
  ReportedIssue,
} from "@/lib/types";

export const tasksService = {
  listAll(params?: AdminTaskListParams): Promise<AdminTasksListResponse> {
    return apiClient.get("/tasks", { params: { ...params, scope: "all" } }).then((r) => r.data);
  },

  getAllReportedIssues(): Promise<ReportedIssue[]> {
    return apiClient.get("/tasks/admin/all-reported-issues").then((r) => r.data);
  },
};
