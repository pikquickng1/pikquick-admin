import type { Role } from "../types/roles.types";
import { adminService } from "@/lib/services/admin.service";

export const rolesApi = {
  async getRoles(): Promise<Role[]> {
    return (await adminService.getRoles()) as Role[];
  },
};
