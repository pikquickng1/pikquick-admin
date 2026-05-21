/**
 * Tasks admin API types (GET /tasks/admin/all, reported issues)
 */

import type { PaginatedResponse } from "./common.types";

export interface AddressDto {
  address: string;
  city: string;
  state: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export type PaymentType = "card" | "wallet";

export interface CreateTaskDto {
  runner_id?: string | null;
  task_type: string;
  pickup_address: AddressDto;
  dropoff_address: AddressDto;
  description?: string;
  budget: number;
  payment_method: PaymentType;
  special_instructions?: string;
  additional_notes?: string;
  category_id: string;
  require_proof_of_completion?: boolean;
  preferred_transport_mode?: string;
  client_id?: string;
  starting_price?: number;
  bidding_end_time: string;
}

export interface UpdateTaskDto {
  description?: string;
  budget?: number;
  task_type?: string;
  special_instructions?: string;
  additional_notes?: string;
}

export interface CancelTaskDto {
  reason: string;
}

export interface TaskReassignDto {
  runner_id: string;
  reason?: string;
}

export interface AdminTaskListParams {
  status?: string;
  runner_id?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  limit?: number;
  search?: string;
  scope?: string;
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
  pickup_address?: AddressDto;
  dropoff_address?: AddressDto;
  category_id?: string;
  category_name?: string;
  payment_method?: string;
  special_instructions?: string;
  additional_notes?: string;
  require_proof_of_completion?: boolean;
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
