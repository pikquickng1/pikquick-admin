/**
 * Status label and badge helpers. Central place to translate backend status
 * values into UI copy and Tailwind class strings.
 *
 * Previously this logic was duplicated across ~25 component files.
 */

import {
  ALL_FILTER,
  BidStatus,
  DisputePriority,
  DisputeStatus,
  DocumentVerificationStatus,
  FlagStatus,
  NotificationMessageType,
  ReferralRewardStatus,
  ReferralStatus,
  ReferralTierKey,
  RiskLevel,
  SupportTicketPriority,
  SupportTicketStatus,
  TaskStatus,
  TransactionStatus,
  UserStatus,
  VerificationStatus,
  WalletStatus,
  WalletTxType,
  WithdrawalStatus,
} from "@/lib/types/enums";
import { cn } from "@/lib/utils";

/** Tailwind classes keyed by semantic state. */
export const STATUS_BADGE_CLASS = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  neutral: "bg-gray-100 text-gray-700",
  pending: "bg-orange-100 text-orange-700",
} as const;

export type StatusTone = keyof typeof STATUS_BADGE_CLASS;

/* -------------------------------------------------------------------------- */
/*                              Status -> tone                                */
/* -------------------------------------------------------------------------- */

const USER_STATUS_TONE: Record<UserStatus, StatusTone> = {
  active: "success",
  inactive: "neutral",
  suspended: "error",
  deleted: "error",
};

const VERIFICATION_TONE: Record<VerificationStatus, StatusTone> = {
  verified: "success",
  pending: "pending",
  rejected: "error",
  unverified: "neutral",
};

const DOCUMENT_VERIFICATION_TONE: Record<DocumentVerificationStatus, StatusTone> = {
  pending: "pending",
  verified: "success",
  rejected: "error",
};

const FLAG_STATUS_TONE: Record<FlagStatus, StatusTone> = {
  flagged: "error",
  under_review: "warning",
  resolved: "success",
};

const REFERRAL_STATUS_TONE: Record<ReferralStatus, StatusTone> = {
  pending: "pending",
  active: "success",
  completed: "info",
  disqualified: "error",
};

const REFERRAL_REWARD_TONE: Record<ReferralRewardStatus, StatusTone> = {
  pending_verification: "pending",
  paid: "success",
  under_review: "info",
  rejected: "error",
};

const REFERRAL_TIER_TONE: Record<ReferralTierKey, StatusTone> = {
  STARTER: "info",
  PRO: "success",
  ELITE: "error",
};

const RISK_LEVEL_TONE: Record<RiskLevel, StatusTone> = {
  low: "success",
  medium: "warning",
  high: "error",
};

const NOTIFICATION_MESSAGE_TYPE_TONE: Record<NotificationMessageType, StatusTone> = {
  system: "neutral",
  custom: "info",
};

const DISPUTE_STATUS_TONE: Record<DisputeStatus, StatusTone> = {
  Open: "info",
  "In Progress": "warning",
  Resolved: "success",
};

const DISPUTE_PRIORITY_TONE: Record<DisputePriority, StatusTone> = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

const SUPPORT_TICKET_STATUS_TONE: Record<SupportTicketStatus, StatusTone> = {
  open: "info",
  in_progress: "warning",
  resolved: "success",
  closed: "neutral",
};

const SUPPORT_TICKET_PRIORITY_TONE: Record<SupportTicketPriority, StatusTone> = {
  low: "success",
  medium: "warning",
  high: "error",
  urgent: "error",
};

const TASK_STATUS_TONE: Record<TaskStatus, StatusTone> = {
  pending: "pending",
  bidding: "info",
  bid_accepted: "info",
  bid_rejected: "error",
  task_assigned: "info",
  task_started: "info",
  en_route_to_dropoff: "info",
  awaiting_client_approval: "warning",
  task_completed: "success",
  cancelled: "error",
  assigned: "info",
  disputed: "error",
};

const BID_STATUS_TONE: Record<BidStatus, StatusTone> = {
  pending: "pending",
  accepted: "success",
  rejected: "error",
  withdrawn: "neutral",
  expired: "neutral",
  countered: "info",
};

const WITHDRAWAL_STATUS_TONE: Record<WithdrawalStatus, StatusTone> = {
  pending: "pending",
  successful: "success",
  failed: "error",
  reversed: "neutral",
};

