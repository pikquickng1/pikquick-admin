/**
 * Tasks admin API types (GET /tasks/admin/all, reported issues)
 */

import type { PaginatedResponse } from "./common.types";

export interface AdminTaskListParams {
  status?: string;
  runner_id?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  search?: string;
}

// Same shape as TaskResponseDto; extend with full fields from BE as needed
export interface AdminTask {
  id: string;
  description?: string;
  budget?: number;
  task_type?: string;
  status: string;
  client_id?: string;
  client_name?: string;
  runner_id?: string;
  runner_name?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export type AdminTasksListResponse = PaginatedResponse<AdminTask>;

/** Reported issue (task_proof_submissions where status = issue_reported) */
export interface ReportedIssue {
  id: string;
  task_id: string;
  runner_id: string;
  proof_urls: string[];
  notes: string | null;
  submitted_at: string;
  status: string;
  acknowledged_at: string | null;
  issue_type: string | null;
  issue_notes: string | null;
  issue_reported_at: string | null;
  created_at: string;
  updated_at: string;
}
