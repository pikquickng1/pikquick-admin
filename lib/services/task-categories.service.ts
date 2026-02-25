import { apiClient } from "@/lib/api/client";
import type {
  TaskCategory,
  CreateTaskCategoryDto,
  UpdateTaskCategoryDto,
} from "@/lib/types";

export const taskCategoriesService = {
  list(): Promise<TaskCategory[]> {
    return apiClient.get("/task-categories").then((r) => r.data);
  },

  getById(id: string): Promise<TaskCategory> {
    return apiClient.get(`/task-categories/${id}`).then((r) => r.data);
  },

  create(body: CreateTaskCategoryDto): Promise<TaskCategory> {
    return apiClient.post("/task-categories", body).then((r) => r.data);
  },

  update(id: string, body: UpdateTaskCategoryDto): Promise<TaskCategory> {
    return apiClient.put(`/task-categories/${id}`, body).then((r) => r.data);
  },

  delete(id: string): Promise<void> {
    return apiClient.delete(`/task-categories/${id}`).then(() => {});
  },
};
