import { ReferralRewardStatus, UserType } from "@/lib/types/enums";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import type {
  EliteReward,
  EliteRewardFilters,
  EliteRewardListResponse,
  EliteRewardStats,
} from "../types/elite-reward.types";

const MOCK_FETCH_DELAY_MS = 300;
const MOCK_ACTION_DELAY_MS = 500;

const MOCK_LIST_LENGTH = 5;
const MOCK_TOTAL_PAGES = 20;
const MOCK_TOTAL_ITEMS = 100;
const MOCK_ITEMS_PER_PAGE = 8;
const MOCK_REFERRAL_COUNT = 152;
const MOCK_REWARD_AMOUNT = 25000;
const MOCK_MONTH_ACHIEVED = "February 2024";

const MOCK_NAMES = [
  "Adebayo Samuel",
  "Chioma Okoro",
  "Olawale John",
  "Ibrahim Musa",
  "Ibrahim Musa",
] as const;
const MOCK_ROLES = [
  UserType.RUNNER,
  UserType.CLIENT,
  UserType.RUNNER,
  UserType.RUNNER,
  UserType.RUNNER,
] as const;
const MOCK_STATUSES = [
  ReferralRewardStatus.PENDING_VERIFICATION,
  ReferralRewardStatus.PAID,
  ReferralRewardStatus.PAID,
  ReferralRewardStatus.PENDING_VERIFICATION,
  ReferralRewardStatus.REJECTED,
] as const;

const buildMockList = (): EliteReward[] =>
  Array.from({ length: MOCK_LIST_LENGTH }, (_, i) => ({
    id: String(i + 1),
    user: MOCK_NAMES[i]!,
    role: MOCK_ROLES[i]!,
    referralsCount: MOCK_REFERRAL_COUNT,
    monthAchieved: MOCK_MONTH_ACHIEVED,
    rewardAmount: MOCK_REWARD_AMOUNT,
    status: MOCK_STATUSES[i]!,
  }));

export const eliteRewardApi = {
  async getEliteRewards(
    _filters: EliteRewardFilters,
    page: number = 1,
  ): Promise<EliteRewardListResponse> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_FETCH_DELAY_MS));
      return {
        data: buildMockList(),
        pagination: {
          currentPage: page,
          totalPages: MOCK_TOTAL_PAGES,
          totalItems: MOCK_TOTAL_ITEMS,
          itemsPerPage: MOCK_ITEMS_PER_PAGE,
        },
      };
    }
    throw new Error("Live elite-rewards endpoint not yet wired in the admin UI");
  },

  async getEliteRewardStats(): Promise<EliteRewardStats> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_FETCH_DELAY_MS));
      return { awaitingReview: 8, approvedMTD: 12, totalElitePayouts: 300000 };
    }
    throw new Error("Live elite-reward-stats endpoint not yet wired in the admin UI");
  },

  async approveReward(_id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live approve-reward endpoint not yet wired in the admin UI");
  },

  async rejectReward(_id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live reject-reward endpoint not yet wired in the admin UI");
  },
};
