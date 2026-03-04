import { Profile, ActivityLog } from "../types/profile.types";

export const profileApi = {
  getProfile: async (): Promise<Profile> => {
    // Mock API call
    return {
      fullName: "Jane Doe",
      email: "jane.doe@pikquick.com",
      phoneNumber: "+234 803 456 7890",
      role: "Finance Admin",
      memberSince: "June 2024",
      lastLogin: {
        date: "2025-10-30",
        time: "09:14 AM",
        device: "Desktop",
        location: "Lagos, Nigeria",
        ipAddress: "197.252.14.8",
      },
    };
  },

  getActivityLogs: async (): Promise<ActivityLog[]> => {
    // Mock API call
    return [
      {
        id: "1",
        action: "Approved Payout",
        description: "Approved payout for Runner #233 - ₦15,000",
        timestamp: "2025-10-30 14:23",
        icon: "check",
      },
      {
        id: "2",
        action: "Updated Commission",
        description: "Changed platform commission from 12% to 15%",
        timestamp: "2025-10-30 11:45",
        icon: "edit",
      },
      {
        id: "3",
        action: "Exported Report",
        description: "Downloaded financial report for October 2025",
        timestamp: "2025-10-28 16:30",
        icon: "download",
      },
      {
        id: "4",
        action: "Approved Payout",
        description: "Approved payout for Runner #384 - ₦22,500",
        timestamp: "2025-10-25 10:15",
        icon: "check",
      },
      {
        id: "5",
        action: "Login",
        description: "Logged in from Lagos, Nigeria",
        timestamp: "2025-10-25 09:18",
        icon: "login",
      },
    ];
  },

  logoutAllDevices: async (): Promise<void> => {
    // Mock API call
    console.log("Logging out from all devices");
  },
};
