import { apiClient } from "@/lib/api/client";
import type {
  SystemSetting,
  AutoDeductionConfigResponse,
  UpdateDailyFeeDto,
  UpdateAutoDeductionTimeDto,
  ToggleAutoDeductionDto,
  CreateSystemSettingDto,
  UpdateSystemSettingDto,
} from "@/lib/types";

export const systemSettingsService = {
  list(): Promise<SystemSetting[]> {
    return apiClient.get("/admin/system-settings").then((r) => r.data);
  },

  getByKey(key: string): Promise<SystemSetting> {
    return apiClient.get(`/admin/system-settings/${key}`).then((r) => r.data);
  },

  getAutoDeductionConfig(): Promise<AutoDeductionConfigResponse> {
    return apiClient
      .get("/admin/system-settings/auto-deduction/config")
      .then((r) => r.data);
  },

  updateDailyFee(body: UpdateDailyFeeDto): Promise<unknown> {
    return apiClient
      .put("/admin/system-settings/daily-fee", body)
      .then((r) => r.data);
  },

  updateAutoDeductionTime(body: UpdateAutoDeductionTimeDto): Promise<unknown> {
    return apiClient
      .put("/admin/system-settings/auto-deduction/time", body)
      .then((r) => r.data);
  },

  toggleAutoDeduction(body: ToggleAutoDeductionDto): Promise<unknown> {
    return apiClient
      .put("/admin/system-settings/auto-deduction/toggle", body)
      .then((r) => r.data);
  },

  create(body: CreateSystemSettingDto): Promise<SystemSetting> {
    return apiClient.post("/admin/system-settings", body).then((r) => r.data);
  },

  update(key: string, body: UpdateSystemSettingDto): Promise<SystemSetting> {
    return apiClient.put(`/admin/system-settings/${key}`, body).then((r) => r.data);
  },

  delete(key: string): Promise<void> {
    return apiClient.delete(`/admin/system-settings/${key}`).then(() => {});
  },
};
