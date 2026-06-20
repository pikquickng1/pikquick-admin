/**
 * Enums matching backend. Use for filters and display.
 *
 * Backend source of truth: pikquick-backend/src/models/*.model.ts
 * - UserRole          -> src/models/user.model.ts
 * - UserStatus        -> src/models/user.model.ts
 * - VerificationStatus-> src/models/runner-profile.model.ts (runner)
 * - TransportMode     -> src/models/runner-profile.model.ts
 * - DocumentVerificationStatus -> src/models/runner-document.model.ts
 * - TaskStatus        -> src/models/task.model.ts
 * - PaymentType       -> src/models/task.model.ts
 * - BidStatus         -> src/models/bid.model.ts
 * - TransactionType   -> src/models/transaction.model.ts
 * - TransactionStatus -> src/models/transaction.model.ts
 * - WithdrawalStatus  -> src/models/withdrawal.model.ts
 * - WalletStatus      -> src/models/wallet.model.ts (string literal only — ACTIVE/INACTIVE/SUSPENDED/CLOSED)
 */

export const UserRole = {
  CLIENT: "client",
  RUNNER: "runner",
  ADMIN: "admin",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  DELETED: "deleted",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const VerificationStatus = {
  UNVERIFIED: "unverified",
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;
export type VerificationStatus =
  (typeof VerificationStatus)[keyof typeof VerificationStatus];

export const TransportMode = {
  CAR: "car",
  BICYCLE: "bicycle",
  FOOT: "foot",
  MOTORCYCLE: "motorcycle",
  TRUCK: "truck",
  VAN: "van",
  BUS: "bus",
} as const;
export type TransportMode = (typeof TransportMode)[keyof typeof TransportMode];

export const DocumentVerificationStatus = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;
export type DocumentVerificationStatus =
  (typeof DocumentVerificationStatus)[keyof typeof DocumentVerificationStatus];

/**
 * UserType as the admin treats it. Maps to backend UserRole.CLIENT / RUNNER / ADMIN.
 * Wallets/transaction screens previously used "requester" — that's now CLIENT.
 */
export const UserType = {
  CLIENT: "client",
  RUNNER: "runner",
  ADMIN: "admin",
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

export const WithdrawalStatus = {
  PENDING: "pending",
  SUCCESSFUL: "successful",
  FAILED: "failed",
  REVERSED: "reversed",
} as const;
export type WithdrawalStatus =
  (typeof WithdrawalStatus)[keyof typeof WithdrawalStatus];

/** Task status values; extend from backend TaskStatus enum if needed */
export const TaskStatus = {
  PENDING: "pending",
  BIDDING: "bidding",
  BID_ACCEPTED: "bid_accepted",
  BID_REJECTED: "bid_rejected",
  TASK_ASSIGNED: "task_assigned",
  TASK_STARTED: "task_started",
  EN_ROUTE_TO_DROPOFF: "en_route_to_dropoff",
  AWAITING_CLIENT_APPROVAL: "awaiting_client_approval",
  TASK_COMPLETED: "task_completed",
  CANCELLED: "cancelled",
  ASSIGNED: "assigned",
  DISPUTED: "disputed",
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const PaymentType = {
  WALLET: "wallet",
  CARD: "card",
  BANK_TRANSFER: "bank_transfer",
} as const;
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const BidStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  WITHDRAWN: "withdrawn",
  EXPIRED: "expired",
  COUNTERED: "countered",
} as const;
export type BidStatus = (typeof BidStatus)[keyof typeof BidStatus];

export const DeliveryFileType = {
  RECEIPT: "receipt",
  PHOTO: "photo",
} as const;
export type DeliveryFileType =
  (typeof DeliveryFileType)[keyof typeof DeliveryFileType];

/**
 * Finance enums
 */

export const TransactionType = {
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
  TASK_PAYMENT: "task_payment",
  REFUND: "refund",
  DISPUTE: "dispute",
  ADJUSTMENT: "adjustment",
  AVAILABILITY: "availability",
  REFERRAL_REWARD: "referral_reward",
  TOP_UP: "top_up",
  SUBSCRIPTION: "subscription",
  ESCROW_HOLD: "escrow_hold",
  ESCROW_RELEASE: "escrow_release",
  ESCROW_TRANSFER: "escrow_transfer",
} as const;
export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

/** Lowercase values stored in DB (see admin-settings.controller.ts:349, escrow.service.ts:683) */
export const TransactionStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;
export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];

export const WalletStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  SUSPENDED: "SUSPENDED",
  CLOSED: "CLOSED",
} as const;
export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];

export const WalletTxType = {
  CREDIT: "credit",
  DEBIT: "debit",
} as const;
export type WalletTxType = (typeof WalletTxType)[keyof typeof WalletTxType];

/** Escrow status — plain string in transactions.escrow_status (escrow.service.ts) */
export const EscrowStatus = {
  HELD: "held",
  TRANSFERRED: "transferred",
  REFUNDED: "refunded",
  READY_FOR_RELEASE: "ready_for_release",
} as const;
export type EscrowStatus = (typeof EscrowStatus)[keyof typeof EscrowStatus];

export const SupportTicketStatus = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const;
export type SupportTicketStatus =
  (typeof SupportTicketStatus)[keyof typeof SupportTicketStatus];

export const SupportTicketPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
} as const;
export type SupportTicketPriority =
  (typeof SupportTicketPriority)[keyof typeof SupportTicketPriority];

