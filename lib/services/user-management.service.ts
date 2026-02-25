/**
 * Legacy admin user management (base path /user).
 * Controller: UserController admin-only methods.
 */

import { apiClient } from "@/lib/api/client";
import type { UserRole } from "@/lib/types";

export const userManagementService = {
  updateRole(id: string, role: UserRole): Promise<unknown> {
    return apiClient.put(`/user/role/${id}`, { role }).then((r) => r.data);
  },

  clearCacheById(userId: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/user/cache/by-id/${userId}`).then((r) => r.data);
  },

  clearCacheByEmail(email: string): Promise<{ success: boolean }> {
    return apiClient.delete(`/user/cache/by-email/${encodeURIComponent(email)}`).then((r) => r.data);
  },

  softDelete(id: string): Promise<{ message: string }> {
    return apiClient.delete(`/user/${id}`).then((r) => r.data);
  },
};
