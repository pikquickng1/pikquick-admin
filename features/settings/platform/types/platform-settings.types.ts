export interface PlatformSettingsData {
  accessFee: number;
  platformCommission: number;
}

export interface TaskCategory {
  id: string;
  name: string;
  description: string;
}

export interface PlatformSettingsPayload {
  access_fee?: number;
  platform_commission?: number;
}
