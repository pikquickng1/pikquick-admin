import type {
  PlatformSettingsData,
  TaskCategory,
  PlatformSettingsPayload,
} from "../types/platform-settings.types";
import { adminService } from "@/lib/services/admin.service";

type RawPlatformSettings = Partial<PlatformSettingsData> &
  Partial<PlatformSettingsPayload>;

export const platformSettingsApi = {
  async getSettings(): Promise<PlatformSettingsData> {
    const data = (await adminService.getPlatformSettings()) as RawPlatformSettings | undefined;
    return {
      accessFee: Number(data?.accessFee ?? data?.access_fee ?? 0),
      platformCommission: Number(
        data?.platformCommission ?? data?.platform_commission ?? 0,
      ),
    };
  },

  async updateSettings(settings: PlatformSettingsData): Promise<void> {
    const payload: PlatformSettingsPayload = {
      access_fee: settings.accessFee,
      platform_commission: settings.platformCommission,
    };
    await adminService.updatePlatformSettings(payload as unknown as Record<string, unknown>);
  },

  async getTaskCategories(): Promise<TaskCategory[]> {
    return (await adminService.getTaskCategories()) as TaskCategory[];
  },

  async addTaskCategory(category: Omit<TaskCategory, "id">): Promise<void> {
    await adminService.addTaskCategory(category);
  },

  async updateTaskCategory(id: string, category: Partial<TaskCategory>): Promise<void> {
    await adminService.updateTaskCategory(id, category);
  },

  async deleteTaskCategory(id: string): Promise<void> {
    await adminService.deleteTaskCategory(id);
  },
};
