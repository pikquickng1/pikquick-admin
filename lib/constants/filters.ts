/**
 * Dropdown option sets for filter UIs. Single source of truth.
 *
 * Use ALL_FILTER as the value when no filter is applied; statusToApi()
 * helpers (in lib/utils/status.ts) translate back to undefined before
 * hitting the API.
 */

import { ALL_FILTER } from "@/lib/types/enums";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

const all = { value: ALL_FILTER, label: "All Status" } as const;
const allTypes = { value: ALL_FILTER, label: "All Types" } as const;
const allDate = { value: ALL_FILTER, label: "All Time" } as const;

export const USER_STATUS_OPTIONS = [
  all,
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "inactive", label: "Inactive" },
] as const;

export const RUNNER_AVAILABILITY_OPTIONS = [
  all,
  { value: "available", label: "Available" },
  { value: "unavailable", label: "Unavailable" },
  { value: "suspended", label: "Suspended" },
] as const;

export const RUNNER_VERIFICATION_OPTIONS = [
  all,
  { value: "verified", label: "Verified" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
] as const;

export const TASK_STATUS_OPTIONS = [
  all,
  { value: "pending", label: "Pending" },
  { value: "task_assigned", label: "In Progress" },
  { value: "task_completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export const PAYOUT_STATUS_OPTIONS = [
  all,
  { value: "pending", label: "Pending" },
  { value: "successful", label: "Completed" },
  { value: "failed", label: "Rejected" },
] as const;

export const TRANSACTION_STATUS_OPTIONS = [
  all,
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "failed", label: "Failed" },
] as const;

export const TRANSACTION_TYPE_OPTIONS = [
  allTypes,
  { value: "task_payment", label: "Task Payment" },
  { value: "subscription", label: "Daily Access" },
  { value: "top_up", label: "Wallet Top-up" },
  { value: "refund", label: "Refund" },
  { value: "withdrawal", label: "Withdrawal" },
] as const;

export const USER_TYPE_OPTIONS = [
  all,
  { value: "client", label: "Requester" },
  { value: "runner", label: "Runner" },
  { value: "admin", label: "Admin" },
] as const;

export const DATE_FILTER_OPTIONS = [
  allDate,
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
] as const;

export const TASK_SORT_OPTIONS = [
  { value: "highest_rating", label: "Highest Rating" },
  { value: "most_recent", label: "Most Recent" },
] as const;

export const USER_SORT_OPTIONS = [
  { value: "highest_rating", label: "Highest Rating" },
  { value: "most_tasks", label: "Most Tasks" },
  { value: "most_recent", label: "Most Recent" },
] as const;

export const REVENUE_PERIOD_OPTIONS = [
  { value: "last_7_days", label: "Last 7 Days" },
  { value: "last_30_days", label: "Last 30 Days" },
  { value: "last_3_months", label: "Last 3 Months" },
] as const;

export const REVENUE_LOCATION_OPTIONS = [
  { value: "all", label: "All Locations" },
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
] as const;

export const SEARCH_PLACEHOLDER_USER = "Search by name, email or phone number";
export const SEARCH_PLACEHOLDER_WALLET = "Search by name or ID";

/* -------------------------------------------------------------------------- */
/*                       REFERRAL (phase 2)                                     */
/* -------------------------------------------------------------------------- */

export const REFERRAL_STATUS_OPTIONS = [
  all,
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
  { value: "disqualified", label: "Disqualified" },
] as const;

export const REFERRAL_TIER_OPTIONS = [
  { value: "STARTER", label: "Starter" },
  { value: "PRO", label: "Pro" },
  { value: "ELITE", label: "Elite" },
] as const;

/* -------------------------------------------------------------------------- */
/*                       COMPLIANCE (phase 2)                                   */
/* -------------------------------------------------------------------------- */

export const FLAG_STATUS_OPTIONS = [
  all,
  { value: "flagged", label: "Flagged" },
  { value: "under_review", label: "Under Review" },
  { value: "resolved", label: "Resolved" },
] as const;

/* -------------------------------------------------------------------------- */
/*                       DISPUTES & SUPPORT (phase 2)                           */
/* -------------------------------------------------------------------------- */

export const DISPUTE_STATUS_OPTIONS = [
  all,
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Resolved", label: "Resolved" },
] as const;

export const DISPUTE_PRIORITY_OPTIONS = [
  all,
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
] as const;

export const DISPUTE_CATEGORY_OPTIONS = [
  allTypes,
  { value: "Task Dispute", label: "Task Dispute" },
  { value: "Payment Issue", label: "Payment Issue" },
  { value: "Account Issue", label: "Account Issue" },
  { value: "Technical Support", label: "Technical Support" },
  { value: "Other", label: "Other" },
] as const;

export const SUPPORT_TICKET_STATUS_OPTIONS = [
  all,
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
] as const;

export const SUPPORT_TICKET_PRIORITY_OPTIONS = [
  all,
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
] as const;

/* -------------------------------------------------------------------------- */
/*                       SETTINGS / NOTIFICATIONS / USER-ACCESS (phase 2)     */
/* -------------------------------------------------------------------------- */

export const ADMIN_ROLE_OPTIONS = [
  { value: "super_admin", label: "Super Admin" },
  { value: "finance_admin", label: "Finance Admin" },
  { value: "support_admin", label: "Support Admin" },
  { value: "operations_admin", label: "Operations Admin" },
] as const;

export const ADMIN_USER_STATUS_OPTIONS = [
  all,
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
] as const;

export const NOTIFICATION_AUDIENCE_OPTIONS = [
  { value: "all", label: "All Users" },
  { value: "runners", label: "Runners" },
  { value: "requesters", label: "Requesters" },
  { value: "admins", label: "Admins" },
] as const;

export const NOTIFICATION_CHANNEL_OPTIONS = [
  { value: "push", label: "Push Notification" },
  { value: "email", label: "Email" },
  { value: "sms", label: "SMS" },
  { value: "in_app", label: "In-App" },
] as const;

export const NOTIFICATION_MESSAGE_TYPE_OPTIONS = [
  { value: "system", label: "System" },
  { value: "custom", label: "Custom" },
] as const;

/** Sentinel for the format dropdown in export menus. */
export const EXPORT_FORMATS = [
  { value: "csv", label: "Export as CSV" },
  { value: "excel", label: "Export as Excel" },
] as const;
export type ExportFormat = (typeof EXPORT_FORMATS)[number]["value"];

export const EXPORT_MIME_TYPES: Record<ExportFormat, string> = {
  csv: "text/csv",
  excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};
