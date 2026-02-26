import type { AdminWithdrawal } from "@/lib/types";
import type { PayoutRequest } from "../types/payout.types";
import { koboToNgn } from "@/lib/utils/money";

function mapStatus(
  status: string
): "Pending" | "Completed" | "Rejected" {
  switch (status) {
    case "pending":
      return "Pending";
    case "successful":
      return "Completed";
    case "failed":
    case "reversed":
    default:
      return "Rejected";
  }
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toISOString().split("T")[0];
  } catch {
    return "—";
  }
}

export function mapWithdrawalToPayoutRequest(w: AdminWithdrawal): PayoutRequest {
  return {
    id: w.id,
    runnerId: w.user_id,
    runnerName: "—",
    runnerRating: 0,
    runnerTasks: 0,
    amount: koboToNgn(w.amount),
    bankName: "—",
    accountNumber: "—",
    date: formatDate(w.created_at),
    status: mapStatus(w.status),
  };
}
