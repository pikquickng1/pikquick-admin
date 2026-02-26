/**
 * System settings admin API types
 */

export interface SystemSetting {
  key: string;
  value: string;
  description?: string;
  dataType?: "string" | "number" | "boolean" | "json";
  [key: string]: unknown;
}

export interface AutoDeductionConfigResponse {
  dailyFee: number;
  deductionTime: string;
  enabled: boolean;
}

export interface UpdateDailyFeeDto {
  amount: number;
}

export interface UpdateAutoDeductionTimeDto {
  time: string;
}

export interface ToggleAutoDeductionDto {
  enabled: boolean;
}

export interface CreateSystemSettingDto {
  key: string;
  value: string;
  description?: string;
  dataType: "string" | "number" | "boolean" | "json";
}

export interface UpdateSystemSettingDto {
  value: string;
  description?: string;
}
