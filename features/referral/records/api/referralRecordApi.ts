import { ReferralStatus, UserType } from "@/lib/types/enums";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import type {
  ReferralRecord,
  ReferralRecordFilters,
  ReferralRecordListResponse,
} from "../types/referral-record.types";

const MOCK_FETCH_DELAY_MS = 300;
const MOCK_LIST_LENGTH = 5;
const MOCK_TOTAL_PAGES = 20;
const MOCK_TOTAL_ITEMS = 100;
const MOCK_ITEMS_PER_PAGE = 5;
const MOCK_TASK_ID = "TASK-45231";
const MOCK_MONTH = "March";

const buildMockList = (): ReferralRecord[] =>
  Array.from({ length: MOCK_LIST_LENGTH }, (_, i) => ({
    id: String(i + 1),
    referrer: [
      "Adebayo Samuel",
      "Chioma Okoro",
      "Ibrahim Musa",
      "Osawele John",
      "Blessing Udoh",
    ][i]!,
    referrerRole: (
      ["runner", "client", "runner", "runner", "client"] as const
    )[i]!,
    referredUser: ["John Doe", "Sarah Smith", "Michael Jordan", "Alice Cooper", "David Beckham"][i]!,
    signupDate: `2024-03-${String(10 + i).padStart(2, "0")}`,
    firstTask: {
      completed: i !== 2 && i !== 3,
      taskId: i !== 2 && i !== 3 ? MOCK_TASK_ID : undefined,
    },
    status: (
      [ReferralStatus.ACTIVE, ReferralStatus.ACTIVE, ReferralStatus.PENDING, ReferralStatus.DISQUALIFIED, ReferralStatus.ACTIVE] as const
    )[i]!,
    month: MOCK_MONTH,
  }));

export const referralRecordApi = {
  async getReferralRecords(
    _filters: ReferralRecordFilters,
    page: number = 1,
  ): Promise<ReferralRecordListResponse> {
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
    throw new Error("Live referral-records endpoint not yet wired in the admin UI");
  },
};
