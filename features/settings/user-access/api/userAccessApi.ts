import type { AdminUser } from "../types/user-access.types";
import { adminService } from "@/lib/services/admin.service";

export const userAccessApi = {
  async getAdminUsers(): Promise<AdminUser[]> {
    const res = (await adminService.getAdminUsers()) as
      | AdminUser[]
      | { data?: AdminUser[] };
    // Tolerate both the flat array and the legacy { data: [...] } wrapper.
    return Array.isArray(res) ? res : (res?.data ?? []);
  },

  async createAdminUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }): Promise<void> {
    // NOTE: the backend persists admins with role='admin'; the granular admin
    // sub-role (Super/Finance/…) is not stored server-side yet.
    await adminService.createAdminUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  },

  async updateAdminUser(
    id: string,
    data: { role?: string; status?: string },
  ): Promise<void> {
    await adminService.updateAdminUser(id, { status: data.status });
  },

  async deleteAdminUser(id: string): Promise<void> {
    await adminService.deleteAdminUser(id);
  },
};
