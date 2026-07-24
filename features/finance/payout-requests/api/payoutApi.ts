import { withdrawalsService } from "@/lib/services";
import { koboToNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import type { AdminWithdrawal, AdminWithdrawalDetail } from "@/lib/types";
import { WithdrawalStatus } from "@/lib/types/enums";
import type {
  PayoutDisplayStatus,
  PayoutRequestDetails,
} from "../types/payout.types";

const PLACEHOLDER = "—";

const STATUS_MAP: Record<string, PayoutDisplayStatus> = {
  [WithdrawalStatus.PENDING]: "Pending",
  [WithdrawalStatus.SUCCESSFUL]: "Completed",
  [WithdrawalStatus.FAILED]: "Rejected",
  [WithdrawalStatus.REVERSED]: "Rejected",
};

function toDetail(w: AdminWithdrawalDetail): PayoutRequestDetails {
  return {
    id: w.id,
    runnerId: w.user_id,
    runnerName: w.user_name ?? PLACEHOLDER,
    runnerRating: 0,
    runnerTasks: 0,
    amount: koboToNgn(w.amount),
    // Bank account details are held by Paystack (recipient_code).
    bankName: PLACEHOLDER,
    accountNumber: PLACEHOLDER,
    accountName: w.user_name ?? PLACEHOLDER,
    date: formatDate(w.created_at),
    requestedDate: formatDate(w.created_at),
    processedDate: w.completed_at ? formatDate(w.completed_at) : undefined,
    rejectionReason: w.failure_reason,
    status: STATUS_MAP[w.status?.toLowerCase() ?? ""] ?? "Pending",
  };
}

export const payoutApi = {
  getPayoutById: async (id: string): Promise<PayoutRequestDetails> => {
    const w = await withdrawalsService.getById(id);
    return toDetail(w);
  },

  approvePayout: async (id: string): Promise<void> => {
    await withdrawalsService.approve(id);
  },

  rejectPayout: async (id: string, reason: string): Promise<void> => {
    await withdrawalsService.reject(id, reason);
  },

  exportPayouts: async (
    filters?: { status?: string; user_id?: string }
  ): Promise<Blob> => {
    return withdrawalsService.exportCsv(filters);
  },
};

export type { AdminWithdrawal };
