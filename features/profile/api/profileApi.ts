import { Profile, ActivityLog } from "../types/profile.types";
import { adminService } from "@/lib/services";
import { activityLogService } from "@/lib/services";

export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    try {
      const response = await adminService.getAdminProfile();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  },

  getActivityLogs: async (): Promise<ActivityLog[]> => {
    try {
      const response = await activityLogService.getLogs({ limit: 20 });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch activity logs:", error);
      throw error;
    }
  },

  logoutAllDevices: async (): Promise<void> => {
    try {
      await adminService.logoutAllDevices();
    } catch (error) {
      console.error("Failed to logout all devices:", error);
      throw error;
    }
  },

  updateProfile: async (data: {
    fullName: string;
    phoneNumber: string;
  }): Promise<void> => {
    await adminService.updateAdminProfile({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
    });
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> => {
    await adminService.changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  },
};
