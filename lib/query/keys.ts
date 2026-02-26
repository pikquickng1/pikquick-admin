/**
 * TanStack Query key factories. Use for cache invalidation and consistent keys.
 */

export const queryKeys = {
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => [...queryKeys.dashboard.all, "stats"] as const,
  },
  users: {
    all: ["admin", "users"] as const,
    list: (params?: unknown) => [...queryKeys.users.all, "list", params] as const,
    detail: (id: string) => [...queryKeys.users.all, "detail", id] as const,
  },
  withdrawals: {
    all: ["admin", "withdrawals"] as const,
    list: (params?: unknown) =>
      [...queryKeys.withdrawals.all, "list", params] as const,
  },
  wallets: {
    all: ["admin", "wallets"] as const,
    list: (params?: unknown) =>
      [...queryKeys.wallets.all, "list", params] as const,
  },
  escrow: {
    all: ["escrow", "admin"] as const,
    statistics: () => [...queryKeys.escrow.all, "statistics"] as const,
  },
  tasks: {
    all: ["admin", "tasks"] as const,
    list: (params?: unknown) => [...queryKeys.tasks.all, "list", params] as const,
    reportedIssues: () =>
      [...queryKeys.tasks.all, "reported-issues"] as const,
  },
  runners: {
    all: ["admin", "runners"] as const,
    subscriptionStats: () =>
      [...queryKeys.runners.all, "subscription-stats"] as const,
  },
  runnerProfile: {
    all: ["runner-profile", "admin"] as const,
    statistics: () => [...queryKeys.runnerProfile.all, "statistics"] as const,
  },
  systemSettings: {
    all: ["admin", "system-settings"] as const,
    list: () => [...queryKeys.systemSettings.all, "list"] as const,
    byKey: (key: string) =>
      [...queryKeys.systemSettings.all, "key", key] as const,
    autoDeductionConfig: () =>
      [...queryKeys.systemSettings.all, "auto-deduction-config"] as const,
  },
  feedback: {
    all: ["admin", "feedback"] as const,
    list: (params?: unknown) =>
      [...queryKeys.feedback.all, "list", params] as const,
    detail: (id: string) => [...queryKeys.feedback.all, "detail", id] as const,
  },
  runnerDocuments: {
    all: ["admin", "runner-documents"] as const,
    list: (params?: unknown) =>
      [...queryKeys.runnerDocuments.all, "list", params] as const,
    pending: () => [...queryKeys.runnerDocuments.all, "pending"] as const,
    byRunner: (runnerId: string) =>
      [...queryKeys.runnerDocuments.all, "runner", runnerId] as const,
    verificationStatus: (runnerId: string) =>
      [...queryKeys.runnerDocuments.all, "verification-status", runnerId] as const,
  },
  documentTypes: {
    all: ["admin", "document-types"] as const,
    list: () => [...queryKeys.documentTypes.all, "list"] as const,
    detail: (id: string) =>
      [...queryKeys.documentTypes.all, "detail", id] as const,
  },
  taskCategories: {
    all: ["admin", "task-categories"] as const,
    list: () => [...queryKeys.taskCategories.all, "list"] as const,
    detail: (id: string) =>
      [...queryKeys.taskCategories.all, "detail", id] as const,
  },
} as const;
