import { Runner, RunnerTransaction, RunnerWallet, RunnerTaskHistory } from "../types/runner.types";
import { RunnerListFilters, RunnerListResponse } from "../types/runner-list.types";
import { runnersService } from "@/lib/services";

export const runnerApi = {
  getRunnersList: async (
    filters: RunnerListFilters,
    page: number = 1
  ): Promise<RunnerListResponse> => {
    try {
      const response = await runnersService.getRunners({
        page,
        limit: filters.limit || 20,
        search: filters.search,
        status: filters.status,
        verification: filters.verification,
      });
      return response;
    } catch (error) {
      console.error("Failed to fetch runners list:", error);
      throw error;
    }
  },

  getRunnerById: async (id: string): Promise<Runner> => {
    try {
      const response = await runnersService.getRunnerById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch runner details:", error);
      throw error;
    }
  },

  getRunnerWallet: async (id: string): Promise<RunnerWallet> => {
    try {
      const response = await runnersService.getRunnerWallet(id);
      return response;
    } catch (error) {
      console.error("Failed to fetch runner wallet:", error);
      throw error;
    }
  },

  getRunnerTransactions: async (id: string): Promise<RunnerTransaction[]> => {
    try {
      const wallet = await runnersService.getRunnerWallet(id);
      return wallet.recentTransactions || [];
    } catch (error) {
      console.error("Failed to fetch runner transactions:", error);
      throw error;
    }
  },

  getRunnerTaskHistory: async (id: string): Promise<RunnerTaskHistory[]> => {
    try {
      const response = await runnersService.getRunnerTasks(id, { limit: 20 });
      return response.data || [];
    } catch (error) {
      console.error("Failed to fetch runner task history:", error);
      throw error;
    }
  },

  suspendRunner: async (id: string): Promise<void> => {
    try {
      await runnersService.suspendRunner(id);
    } catch (error) {
      console.error("Failed to suspend runner:", error);
      throw error;
    }
  },

  activateRunner: async (id: string): Promise<void> => {
    try {
      await runnersService.activateRunner(id);
    } catch (error) {
      console.error("Failed to activate runner:", error);
      throw error;
    }
  },

  adjustWallet: async (id: string, type: "debit" | "credit", amount: number): Promise<void> => {
    try {
      await runnersService.adjustWallet(id, { type, amount });
    } catch (error) {
      console.error("Failed to adjust wallet:", error);
      throw error;
    }
  },

  resetPassword: async (id: string): Promise<void> => {
    try {
      await runnersService.resetPassword(id);
    } catch (error) {
      console.error("Failed to reset password:", error);
      throw error;
    }
  },

  sendMessage: async (id: string, subject: string, message: string): Promise<void> => {
    try {
      await runnersService.sendMessage(id, { subject, message });
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },
};