const TRANSACTION_STATUS_TONE: Record<TransactionStatus, StatusTone> = {
  pending: "pending",
  completed: "success",
  failed: "error",
  refunded: "neutral",
};

const WALLET_STATUS_TONE: Record<WalletStatus, StatusTone> = {
  ACTIVE: "success",
  INACTIVE: "neutral",
  SUSPENDED: "error",
  CLOSED: "neutral",
};

const WALLET_TX_TONE: Record<WalletTxType, StatusTone> = {
  credit: "success",
  debit: "error",
};

/* -------------------------------------------------------------------------- */
/*                              Status -> label                                */
/* -------------------------------------------------------------------------- */

const USER_STATUS_LABEL: Record<UserStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
  deleted: "Deleted",
};

const RUNNER_AVAILABILITY_LABEL: Record<string, string> = {
  available: "Available",
  unavailable: "Unavailable",
  suspended: "Suspended",
};

const VERIFICATION_LABEL: Record<VerificationStatus, string> = {
  verified: "Verified",
  pending: "Pending",
  rejected: "Rejected",
  unverified: "Unverified",
};

const DOCUMENT_VERIFICATION_LABEL: Record<DocumentVerificationStatus, string> = {
  pending: "Pending",
  verified: "Verified",
  rejected: "Rejected",
};

const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  pending: "Pending",
  bidding: "Bidding",
  bid_accepted: "Bid Accepted",
  bid_rejected: "Bid Rejected",
  task_assigned: "In Progress",
  task_started: "In Progress",
  en_route_to_dropoff: "En Route",
  awaiting_client_approval: "Awaiting Approval",
  task_completed: "Completed",
  cancelled: "Cancelled",
  assigned: "Assigned",
  disputed: "Disputed",
};

const BID_STATUS_LABEL: Record<BidStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Declined",
  withdrawn: "Withdrawn",
  expired: "Expired",
  countered: "Countered",
};

const WITHDRAWAL_STATUS_LABEL: Record<WithdrawalStatus, string> = {
  pending: "Pending",
  successful: "Completed",
  failed: "Rejected",
  reversed: "Reversed",
};

const TRANSACTION_STATUS_LABEL: Record<TransactionStatus, string> = {
  pending: "Pending",
  completed: "Completed",
  failed: "Failed",
  refunded: "Refunded",
};

const TRANSACTION_TYPE_LABEL: Record<string, string> = {
  task_payment: "Task Payment",
  subscription: "Daily Access",
  top_up: "Wallet Top-up",
  refund: "Refund",
  withdrawal: "Withdrawal",
  deposit: "Deposit",
  dispute: "Dispute",
  adjustment: "Adjustment",
  availability: "Availability",
  referral_reward: "Referral Reward",
  escrow_hold: "Escrow Hold",
  escrow_release: "Escrow Release",
  escrow_transfer: "Escrow Transfer",
};

const WALLET_STATUS_LABEL: Record<WalletStatus, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  SUSPENDED: "Suspended",
  CLOSED: "Closed",
};

const WALLET_TX_LABEL: Record<WalletTxType, string> = {
  credit: "Credit",
  debit: "Debit",
};

const USER_TYPE_LABEL: Record<string, string> = {
  client: "Requester",
  runner: "Runner",
  admin: "Admin",
};

const TRANSPORT_MODE_LABEL: Record<string, string> = {
  car: "Car",
  bicycle: "Bicycle",
  foot: "Foot",
  motorcycle: "Motorcycle",
  truck: "Truck",
  van: "Van",
  bus: "Bus",
};

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

/**
 * Translate a status coming from the backend (or a UI sentinel) into the
 * Tone key used by the badge classes. Returns `neutral` if the status is
 * unknown — better than throwing inside a render.
 */
