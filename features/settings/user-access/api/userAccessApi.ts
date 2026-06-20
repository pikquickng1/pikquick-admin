import type { AdminUser } from "../types/user-access.types";
import { adminService } from "@/lib/services/admin.service";

export const userAccessApi = {
  async getAdminUsers(): Promise<AdminUser[]> {
    return (await adminService.getAdminUsers()) as AdminUser[];
  },

  async deleteAdminUser(id: string): Promise<void> {
    await adminService.deleteAdminUser(id);
  },
};
