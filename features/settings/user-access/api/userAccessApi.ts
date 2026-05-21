import { AdminUser } from "../types/user-access.types";
import { adminService } from "@/lib/services";

export const userAccessApi = {
  async getAdminUsers(): Promise<AdminUser[]> {
    try {
      const response = await adminService.getAdminUsers();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
      throw error;
    }
  },

  async deleteAdminUser(id: string): Promise<void> {
    try {
      await adminService.deleteAdminUser(id);
    } catch (error) {
      console.error("Failed to delete admin user:", error);
      throw error;
    }
  },
};
