/**
 * Admin users API types (GET /admin/users, GET /admin/users/:id)
 */

import type { UserRole, UserStatus } from "./enums";

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface AdminUsersListParams {
  page?: number;
  limit?: number;
  role?: string;
  status?: string;
  search?: string;
}
