import { UserStatus } from "@/lib/types/enums";

/**
 * Display label for an admin user's role.
 *
 * Mirrors the UI labels ("Super Admin", "Finance Admin", etc.). The backend
 * `AdminRole` enum stores these as snake_case (`super_admin`, ...) — see
 * `ADMIN_ROLE_OPTIONS` and `adminRoleLabel()` for the lowercase ↔ display
 * mapping.
 */
export type AdminUserRoleLabel =
  | "Super Admin"
  | "Finance Admin"
  | "Support Admin"
  | "Operations Admin";

export type AdminUserStatusLabel = "Active" | "Inactive";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminUserRoleLabel;
  status: AdminUserStatusLabel | UserStatus;
  lastLogin: string;
  avatar?: string;
}

export interface UserAccessFilters {
  search: string;
  role: AdminUserRoleLabel | "All Roles";
  status: AdminUserStatusLabel | "All Status";
}

export const DEFAULT_USER_ACCESS_FILTERS: UserAccessFilters = {
  search: "",
  role: "All Roles",
  status: "All Status",
};
