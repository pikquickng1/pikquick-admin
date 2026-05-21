import { PlatformSettings, TaskCategory } from "../types/platform-settings.types";
import { adminService } from "@/lib/services";

export const platformSettingsApi = {
  getSettings: async (): Promise<PlatformSettings> => {
    try {
      const response = await adminService.getPlatformSettings();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch platform settings:", error);
      throw error;
    }
  },

  updateSettings: async (settings: PlatformSettings): Promise<void> => {
    try {
      await adminService.updatePlatformSettings(settings as unknown as Record<string, unknown>);
    } catch (error) {
      console.error("Failed to update platform settings:", error);
      throw error;
    }
  },

  getTaskCategories: async (): Promise<TaskCategory[]> => {
    try {
      const response = await adminService.getTaskCategories();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch task categories:", error);
      throw error;
    }
  },

  addTaskCategory: async (category: Omit<TaskCategory, "id">): Promise<void> => {
    try {
      await adminService.addTaskCategory(category);
    } catch (error) {
      console.error("Failed to add task category:", error);
      throw error;
    }
  },

  updateTaskCategory: async (id: string, category: Partial<TaskCategory>): Promise<void> => {
    try {
      await adminService.updateTaskCategory(id, category);
    } catch (error) {
      console.error("Failed to update task category:", error);
      throw error;
    }
  },

  deleteTaskCategory: async (id: string): Promise<void> => {
    try {
      await adminService.deleteTaskCategory(id);
    } catch (error) {
      console.error("Failed to delete task category:", error);
      throw error;
    }
  },
};