export const KycDocumentType = {
  ID_VERIFICATION: "id_verification",
  SELFIE: "selfie",
  ADDRESS: "address",
  NATIONAL_ID: "national_id",
  PASSPORT: "passport",
  DRIVERS_LICENSE: "drivers_license",
  UTILITY_BILL: "utility_bill",
} as const;
export type KycDocumentType =
  (typeof KycDocumentType)[keyof typeof KycDocumentType];

export const ProofSubmissionStatus = {
  PENDING: "pending",
  ACKNOWLEDGED: "acknowledged",
  ISSUE_REPORTED: "issue_reported",
} as const;
export type ProofSubmissionStatus =
  (typeof ProofSubmissionStatus)[keyof typeof ProofSubmissionStatus];

export const NotificationAudience = {
  USER: "USER",
  ADMIN: "ADMIN",
  RUNNER: "RUNNER",
  CLIENT: "CLIENT",
  ALL: "ALL",
  VERIFICATION: "VERIFICATION",
} as const;
export type NotificationAudience =
  (typeof NotificationAudience)[keyof typeof NotificationAudience];

/* -------------------------------------------------------------------------- */
/*                       REFERRAL MANAGEMENT (phase 2)                         */
/* -------------------------------------------------------------------------- */

export const ReferralStatus = {
  PENDING: "pending",
  ACTIVE: "active",
  COMPLETED: "completed",
  DISQUALIFIED: "disqualified",
} as const;
export type ReferralStatus = (typeof ReferralStatus)[keyof typeof ReferralStatus];

export const ReferralRewardStatus = {
  PENDING_VERIFICATION: "pending_verification",
  PAID: "paid",
  UNDER_REVIEW: "under_review",
  REJECTED: "rejected",
} as const;
export type ReferralRewardStatus =
  (typeof ReferralRewardStatus)[keyof typeof ReferralRewardStatus];

export const ActiveReferralDefinition = {
  SIGNUP_ONLY: "signup_only",
  KYC_VERIFIED: "kyc_verified",
  FIRST_TASK_COMPLETED: "first_task_completed",
  FIRST_N_AMOUNT_PROCESSED: "first_n_amount_processed",
} as const;
export type ActiveReferralDefinition =
  (typeof ActiveReferralDefinition)[keyof typeof ActiveReferralDefinition];

export const ReferralTierKey = {
  STARTER: "STARTER",
  PRO: "PRO",
  ELITE: "ELITE",
} as const;
export type ReferralTierKey = (typeof ReferralTierKey)[keyof typeof ReferralTierKey];

/* -------------------------------------------------------------------------- */
/*                       COMPLIANCE (phase 2)                                   */
/* -------------------------------------------------------------------------- */

export const FlagStatus = {
  FLAGGED: "flagged",
  UNDER_REVIEW: "under_review",
  RESOLVED: "resolved",
} as const;
export type FlagStatus = (typeof FlagStatus)[keyof typeof FlagStatus];

export const RiskLevel = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;
export type RiskLevel = (typeof RiskLevel)[keyof typeof RiskLevel];

/* -------------------------------------------------------------------------- */
/*                       NOTIFICATIONS (phase 2)                               */
/* -------------------------------------------------------------------------- */

export const NotificationChannel = {
  PUSH: "push",
  EMAIL: "email",
  SMS: "sms",
  IN_APP: "in_app",
} as const;
export type NotificationChannel =
  (typeof NotificationChannel)[keyof typeof NotificationChannel];

export const NotificationMessageType = {
  SYSTEM: "system",
  CUSTOM: "custom",
} as const;
export type NotificationMessageType =
  (typeof NotificationMessageType)[keyof typeof NotificationMessageType];

/* -------------------------------------------------------------------------- */
/*                       SETTINGS / USER-ACCESS (phase 2)                      */
/* -------------------------------------------------------------------------- */

export const AdminRole = {
  SUPER_ADMIN: "super_admin",
  FINANCE_ADMIN: "finance_admin",
  SUPPORT_ADMIN: "support_admin",
  OPERATIONS_ADMIN: "operations_admin",
} as const;
export type AdminRole = (typeof AdminRole)[keyof typeof AdminRole];

/* -------------------------------------------------------------------------- */
/*                       MISC (phase 2)                                         */
/* -------------------------------------------------------------------------- */

export const ReadStatus = {
  READ: "read",
  UNREAD: "unread",
} as const;
export type ReadStatus = (typeof ReadStatus)[keyof typeof ReadStatus];

/* -------------------------------------------------------------------------- */
/*                       DISPUTES (phase 2)                                     */
/* -------------------------------------------------------------------------- */

/**
 * Backend stores disputes.status as TitleCase strings
 * (see disputes/repositories/dispute.repository.ts:79, 164-181).
 * Match the casing exactly.
 */
export const DisputeStatus = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
} as const;
export type DisputeStatus = (typeof DisputeStatus)[keyof typeof DisputeStatus];

/** Backend disputes.priority values. */
export const DisputePriority = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
} as const;
export type DisputePriority = (typeof DisputePriority)[keyof typeof DisputePriority];

/** Backend disputes.category values. */
export const DisputeCategory = {
  TASK_DISPUTE: "Task Dispute",
  PAYMENT_ISSUE: "Payment Issue",
  ACCOUNT_ISSUE: "Account Issue",
  TECHNICAL_SUPPORT: "Technical Support",
  OTHER: "Other",
} as const;
export type DisputeCategory = (typeof DisputeCategory)[keyof typeof DisputeCategory];

/**
 * Sentinel for "no filter applied" in dropdowns.
 * Using a dedicated value (not the empty string or "All Status" string)
 * prevents accidental collisions with real status keys.
 */
export const ALL_FILTER = "__all__" as const;
export type AllFilter = typeof ALL_FILTER;
