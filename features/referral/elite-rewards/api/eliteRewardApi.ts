import {
  EliteReward,
  EliteRewardFilters,
  EliteRewardListResponse,
  EliteRewardStats,
} from "../types/elite-reward.types";

export const eliteRewardApi = {
  getEliteRewards: async (
    filters: EliteRewardFilters,
    page: number = 1
  ): Promise<EliteRewardListResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const mockData: EliteReward[] = [
      {
        id: "1",
        user: "Adebayo Samuel",
        role: "Runner",
        referralsCount: 152,
        monthAchieved: "February 2024",
        rewardAmount: 25000,
        status: "Pending",
      },
      {
        id: "2",
        user: "Chioma Okoro",
        role: "Requester",
        referralsCount: 152,
        monthAchieved: "February 2024",
        rewardAmount: 25000,
        status: "Approved",
      },
      {
        id: "3",
        user: "Olawale John",
        role: "Runner",
        referralsCount: 152,
        monthAchieved: "February 2024",
        rewardAmount: 25000,
        status: "Approved",
      },
      {
        id: "4",
        user: "Ibrahim Musa",
        role: "Runner",
        referralsCount: 152,
        monthAchieved: "February 2024",
        rewardAmount: 25000,
        status: "Pending",
      },
      {
        id: "5",
        user: "Ibrahim Musa",
        role: "Runner",
        referralsCount: 152,
        monthAchieved: "February 2024",
        rewardAmount: 25000,
        status: "Rejected",
      },
    ];

    return {
      data: mockData,
      pagination: {
        currentPage: page,
        totalPages: 20,
        totalItems: 100,
        itemsPerPage: 8,
      },
    };
  },

  getEliteRewardStats: async (): Promise<EliteRewardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      awaitingReview: 8,
      approvedMTD: 12,
      totalElitePayouts: 300000,
    };
  },

  approveReward: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Approving elite reward:", id);
  },

  rejectReward: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("Rejecting elite reward:", id);
  },
};
