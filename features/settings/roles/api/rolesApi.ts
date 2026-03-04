import { Role } from "../types/roles.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

// Mock data
const mockRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full control over all settings, users, and data",
    permissionsSummary: "Complete access to all modules, settings, and administrative functions",
    color: "blue",
  },
  {
    id: "2",
    name: "Finance Admin",
    description: "Access to wallet, payouts, compliance",
    permissionsSummary: "Manage financial transactions, wallets, payouts, and compliance monitoring",
    color: "green",
  },
  {
    id: "3",
    name: "Support Admin",
    description: "Access to support, disputes, and notifications",
    permissionsSummary: "Handle customer support tickets, resolve disputes, and manage notifications",
    color: "orange",
  },
  {
    id: "4",
    name: "Operations Admin",
    description: "Task and verification access, analytics (read-only)",
    permissionsSummary: "Manage tasks, KYC verification, and view analytics reports",
    color: "purple",
  },
];

export const rolesApi = {
  async getRoles(): Promise<Role[]> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockRoles;
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      throw error;
    }
  },
};
