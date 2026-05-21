import { Role } from "../types/roles.types";
import { adminService } from "@/lib/services";

export const rolesApi = {
  async getRoles(): Promise<Role[]> {
    try {
      const response = await adminService.getRoles();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      throw error;
    }
  },
};