export function statusTone(status: string | null | undefined): StatusTone {
  if (!status) return "neutral";
  const s = status.toLowerCase();

  if (s in USER_STATUS_TONE) return USER_STATUS_TONE[s as UserStatus];
  if (s in SUPPORT_TICKET_STATUS_TONE) return SUPPORT_TICKET_STATUS_TONE[s as SupportTicketStatus];
  if (s in SUPPORT_TICKET_PRIORITY_TONE) return SUPPORT_TICKET_PRIORITY_TONE[s as SupportTicketPriority];
  if (s in TASK_STATUS_TONE) return TASK_STATUS_TONE[s as TaskStatus];
  if (s in BID_STATUS_TONE) return BID_STATUS_TONE[s as BidStatus];
  if (s in WITHDRAWAL_STATUS_TONE)
    return WITHDRAWAL_STATUS_TONE[s as WithdrawalStatus];
  if (s in TRANSACTION_STATUS_TONE)
    return TRANSACTION_STATUS_TONE[s as TransactionStatus];
  if (s in FLAG_STATUS_TONE) return FLAG_STATUS_TONE[s as FlagStatus];
  if (s in REFERRAL_STATUS_TONE) return REFERRAL_STATUS_TONE[s as ReferralStatus];
  if (s in REFERRAL_REWARD_TONE)
    return REFERRAL_REWARD_TONE[s as ReferralRewardStatus];
  if (s in RISK_LEVEL_TONE) return RISK_LEVEL_TONE[s as RiskLevel];
  if (s in NOTIFICATION_MESSAGE_TYPE_TONE)
    return NOTIFICATION_MESSAGE_TYPE_TONE[s as NotificationMessageType];

  // DocumentVerificationStatus / VerificationStatus share the same vocabulary
  if (s in DOCUMENT_VERIFICATION_TONE)
    return DOCUMENT_VERIFICATION_TONE[s as DocumentVerificationStatus];
  if (s in VERIFICATION_TONE)
    return VERIFICATION_TONE[s as VerificationStatus];

  // Runner-only "availability" lives outside UserStatus.ACTIVE
  if (s === "available") return "success";
  if (s === "unavailable") return "neutral";

  // Disputes store TitleCase values (Open / In Progress / Resolved / High / Medium / Low)
  if (status in DISPUTE_STATUS_TONE) return DISPUTE_STATUS_TONE[status as DisputeStatus];
  if (status in DISPUTE_PRIORITY_TONE) return DISPUTE_PRIORITY_TONE[status as DisputePriority];

  return "neutral";
}

export function statusBadgeClass(status: string | null | undefined): string {
  return STATUS_BADGE_CLASS[statusTone(status)];
}

/**
 * Map backend value -> human label. Falls back to Title-Case on unknown so
 * new statuses don't crash rendering.
 */
