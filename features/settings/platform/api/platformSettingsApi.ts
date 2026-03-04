import { PlatformSettings, TaskCategory } from "../types/platform-settings.types";

export const platformSettingsApi = {
  getSettings: async (): Promise<PlatformSettings> => {
    // Mock API call
    return {
      accessFee: 100,
      platformCommission: 15,
    };
  },

  updateSettings: async (settings: PlatformSettings): Promise<void> => {
    // Mock API call
    console.log("Updating platform settings:", settings);
  },

  getTaskCategories: async (): Promise<TaskCategory[]> => {
    // Mock API call
    return [
      {
        id: "1",
        name: "Delivery",
        description: "Package and parcel delivery services",
      },
      {
        id: "2",
        name: "Food Delivery",
        description: "Food and beverage delivery",
      },
      {
        id: "3",
        name: "Errand",
        description: "General errand running tasks",
      },
      {
        id: "4",
        name: "Shopping",
        description: "Shopping and purchase tasks",
      },
    ];
  },

  addTaskCategory: async (category: Omit<TaskCategory, "id">): Promise<void> => {
    // Mock API call
    console.log("Adding task category:", category);
  },

  updateTaskCategory: async (id: string, category: Partial<TaskCategory>): Promise<void> => {
    // Mock API call
    console.log("Updating task category:", id, category);
  },

  deleteTaskCategory: async (id: string): Promise<void> => {
    // Mock API call
    console.log("Deleting task category:", id);
  },
};
