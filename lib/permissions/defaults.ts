/**
 * Centralized default permissions for admin roles.
 *
 * Previously duplicated in:
 * - features/settings/roles/components/CreateRoleModal.tsx:28-37
 * - features/settings/roles/components/EditRolePermissionsModal.tsx:30-39
 *
 * Both files had byte-identical 8×4 arrays. `EditRolePermissionsModal`
 * had a misleading "Different default permissions based on role" comment
 * even though the function ignored its `role` argument — confirmed bug.
 *
 * Use `DEFAULT_PERMISSIONS` as the single source. Role-specific overrides
 * (if needed later) should live in this file too, not in components.
 */

export type PermissionModule =
  | "Finance"
  | "Compliance"
  | "Support"
  | "Operations"
  | "Analytics"
  | "Settings"
  | "Notifications"
  | "KYC";

export interface DefaultPermission {
  module: PermissionModule;
  view: boolean;
  edit: boolean;
  delete: boolean;
  configure: boolean;
}

export const PERMISSION_MODULES: PermissionModule[] = [
  "Finance",
  "Compliance",
  "Support",
  "Operations",
  "Analytics",
  "Settings",
  "Notifications",
  "KYC",
];

export const DEFAULT_PERMISSIONS: DefaultPermission[] = [
  { module: "Finance",       view: true,  edit: true,  delete: false, configure: true  },
  { module: "Compliance",    view: true,  edit: true,  delete: true,  configure: true  },
  { module: "Support",       view: true,  edit: true,  delete: false, configure: false },
  { module: "Operations",    view: true,  edit: true,  delete: false, configure: false },
  { module: "Analytics",     view: true,  edit: false, delete: false, configure: false },
  { module: "Settings",      view: true,  edit: true,  delete: true,  configure: true  },
  { module: "Notifications", view: true,  edit: true,  delete: false, configure: true  },
  { module: "KYC",           view: true,  edit: true,  delete: false, configure: false },
];

export function getDefaultPermissions(): DefaultPermission[] {
  return DEFAULT_PERMISSIONS.map((p) => ({ ...p }));
}
