import type { AdminWithdrawal } from "@/lib/types";
import { WithdrawalStatus } from "@/lib/types/enums";
import { koboToNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import type { PayoutRequest } from "../types/payout.types";

const STATUS_MAP: Record<string, PayoutRequest["status"]> = {
  [WithdrawalStatus.PENDING]: "Pending",
  [WithdrawalStatus.SUCCESSFUL]: "Completed",
  [WithdrawalStatus.FAILED]: "Rejected",
  [WithdrawalStatus.REVERSED]: "Rejected",
};

const PLACEHOLDER = "—";

export function mapWithdrawalToPayoutRequest(w: AdminWithdrawal): PayoutRequest {
  return {
    id: w.id,
    runnerId: w.user_id,
    runnerName: w.user_name ?? PLACEHOLDER,
    runnerRating: 0,
    runnerTasks: 0,
    amount: koboToNgn(w.amount),
    // Bank name/account are held by Paystack (recipient_code) and not exposed
    // by the list endpoint.
    bankName: PLACEHOLDER,
    accountNumber: PLACEHOLDER,
    date: formatDate(w.created_at),
    status: STATUS_MAP[w.status?.toLowerCase() ?? ""] ?? "Pending",
  };
}
