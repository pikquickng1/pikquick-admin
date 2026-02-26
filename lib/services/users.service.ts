import { apiClient } from "@/lib/api/client";
import type {
  AdminUser,
  AdminUsersListParams,
  PaginatedResponse,
} from "@/lib/types";

export const usersService = {
  list(params?: AdminUsersListParams): Promise<PaginatedResponse<AdminUser>> {
    return apiClient.get("/admin/users", { params }).then((r) => r.data);
  },

  getById(id: string): Promise<AdminUser> {
    return apiClient.get(`/admin/users/${id}`).then((r) => r.data);
  },
};
