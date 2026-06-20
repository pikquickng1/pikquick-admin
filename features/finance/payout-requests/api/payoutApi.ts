import { USE_MOCKS } from "@/lib/config/feature-flags";
import { withdrawalsService } from "@/lib/services";
import type { AdminWithdrawal } from "@/lib/types";
import type { PayoutRequest, PayoutRequestDetails } from "../types/payout.types";

const MOCK_PAYOUT_AMOUNT = 25000;
const MOCK_PAYOUT_BANK = "GTBank";
const MOCK_PAYOUT_ACCOUNT = "0123456789";
const MOCK_PAYOUT_RATING = 4.8;
const MOCK_PAYOUT_TASKS = 12;
const MOCK_PAYOUT_DATE = "2025-10-30T14:30:00Z";
const MOCK_PAYOUT_RUNNER = "Adewale Johnson";
const MOCK_LIST_LENGTH = 6;
const MOCK_LIST_TOTAL_ITEMS = 60;
const MOCK_LIST_TOTAL_PAGES = 10;
const MOCK_LIST_ITEMS_PER_PAGE = 6;
const MOCK_FETCH_DELAY_MS = 300;
const MOCK_ACTION_DELAY_MS = 500;

const buildMockList = (): PayoutRequest[] =>
  Array.from({ length: MOCK_LIST_LENGTH }, (_, i) => ({
    id: `TXN${String(i + 1).padStart(3, "0")}`,
    runnerId: `RUN${String(i + 1).padStart(3, "0")}`,
    runnerName: MOCK_PAYOUT_RUNNER,
    runnerRating: MOCK_PAYOUT_RATING,
    runnerTasks: MOCK_PAYOUT_TASKS,
    amount: MOCK_PAYOUT_AMOUNT,
    bankName: MOCK_PAYOUT_BANK,
    accountNumber: MOCK_PAYOUT_ACCOUNT,
    date: MOCK_PAYOUT_DATE,
    status:
      i === 3
        ? ("Rejected" as const)
        : i === 4 || i === 5
          ? ("Completed" as const)
          : ("Pending" as const),
  }));

export const payoutApi = {
  getPayoutsList: async (
    _filters: unknown,
    page: number = 1
  ): Promise<{ data: PayoutRequest[]; pagination: { currentPage: number; totalPages: number; totalItems: number; itemsPerPage: number } }> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_FETCH_DELAY_MS));
      return {
        data: buildMockList(),
        pagination: {
          currentPage: page,
          totalPages: MOCK_LIST_TOTAL_PAGES,
          totalItems: MOCK_LIST_TOTAL_ITEMS,
          itemsPerPage: MOCK_LIST_ITEMS_PER_PAGE,
        },
      };
    }
    const res = await withdrawalsService.list({ page, limit: MOCK_LIST_ITEMS_PER_PAGE });
    return res as unknown as {
      data: PayoutRequest[];
      pagination: { currentPage: number; totalPages: number; totalItems: number; itemsPerPage: number };
    };
  },

  getPayoutById: async (id: string): Promise<PayoutRequestDetails> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_FETCH_DELAY_MS));
      return {
        id,
        runnerId: "RUN001",
        runnerName: MOCK_PAYOUT_RUNNER,
        runnerRating: MOCK_PAYOUT_RATING,
        runnerTasks: MOCK_PAYOUT_TASKS,
        amount: MOCK_PAYOUT_AMOUNT,
        bankName: MOCK_PAYOUT_BANK,
        accountNumber: MOCK_PAYOUT_ACCOUNT,
        accountName: MOCK_PAYOUT_RUNNER,
        date: MOCK_PAYOUT_DATE,
        requestedDate: MOCK_PAYOUT_DATE,
        status: "Pending",
      };
    }
    return (await withdrawalsService.list({ limit: 1 })).data[0] as unknown as PayoutRequestDetails;
  },

  approvePayout: async (id: string): Promise<void> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_ACTION_DELAY_MS));
      return;
    }
    await withdrawalsService.list({ limit: 1 });
    // Real backend endpoint: POST /admin/withdrawals/:id/approve (not yet wired into service)
    void id;
  },

  rejectPayout: async (id: string, reason: string): Promise<void> => {
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_ACTION_DELAY_MS));
      return;
    }
    void id;
    void reason;
  },

  exportPayouts: async (
    _filters: unknown,
    format: "csv" | "excel" = "csv"
  ): Promise<Blob> => {
    const mime =
      format === "csv"
        ? "text/csv"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (USE_MOCKS) {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return new Blob(["Mock export"], { type: mime });
    }
    return new Blob([""], { type: mime });
  },
};

export type { AdminWithdrawal };
