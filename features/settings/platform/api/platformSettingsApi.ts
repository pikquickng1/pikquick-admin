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
    const raw = (await adminService.getPlatformSettings()) as
      | (RawPlatformSettings & { data?: RawPlatformSettings })
      | undefined;
    // Tolerate the legacy double-wrapped `{ data: { ... } }` shape as well as
    // the corrected flat shape.
    const data = raw?.data ?? raw;
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
    const res = (await adminService.getTaskCategories()) as
      | TaskCategory[]
      | { data?: TaskCategory[] };
    // Tolerate both the flat array and the legacy { data: [...] } wrapper.
    return Array.isArray(res) ? res : (res?.data ?? []);
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
