/**
 * Task categories admin API types
 */

export interface TaskCategory {
  id: string;
  name: string;
  description?: string;
  category_image?: string;
  [key: string]: unknown;
}

export interface CreateTaskCategoryDto {
  name: string;
  description?: string;
  category_image?: string;
}

export interface UpdateTaskCategoryDto {
  name?: string;
  description?: string;
  category_image?: string;
}
