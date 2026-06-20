import { AdminRole } from "@/lib/types/enums";
import type { PermissionModule } from "@/lib/permissions/defaults";

/**
 * Backend returns `permissions` as a flat string array (e.g. `["finance.*", "tasks.view"]`,
 * `["*"]` for super admin). The shape is server-owned; the UI uses this list only to render
 * a summary. The `EditRolePermissionsModal` cannot actually edit per-module granularity
 * today — its 8-row module grid is built from `DEFAULT_PERMISSIONS` and ignores the role's
 * own permissions. A future ticket should swap the modal to drive from `Role.permissions`
 * once the backend exposes a per-module granularity endpoint.
 */
export interface Role {
  id: string;
  name: string;
  role?: AdminRole;
  description: string;
  permissionsSummary: string;
  color: "blue" | "green" | "orange" | "purple" | "gray";
  permissions?: string[];
  isSystem?: boolean;
}

export type { PermissionModule };