export function statusLabel(status: string | null | undefined): string {
  if (!status) return "—";
  const s = status.toLowerCase();

  if (s in USER_STATUS_LABEL) return USER_STATUS_LABEL[s as UserStatus];
  if (s in TASK_STATUS_LABEL) return TASK_STATUS_LABEL[s as TaskStatus];
  if (s in BID_STATUS_LABEL) return BID_STATUS_LABEL[s as BidStatus];
  if (s in WITHDRAWAL_STATUS_LABEL)
    return WITHDRAWAL_STATUS_LABEL[s as WithdrawalStatus];
  if (s in TRANSACTION_STATUS_LABEL)
    return TRANSACTION_STATUS_LABEL[s as TransactionStatus];
  if (s in DOCUMENT_VERIFICATION_LABEL)
    return DOCUMENT_VERIFICATION_LABEL[s as DocumentVerificationStatus];
  if (s in VERIFICATION_LABEL)
    return VERIFICATION_LABEL[s as VerificationStatus];
  if (s in RUNNER_AVAILABILITY_LABEL) return RUNNER_AVAILABILITY_LABEL[s]!;
  if (s in TRANSACTION_TYPE_LABEL) return TRANSACTION_TYPE_LABEL[s]!;
  if (s in USER_TYPE_LABEL) return USER_TYPE_LABEL[s]!;
  if (s in TRANSPORT_MODE_LABEL) return TRANSPORT_MODE_LABEL[s]!;

  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

/* -------------------------------------------------------------------------- */
/*                    Phase 2 — new label helpers                              */
/* -------------------------------------------------------------------------- */

const FLAG_STATUS_LABEL: Record<FlagStatus, string> = {
  flagged: "Flagged",
  under_review: "Under Review",
  resolved: "Resolved",
};

const REFERRAL_STATUS_LABEL: Record<ReferralStatus, string> = {
  pending: "Pending",
  active: "Active",
  completed: "Completed",
  disqualified: "Disqualified",
};

const REFERRAL_REWARD_LABEL: Record<ReferralRewardStatus, string> = {
  pending_verification: "Pending Verification",
  paid: "Paid",
  under_review: "Under Review",
  rejected: "Rejected",
};

const REFERRAL_TIER_LABEL: Record<ReferralTierKey, string> = {
  STARTER: "Starter",
  PRO: "Pro",
  ELITE: "Elite",
};

const RISK_LEVEL_LABEL: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const ADMIN_ROLE_LABEL: Record<string, string> = {
  super_admin: "Super Admin",
  finance_admin: "Finance Admin",
  support_admin: "Support Admin",
  operations_admin: "Operations Admin",
};

const NOTIFICATION_CHANNEL_LABEL: Record<string, string> = {
  push: "Push Notification",
  email: "Email",
  sms: "SMS",
  in_app: "In-App",
};

const NOTIFICATION_AUDIENCE_LABEL: Record<string, string> = {
  all: "All Users",
  runners: "Runners",
  requesters: "Requesters",
  admins: "Admins",
};

const NOTIFICATION_MESSAGE_TYPE_LABEL: Record<NotificationMessageType, string> = {
  system: "System",
  custom: "Custom",
};

export function flagStatusLabel(s: string): string {
  return FLAG_STATUS_LABEL[s as FlagStatus] ?? s;
}
export function referralStatusLabel(s: string): string {
  return REFERRAL_STATUS_LABEL[s as ReferralStatus] ?? s;
}
export function referralRewardLabel(s: string): string {
  return REFERRAL_REWARD_LABEL[s as ReferralRewardStatus] ?? s;
}
export function referralTierLabel(s: string): string {
  return REFERRAL_TIER_LABEL[s as ReferralTierKey] ?? s;
}
export function riskLevelLabel(s: string): string {
  return RISK_LEVEL_LABEL[s as RiskLevel] ?? s;
}
export function adminRoleLabel(s: string): string {
  return ADMIN_ROLE_LABEL[s.toLowerCase()] ?? s;
}
export function notificationChannelLabel(s: string): string {
  return NOTIFICATION_CHANNEL_LABEL[s.toLowerCase()] ?? s;
}
export function notificationAudienceLabel(s: string): string {
  return NOTIFICATION_AUDIENCE_LABEL[s.toLowerCase()] ?? s;
}
export function notificationMessageTypeLabel(s: string): string {
  return NOTIFICATION_MESSAGE_TYPE_LABEL[s as NotificationMessageType] ?? s;
}

const DISPUTE_STATUS_LABEL: Record<DisputeStatus, string> = {
  Open: "Open",
  "In Progress": "In Progress",
  Resolved: "Resolved",
};

const DISPUTE_PRIORITY_LABEL: Record<DisputePriority, string> = {
  High: "High",
  Medium: "Medium",
  Low: "Low",
};

export function disputeStatusLabel(s: string): string {
  return DISPUTE_STATUS_LABEL[s as DisputeStatus] ?? s;
}
export function disputePriorityLabel(s: string): string {
  return DISPUTE_PRIORITY_LABEL[s as DisputePriority] ?? s;
}

const SUPPORT_TICKET_STATUS_LABEL: Record<SupportTicketStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};

const SUPPORT_TICKET_PRIORITY_LABEL: Record<SupportTicketPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

export function supportTicketStatusLabel(s: string): string {
  return SUPPORT_TICKET_STATUS_LABEL[s as SupportTicketStatus] ?? s;
}
export function supportTicketPriorityLabel(s: string): string {
  return SUPPORT_TICKET_PRIORITY_LABEL[s as SupportTicketPriority] ?? s;
}

export function walletStatusLabel(status: string): string {
  return WALLET_STATUS_LABEL[status as WalletStatus] ?? status;
}
export function walletStatusTone(status: string): StatusTone {
  return WALLET_STATUS_TONE[status as WalletStatus] ?? "neutral";
}
export function walletStatusClass(status: string): string {
  return STATUS_BADGE_CLASS[walletStatusTone(status)];
}

export function walletTxLabel(type: string): string {
  return WALLET_TX_LABEL[type as WalletTxType] ?? type;
}
export function walletTxClass(type: string): string {
  return STATUS_BADGE_CLASS[WALLET_TX_TONE[type as WalletTxType] ?? "neutral"];
}

/**
 * Translate a UI filter value (which may be the ALL_FILTER sentinel) to the
 * value the API actually expects. Returns undefined when no filter applies,
 * which most API clients skip automatically.
 */
export function statusToApi(
  value: string | null | undefined,
): string | undefined {
  if (!value || value === ALL_FILTER) return undefined;
  return value.toLowerCase();
}

export function statusBadgeClasses(
  status: string | null | undefined,
  extra?: string,
): string {
  return cn(STATUS_BADGE_CLASS[statusTone(status)], extra);
}
