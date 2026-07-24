import type { Role } from "../types/roles.types";
import type { DefaultPermission } from "@/lib/permissions/defaults";
import { adminService } from "@/lib/services/admin.service";

/** Flattens the per-module permission grid into the backend's string list. */
export function toPermissionStrings(perms: DefaultPermission[]): string[] {
  const out: string[] = [];
  for (const p of perms) {
    const mod = p.module.toLowerCase();
    if (p.view) out.push(`${mod}.view`);
    if (p.edit) out.push(`${mod}.edit`);
    if (p.delete) out.push(`${mod}.delete`);
    if (p.configure) out.push(`${mod}.configure`);
  }
  return out;
}

export const rolesApi = {
  async getRoles(): Promise<Role[]> {
    return (await adminService.getRoles()) as Role[];
  },

  async createRole(data: {
    name: string;
    permissions: DefaultPermission[];
  }): Promise<void> {
    await adminService.createRole({
      name: data.name,
      permissions: toPermissionStrings(data.permissions),
    });
  },

  async updateRolePermissions(
    id: string,
    permissions: DefaultPermission[],
  ): Promise<void> {
    await adminService.updateRole(id, {
      permissions: toPermissionStrings(permissions),
    });
  },

  async deleteRole(id: string): Promise<void> {
    await adminService.deleteRole(id);
  },
};
