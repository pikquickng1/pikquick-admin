/**
 * Enums matching backend. Use for filters and display.
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

export const WithdrawalStatus = {
  PENDING: "pending",
  SUCCESSFUL: "successful",
  FAILED: "failed",
  REVERSED: "reversed",
} as const;
export type WithdrawalStatus = (typeof WithdrawalStatus)[keyof typeof WithdrawalStatus];

export const DocumentVerificationStatus = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const;
export type DocumentVerificationStatus =
  (typeof DocumentVerificationStatus)[keyof typeof DocumentVerificationStatus];

/** Task status values; extend from backend TaskStatus enum if needed */
export const TaskStatus = {
  PENDING: "pending",
  TASK_ASSIGNED: "task_assigned",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  // add others from BE as needed
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const WalletStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;
export type WalletStatus = (typeof WalletStatus)[keyof typeof WalletStatus];
