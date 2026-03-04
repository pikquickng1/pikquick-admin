import { AdminUser } from "../types/user-access.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

// Mock data
const mockAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "Ibrahim Musa",
    email: "ibrahim@pikquick.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2025-10-30 09:14 AM",
  },
  {
    id: "2",
    name: "Ibrahim Musa",
    email: "ibrahim@pikquick.com",
    role: "Finance Admin",
    status: "Active",
    lastLogin: "2025-10-30 09:14 AM",
  },
  {
    id: "3",
    name: "Ibrahim Musa",
    email: "ibrahim@pikquick.com",
    role: "Support Admin",
    status: "Active",
    lastLogin: "2025-10-30 09:14 AM",
  },
  {
    id: "4",
    name: "Ibrahim Musa",
    email: "ibrahim@pikquick.com",
    role: "Operations Admin",
    status: "Active",
    lastLogin: "2025-10-30 09:14 AM",
  },
];

export const userAccessApi = {
  async getAdminUsers(): Promise<AdminUser[]> {
    try {
      // Mock implementation
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockAdminUsers;
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
      throw error;
    }
  },

  async deleteAdminUser(id: string): Promise<void> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      console.log("Deleted admin user:", id);
    } catch (error) {
      console.error("Failed to delete admin user:", error);
      throw error;
    }
  },
};
