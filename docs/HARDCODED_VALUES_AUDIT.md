# Hardcoded Values Audit — pikquick-admin

**Scope:** `users` (requesters, runners), `tasks`, `finance` (payouts, transactions, wallets, revenue-reports)
**Repo:** `/Users/almajiris-machine/workspace/pikquick/pikquick-admin`
**Status:** No code changed. Report only.

---

## 0. Existing utilities that the modules ignore

These already exist and should be reused before adding new ones:

| Existing | Path | Currently used by users / tasks / finance? |
|---|---|---|
| `formatNgn()`, `koboToNgn()`, `ngnToKobo()` | `lib/utils/money.ts:5-23` | Used by **1 of ~30** currency-formatting sites |
| `UserRole`, `UserStatus`, `WithdrawalStatus`, `DocumentVerificationStatus`, `TaskStatus`, `WalletStatus` | `lib/types/enums.ts:5-50` | Mostly **unused** by features |
| `colors.semantic.{success,warning,error,info}` | `lib/design-tokens.ts:31-36` | Never imported by feature components |
| `apiConfig.baseURL` | `lib/api/config.ts:10` | Service layer uses it; components sometimes use raw `fetch()` |

---

## 1. USERS Module

### 1.1 Duplicated user status enums (Title-cased, ignore canonical enum)

| File | Line | Value |
|---|---|---|
| `features/users/requesters/types/requester.types.ts` | 9 | `status: "Active" \| "Suspended" \| "Inactive"` |
| `features/users/requesters/types/requester-list.types.ts` | 8 | `status: "Active" \| "Suspended" \| "Inactive"` |
| `features/users/runners/types/runner.types.ts` | 11 | `status: "Available" \| "Unavailable" \| "Suspended"` |
| `features/users/runners/types/runner-list.types.ts` | 10 | `status: "Available" \| "Unavailable" \| "Suspended"` |
| `features/users/requesters/components/RequesterListFilters.tsx` | 17 | `["All Status","Active","Suspended","Inactive"]` |
| `features/users/runners/components/RunnerListFilters.tsx` | 17 | `["All Status","Available","Unavailable","Suspended"]` |
| `features/users/requesters/components/RequesterAdminActions.tsx` | 13 | `accountStatus: "Active" \| "Suspended" \| "Inactive"` |
| `features/users/runners/components/RunnerAdminActions.tsx` | 15 | `accountStatus: "Available" \| "Unavailable" \| "Suspended"` |

### 1.2 Lowercase ↔ TitleCase mapping duplicated 4×

| File | Line | Snippet |
|---|---|---|
| `features/users/requesters/lib/mapAdminUserToRequester.ts` | 4-15 | switch `"active"\|"suspended"\|"inactive"\|"deleted"` |
| `features/users/requesters/lib/mapAdminUserToRequesterDetail.ts` | 4-13 | same |
| `features/users/runners/lib/mapAdminUserToRunner.ts` | 4-17 | same |
| `features/users/runners/lib/mapAdminUserToRunnerDetail.ts` | 4-13 | same |

### 1.3 KYC statuses (inconsistent casing)

| File | Line | Value |
|---|---|---|
| `features/users/runners/types/runner.types.ts` | 9 | `"Verified" \| "Pending" \| "Failed" \| "unverified"` (last is lowercase!) |
| `features/users/runners/types/runner-list.types.ts` | 6 | `"Verified" \| "Pending" \| "Failed"` |
| `features/users/runners/components/RunnerKYCTab.tsx` | 9 | `"Verified" \| "Pending" \| "Rejected"` (different!) |
| `features/users/runners/components/RunnerListTable.tsx` | 35-46 | color switch on `"Verified"\|"Pending"\|"Failed"` |

Canonical `DocumentVerificationStatus` in `lib/types/enums.ts:28-34` is **not used**.

### 1.4 Transaction / Task statuses duplicated in user types

| File | Line | Value |
|---|---|---|
| `features/users/requesters/types/requester.types.ts` | 20 | `"completed"\|"pending"\|"failed"` (transaction) |
| `features/users/requesters/types/requester.types.ts` | 33 | `"completed"\|"active"\|"cancelled"` (task) |
| `features/users/requesters/types/payment.types.ts` | 6 | `"completed"\|"pending"\|"failed"` (payment) — **exact dup of line 20** |
| `features/users/runners/types/runner.types.ts` | 24, 37 | same two unions |

### 1.5 Pagination limit `LIMIT = 20` repeated 6×

| File | Line |
|---|---|
| `features/users/requesters/hooks/useRequesterList.ts` | 8 |
| `features/users/runners/hooks/useRunnerList.ts` | 8 |
| `features/users/requesters/api/requesterApi.ts` | 14, 57, 67 |
| `features/users/runners/api/runnerApi.ts` | 13, 57 |

`SEARCH_DEBOUNCE_MS = 300` duplicated at `features/users/requesters/components/RequestersList.tsx:13` and `features/users/runners/components/RunnersList.tsx:13`.

### 1.6 Currency formatting — identical block in 9 files

```ts
new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 })
```

Found in:
- `features/users/runners/components/RunnerListTable.tsx:28-30`
- `features/users/runners/components/RunnerWalletTab.tsx:19-21`
- `features/users/runners/components/RunnerTaskRecordsTab.tsx:21-23`
- `features/users/requesters/components/RequesterListTable.tsx:27-29`
- `features/users/requesters/components/RequesterWalletSummaryCards.tsx:9-11`
- `features/users/requesters/components/RequesterWalletTransactions.tsx:10-12`
- `features/users/requesters/components/RequesterPaymentTable.tsx:10-12`
- `features/users/requesters/components/RequesterTaskHistoryTable.tsx:10-12`
- `features/users/components/RequesterTransactions.tsx:9-11`

`lib/utils/money.ts:formatNgn` already exists — should replace all 9 sites.

### 1.7 Date locale inconsistency

| Locale | Files |
|---|---|
| `"en-US"` | `features/users/requesters/components/RequesterDetails.tsx:114`, `RequesterPersonalInfo.tsx:44`, `RunnerDetails.tsx:145`, `RunnerPersonalInfo.tsx:68`, `components/RequesterTransactions.tsx:17` |
| `"en-NG"` | `features/users/requesters/lib/mapAdminUserToRequesterDetail.ts:18`, `features/users/runners/lib/mapAdminUserToRunnerDetail.ts:18` |

### 1.8 Hardcoded mock data in runners tabs

| File | Lines | What |
|---|---|---|
| `features/users/runners/components/RunnerKYCTab.tsx` | 13-38 | `kycDocuments` array (id 1/2/3, all verified `"Oct 15, 2025"`) |
| `features/users/runners/components/RunnerRatingTab.tsx` | 24-60 | 5 reviews (all `"Chioma O."`, `"2025-10-28"`, rating 5) |
| `features/users/runners/components/RunnerRatingTab.tsx` | 62-64 | `averageRating=4.8, totalReviews=4, completedTasks=138` |
| `features/users/runners/components/RunnerRatingTab.tsx` | 19-21 | `totalPages=13, itemsPerPage=8, totalItems=100` |
| `features/users/runners/components/RunnerWalletTab.tsx` | 27-32 | 4 `dailyPayments` entries (`amount: 100`) |
| `features/users/runners/components/RunnerWalletTab.tsx` | 34 | `lastPaymentDate = "October 30, 2025 at 6:00 AM"` |
| `features/users/runners/components/RunnerTaskRecordsTab.tsx` | 14-18 | `totalPages=13, itemsPerPage=8, totalItems=100, completedTasks=138, totalTasks=145` |

### 1.9 Duplicate mapper exports (likely a copy-paste bug)

The same function is exported from two files in each feature:

| Function | Files |
|---|---|
| `mapAdminUserToRequester` | `features/users/requesters/lib/mapAdminUserToRequester.ts:17` AND `features/users/requesters/lib/mapAdminUserToRequesterDetail.ts:28` |
| `mapAdminUserToRunner` | `features/users/runners/lib/mapAdminUserToRunner.ts:20` AND `features/users/runners/lib/mapAdminUserToRunnerDetail.ts:28` |

### 1.10 Hardcoded transport mode

| File | Line | Value |
|---|---|---|
| `features/users/runners/lib/mapAdminUserToRunnerDetail.ts` | 38 | `transportMode: "motorcycle"` |
| `features/users/runners/components/RunnerPersonalInfo.tsx` | 43 | `"Motorcycle"` |
| `features/users/runners/components/RunnerDetails.tsx` | 105 | `🏍️ Motorcycle` |

### 1.11 Hardcoded magic numbers / fallbacks

| File | Line | Value |
|---|---|---|
| `features/users/runners/components/RunnerAvailabilityPerformance.tsx` | 8-10 | `(tasksCompleted / (tasksCompleted + 10)) * 100` (magic 10) |
| `features/users/runners/components/RunnerAvailabilityPerformance.tsx` | 53 | `runner.tasksCompleted + 7` (magic 7) |
| `features/users/requesters/components/AdjustWalletModal.tsx` | 114-115 | `min="0" step="0.01"` |
| `features/users/runners/components/RunnerRatingTab.tsx` | 84 | `[...Array(5)]` (max rating count) |

---

## 2. TASKS Module

### 2.1 Display-form task status enum duplicated 8 times

`"In Progress" | "Completed" | "Pending" | "Cancelled"` redeclared in:

1. `features/tasks/types/task.types.ts:40`
2. `features/tasks/types/task.types.ts:57`
3. `features/tasks/lib/mapAdminTaskToListItem.ts:6`
4. `features/tasks/hooks/useTaskList.ts:14-22`
5. `features/tasks/components/TaskListFilters.tsx:17`
6. `features/tasks/components/TasksList.tsx` (initial filter state, L34)
7. `features/tasks/components/TaskListTable.tsx:36-46` (color switch)
8. `features/tasks/components/TaskDetails.tsx:129-138` (color switch — identical body)

Backend enum `TaskStatus` in `lib/types/enums.ts:37-43` (`"pending"|"task_assigned"|"completed"|"cancelled"`) is **never used**.

### 2.2 Snake_case ↔ Display mapping duplicated with conflicting defaults

| File | Lines | Default |
|---|---|---|
| `features/tasks/lib/mapAdminTaskToListItem.ts` | 8-21 | `"Pending"` |
| `features/tasks/hooks/useTaskList.ts` | 13-24 | `undefined` |

### 2.3 Bid status enum duplicated

| File | Line | Value |
|---|---|---|
| `features/tasks/types/task.types.ts` | 6 | `"Accepted"\|"Declined"\|"Pending"` |
| `features/tasks/components/TaskBudgetBids.tsx` | 11 | same union redeclared locally |
| `features/tasks/components/TaskBudgetBids.tsx` | 30-34 | color switch |

### 2.4 Delivery file type union duplicated

| File | Line | Value |
|---|---|---|
| `features/tasks/types/task.types.ts` | 25 | `"receipt"\|"photo"` |
| `features/tasks/components/TaskDeliveryEvidence.tsx` | 8 | same union redeclared |

### 2.5 Payment type enum duplicated

`"card" | "wallet"` typed in `features/tasks/types/task.types.ts:16` AND inline-cast at `features/tasks/components/CreateTaskModal.tsx:33,103,255`.

### 2.6 Inline currency formatting duplicated

```ts
new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 })
```

- `features/tasks/components/TaskBudgetBids.tsx:21-23`
- `features/tasks/components/TaskListTable.tsx:27-29`

(`formatNgn` from `lib/utils/money.ts` not used.)

### 2.7 Naira symbol `₦` hardcoded in labels

- `features/tasks/components/CreateTaskModal.tsx:172` — `Budget (₦)`
- `features/tasks/components/IssueRefundModal.tsx:61` — `Refund Amount (₦)`

### 2.8 Magic numbers in CreateTask / IssueRefund modals

| File | Line | Value | Context |
|---|---|---|---|
| `features/tasks/components/CreateTaskModal.tsx` | 47 | `limit: 100` | requester list page size |
| `features/tasks/components/CreateTaskModal.tsx` | 66 | `setHours(... + 24)` | default bidding end (24h) |
| `features/tasks/components/CreateTaskModal.tsx` | 178 | `placeholder="5000"` | budget placeholder |
| `features/tasks/components/CreateTaskModal.tsx` | 179 | `min="500"` | budget minimum |
| `features/tasks/components/IssueRefundModal.tsx` | 20 | `taskBudget = 0` | default |
| `features/tasks/components/IssueRefundModal.tsx` | 26 | `numAmount <= taskBudget` | validation cap |
| `features/tasks/components/IssueRefundModal.tsx` | 67 | `placeholder="2500"` | refund placeholder |
| `features/tasks/components/IssueRefundModal.tsx` | 70 | `step="0.01"` | number step |

### 2.9 Pagination constant local & inconsistent

| File | Line | Value |
|---|---|---|
| `features/tasks/hooks/useTaskList.ts` | 9 | `LIMIT = 20` (local only) |
| `features/tasks/api/taskApi.ts` | 6 | `page: number = 1` (default) |

### 2.10 Raw `fetch()` bypasses the service layer

`features/tasks/components/CreateTaskModal.tsx:68` — `fetch("/api/tasks")` directly. Other CRUD in the same file goes through the service. Inconsistent + ignores `apiConfig.baseURL`.

### 2.11 Hardcoded mock data in `taskApi.ts`

| File | Line | Value |
|---|---|---|
| `taskApi.ts` | 13 | `"Grocery Shopping at Shoprite"` |
| `taskApi.ts` | 14, 42 | `"Adewale Johnson"` |
| `taskApi.ts` | 15 | `"Unassigned"`, `"Ibrahim Musa"` |
| `taskApi.ts` | 16, 46, 56, 63, 70 | `2500, 2500, 2500, 2800, 3800` |
| `taskApi.ts` | 29-31 | `13, 100, 8` (mock pagination) |
| `taskApi.ts` | 50 | `"Lekki, Lagos"` |
| `taskApi.ts` | 55, 69 | `4.8` (rating) |
| `taskApi.ts` | 100 | `100` (progress) |
| `taskApi.ts` | 126 | `"/files/receipt.pdf"` |
| `taskApi.ts` | 132 | `"/files/delivery-photo.jpg"` |
| `taskApi.ts` | 141-143 | `1145, 12500, 362` (stats) |
| `taskApi.ts` | 17, 47, 78, 84, 90, 96, 106, 112, 118 | hardcoded dates `"2025-10-28..."` |

`"Unassigned"` literal duplicated at `features/tasks/components/TaskListTable.tsx:76`.

### 2.12 Hardcoded display IDs / names in `TaskDetails.tsx`

| Line | Value |
|---|---|
| 280 | `"REQ001 • Total Tasks Posted: 24"` |
| 290, 359 | `"+234 801 234 5678"` |
| 294, 363 | `"Joined January 15, 2025"` |
| 318 | `"Verified"` (literal status) |
| 326 | `"REQ0001"` |
| 328 | `"🏍️ Motorcycle"` |
| 334 | `"4.8 (145 tasks)"` |
| 349 | `"138 completed"` |
| 386, 394 | `"Lekki Lagos"` |

### 2.13 Hardcoded colors duplicated

Status color switch identical in `TaskDetails.tsx:129-138` and `TaskListTable.tsx:36-46` — `bg-blue-100 text-blue-700` (In Progress), `bg-green-100 text-green-700` (Completed), `bg-yellow-100 text-yellow-700` (Pending), `bg-red-100 text-red-700` (Cancelled), `bg-gray-100 text-gray-700` (default).

Also: `bg-green-100 text-green-600` (`TaskDetails.tsx:318`), `bg-blue-50 text-blue-600` (`TaskDetails.tsx:327`), `fill-yellow-400 text-yellow-400` (stars at `TaskDetails.tsx:333`, `TaskBudgetBids.tsx:65`), stat-card colors in `TasksList.tsx:124,134,144`.

### 2.14 Ternary bug

`features/tasks/components/TaskDetails.tsx:402` — `task.bids && task.bids.length > 0 ? task.budget : task.budget` (both branches identical).

### 2.15 Status-color/badge enums and label strings (i18n candidates)

Every page-title, button-label, tab-label, column-header, empty-state, error-state is a literal string (no i18n lib installed). Examples:

- `TasksList.tsx:30,35,80,90,92,102,130,140,150` — page title, sort options, stat labels
- `TaskListFilters.tsx:17-18,26` — status + sort dropdowns + search placeholder
- `TaskListTable.tsx:52,59,66,73,76,82,89,96,109,116,131` — column headers + "Unassigned" + empty state
- `CreateTaskModal.tsx:120-279` — entire modal copy
- `IssueRefundModal.tsx:44-90` — entire modal copy
- `TaskDetails.tsx:118-411` — entire detail view copy
- `TaskBudgetBids.tsx:43,47,86`, `TaskChatLog.tsx:19,35`, `TaskDeliveryEvidence.tsx:28,56`, `TaskTimelineStatus.tsx:21,27,70`

(Full enumeration in the audit output above.)

---

## 3. FINANCE Module

### 3.1 Payout status enum duplicated 6× while `WithdrawalStatus` exists in `enums.ts`

| File | Line | Value |
|---|---|---|
| `features/finance/payout-requests/types/payout.types.ts` | 11 | `"Pending" \| "Completed" \| "Rejected"` |
| `features/finance/payout-requests/components/PayoutDetailsModal.tsx` | 51-55 | color switch |
| `features/finance/payout-requests/components/PayoutListTable.tsx` | 46-50 | color switch (duplicate) |
| `features/finance/payout-requests/components/PayoutListFilters.tsx` | 24 | `["All Status","Pending","Completed","Rejected"]` |
| `features/finance/payout-requests/components/PayoutRequestsList.tsx` | 31 | `"All Status"` default |
| `features/finance/payout-requests/lib/mapWithdrawalToPayoutRequest.ts` | 7-16 | map + return type |
| `features/finance/payout-requests/hooks/usePayoutList.ts` | 12-18 | `statusToApi` switch |

Canonical `WithdrawalStatus` in `lib/types/enums.ts:20-25` (`pending|successful|failed|reversed`) is **never imported**.

### 3.2 Transaction status enum duplicated 4× — no central enum

| File | Line | Value |
|---|---|---|
| `features/finance/transactions/types/transaction.types.ts` | 9 | `"Completed" \| "Pending" \| "Failed"` |
| `features/finance/transactions/components/TransactionListFilters.tsx` | 41 | `["All Status","Completed","Pending","Failed"]` |
| `features/finance/transactions/components/TransactionDetailsModal.tsx` | 48-52 | color switch |
| `features/finance/transactions/components/TransactionListTable.tsx` | 55-59 | color switch (duplicate) |
| `features/finance/transactions/components/TransactionsList.tsx` | 29 | `"All Status"` default |

**Missing from `lib/types/enums.ts`: a `TransactionStatus` enum.**

### 3.3 Transaction type union duplicated

| File | Line | Value |
|---|---|---|
| `features/finance/transactions/types/transaction.types.ts` | 6 | `"Task Payment" \| "Daily Access" \| "Wallet Top-up" \| "Refund" \| "Withdrawal"` |
| `features/finance/transactions/components/TransactionListFilters.tsx` | 32-39 | same array as dropdown |
| `features/finance/transactions/components/TransactionsList.tsx` | 28 | `"All Types"` default |

### 3.4 `userType` casing inconsistency

| File | Line | Value |
|---|---|---|
| `features/finance/transactions/types/transaction.types.ts` | 5 | `"Requester" \| "Runner"` (Title Case) |
| `features/finance/wallets/types/wallet.types.ts` | 5 | `"requester" \| "runner"` (lowercase) |

Also compared as literal in `features/finance/wallets/components/WalletListTable.tsx:15,16,115,117,125,127`, `WalletsOverview.tsx:15`, `useWalletList.ts:12`, `mapAdminWalletToWallet.ts:6`.

### 3.5 Wallet credit/debit type duplicated everywhere

`"credit" | "debit"` literal at `features/finance/wallets/types/transaction.types.ts:3` and as switch values in `WalletHistorySlideOver.tsx:114,118,133,136,146` (5 places).

### 3.6 `formatCurrency` duplicated in 10 files

```ts
new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 })
```

- `features/finance/payout-requests/components/PayoutDetailsModal.tsx:32-38`
- `features/finance/payout-requests/components/PayoutListTable.tsx:27-33`
- `features/finance/payout-requests/components/PayoutRequestsList.tsx:97-103`
- `features/finance/transactions/components/TransactionDetailsModal.tsx:25-31`
- `features/finance/transactions/components/TransactionListTable.tsx:26-32`
- `features/finance/transactions/components/TransactionsList.tsx:76-82`
- `features/finance/wallets/components/WalletHistorySlideOver.tsx:17-23`
- `features/finance/wallets/components/WalletListTable.tsx:30-36`
- `features/finance/wallets/components/WalletsOverview.tsx:44-50`
- `features/finance/revenue-reports/components/RevenueReports.tsx:31-37`

`lib/utils/money.ts:formatNgn` should replace every one.

### 3.7 `formatDate` / `formatDateTime` / `formatTime` duplicated 9 times

- `PayoutDetailsModal.tsx:40-47`
- `PayoutListTable.tsx:35-42` (dup)
- `mapWithdrawalToPayoutRequest.ts:20-27`
- `TransactionDetailsModal.tsx:33-44`
- `TransactionListTable.tsx:34-42` + `:44-51`
- `WalletHistorySlideOver.tsx:25-31` + `:33-38`
- `WalletListTable.tsx:38-45` + `:47-53`

Different bodies, same intent. Should be a single `formatDate` / `formatDateTime` in `lib/utils/date.ts`.

### 3.8 Date filter dropdown exact-duplicate

```ts
["November 2025", "October 2025", "September 2025", "This Year", "All Time"]
```

- `features/finance/payout-requests/components/PayoutRequestsList.tsx:24,105-111`
- `features/finance/transactions/components/TransactionsList.tsx:22,84-90`

### 3.9 Pagination limits inconsistent

| File | Line | Value |
|---|---|---|
| `payout-requests/hooks/usePayoutList.ts` | 9 | `LIMIT = 20` |
| `wallets/hooks/useWalletList.ts` | 9 | `LIMIT = 20` |
| `transactions/api/transactionApi.ts` | 18 | `pageSize: 10` |
| `transactions/hooks/useTransactionList.ts` | 14 | `itemsPerPage: 8` (default state) |
| `wallets/api/walletApi.ts` | 32-34 | `totalPages:13, totalItems:100, itemsPerPage:8` (mock) |
| `payout-requests/api/payoutApi.ts` | 39-41 | `totalPages:10, totalItems:60, itemsPerPage:6` (mock) |

### 3.10 Mock API delays (no config)

- `payoutApi.ts:15,48,68` → 300ms
- `payoutApi.ts:80,86` → 500ms
- `payoutApi.ts:95` → 800ms
- `walletApi.ts:16,41,59` → 300ms
- `transactionApi.ts:6` → 300ms
- `revenueApi.ts:5` → 300ms

### 3.11 "Paystack" hardcoded as a payment gateway fallback

- `features/finance/transactions/components/TransactionDetailsModal.tsx:158`
- `features/finance/wallets/api/transactionApi.ts:26` (mock description)

### 3.12 Naira symbol `₦` not present in finance, but currency code `"NGN"` and locale `"en-NG"` are — see 3.6.

### 3.13 Chart / stat-card colors duplicated & bypassing tokens

- Revenue chart hex colors `#3B82F6 / #10B981 / #F59E0B / #8B5CF6 / #E5E7EB / #6B7280 / #8884d8` at `revenueApi.ts:23-26` and `RevenueReports.tsx:146-180` (could come from `lib/design-tokens.ts:colors.semantic`).
- Stat-card icon backgrounds `bg-blue-100 / bg-green-100 / bg-purple-100 / bg-orange-100 / bg-red-100` duplicated across `TransactionsList.tsx:148-178`, `WalletsOverview.tsx:79-105`, `RevenueReports.tsx:104-132`.
- Modal action buttons `bg-red-500 hover:bg-red-600`, `bg-green-500 hover:bg-green-600`, `bg-blue-500 hover:bg-blue-600` in `PayoutDetailsModal.tsx:209,215,277,313` and `TransactionDetailsModal.tsx:203`.

### 3.14 Status color logic duplicated 4×

The same `bg-green-100 text-green-700 / bg-yellow-100 text-yellow-700 / bg-red-100 text-red-700 / bg-gray-100 text-gray-700` switch exists at:

- `PayoutDetailsModal.tsx:49-59` (uses `"Rejected"`)
- `PayoutListTable.tsx:44-54` (uses `"Rejected"`)
- `TransactionDetailsModal.tsx:46-56` (uses `"Failed"`)
- `TransactionListTable.tsx:53-63` (uses `"Failed"`)

### 3.15 Em-dash `"—"` placeholder scattered

`features/finance/payout-requests/lib/mapWithdrawalToPayoutRequest.ts:21,25,33,37,38` (5× in one file) and `features/finance/wallets/lib/mapAdminWalletToWallet.ts:11,14`.

### 3.16 Hardcoded "Search by ..." placeholders duplicated

- `"Search by name, email or phone number"` — `PayoutListFilters.tsx:45`, `TransactionListFilters.tsx:63`
- `"Search by name or ID"` — `WalletListFilters.tsx:37`

### 3.17 Hardcoded mock personal data

`"Adewale Johnson"`, `"adewale@example.com"`, `"+234 123 456 7890"`, `"GTBank"`, `"0123456789"`, `"REQ001"` duplicated across `payoutApi.ts`, `walletApi.ts`, `transactionApi.ts`.

### 3.18 Chart sizes / modal sizes

- `RevenueReports.tsx:144,171,179,161,162` — `height={300}`, `outerRadius={100}`, `strokeWidth={2}`, `r: 4`
- `WalletHistorySlideOver.tsx:49` — `w-full max-w-2xl`
- `PayoutDetailsModal.tsx:97,230,288` — `sm:max-w-lg`, `sm:max-w-md`

### 3.19 i18n-candidate label strings

Every page title, modal title, button label, stat label, tab label, empty state, error message is a literal string. Full list spans `PayoutRequestsList.tsx`, `PayoutDetailsModal.tsx`, `PayoutListFilters.tsx`, `PayoutListTable.tsx`, `TransactionsList.tsx`, `TransactionDetailsModal.tsx`, `TransactionListFilters.tsx`, `TransactionListTable.tsx`, `WalletsOverview.tsx`, `WalletListFilters.tsx`, `WalletListTable.tsx`, `WalletHistorySlideOver.tsx`, `RevenueReports.tsx`, plus every hook (`usePayout.ts`, `usePayoutActions.ts`, `useTransaction.ts`, `useTransactionList.ts`, `useTransactionStats.ts`, `useWallet.ts`, `useTransactionHistory.ts`, `useWalletStats.ts`, `useWalletList.ts`, `useRevenueData.ts`).

---

## 4. Cross-cutting duplications (HIGHEST priority)

1. **`Intl.NumberFormat("en-NG", … NGN)`** appears **~21 times** across users / tasks / finance; replace with `formatNgn` from `lib/utils/money.ts`.
2. **`getStatusColor(status)` switch** is duplicated **8+ times** (status + bid + transaction + payout). Replace with one helper in `lib/utils/status.ts`.
3. **Title-case status unions** (`"In Progress" | "Completed" | …`, `"Pending" | "Completed" | "Rejected"`, `"Active" | "Suspended" | "Inactive"`, etc.) — extract to a single `displayStatus.ts` map keyed by the canonical `enums.ts` value, or use canonical enums and add display formatters.
4. **`LIMIT = 20` / `pageSize: 10` / `itemsPerPage: 8`** — centralize in `lib/config/pagination.ts`.
5. **API endpoint strings** — split between service classes and `fetch("/api/tasks")` literal at `CreateTaskModal.tsx:68`. Move every URL into the service layer.
6. **Date locale `"en-NG"` vs `"en-US"`** — pick one (`en-NG`) and centralize via `formatDate` / `formatDateTime` helpers.
7. **Naira symbol `₦`** — never hardcode; get it from a `CURRENCY_SYMBOL` constant or `formatNgn()`.
8. **`"All Status"` / `"All Types"` sentinel** — define `const ALL_FILTER = "__all__"` (or similar) and use it everywhere instead of magic display strings.
9. **`formatDate` / `formatDateTime`** — 9 different implementations across finance; one helper in `lib/utils/date.ts`.
10. **Hardcoded color classes (`bg-green-100 text-green-700` etc.)** — replace with a `statusBadgeClass(status)` helper. Status tokens already exist at `lib/design-tokens.ts:31-36` (`semantic.success / warning / error / info`) but are not used by features.
11. **Duplicate mapper exports** in `features/users/{requesters,runners}/lib/` — pick one definition, delete the other.
12. **Mock personal data + mock dates + mock stats** still present in production code paths in `taskApi.ts`, `walletApi.ts`, `transactionApi.ts`, `payoutApi.ts`, `revenueApi.ts`, plus `RunnerKYCTab.tsx`, `RunnerRatingTab.tsx`, `RunnerWalletTab.tsx`, `RunnerTaskRecordsTab.tsx`. Remove or gate behind a `NEXT_PUBLIC_USE_MOCKS=true` flag.

---

## 5. Proposed fixes (per finding category)

### Fix A — Centralize money & dates (touches ~30 files)

1. Already done: `lib/utils/money.ts` has `formatNgn`, `koboToNgn`, `ngnToKobo`.
2. Add `lib/utils/date.ts` exporting:
   ```ts
   export const LOCALE = "en-NG";
   export function formatDate(d: string | Date): string
   export function formatDateTime(d: string | Date): string
   export function formatTime(d: string | Date): string
   ```
3. Add `lib/config/pagination.ts`:
   ```ts
   export const DEFAULT_PAGE_SIZE = 20;
   export const TRANSACTION_PAGE_SIZE = 10;
   ```
4. Grep-replace `new Intl.NumberFormat("en-NG", …)` → `formatNgn(amount)`.
5. Grep-replace ad-hoc `Intl.DateTimeFormat` blocks → `formatDate`/`formatDateTime`.

### Fix B — Centralize status enums + colors

1. Extend `lib/types/enums.ts` with:
   - `TransactionStatus = { PENDING, COMPLETED, FAILED }`
   - `TransactionType = { TASK_PAYMENT, DAILY_ACCESS, WALLET_TOPUP, REFUND, WITHDRAWAL }`
   - `UserType = { REQUESTER: "requester", RUNNER: "runner" }`
   - `WalletTxType = { CREDIT: "credit", DEBIT: "debit" }`
   - `BidStatus`, `DeliveryFileType`, `TaskDisplayStatus` (TitleCase mappings), `KycDisplayStatus`.
2. Add `lib/utils/status.ts`:
   ```ts
   export const STATUS_LABEL: Record<TaskStatus, string> = { … };
   export function statusBadgeClass(s: string): string
   export function statusToApi(s: string): TaskStatus | undefined
   export function apiToStatusLabel(s: string): string
   ```
3. Replace every `case "Active": return …` / `case "Pending": return …` switch with `statusBadgeClass(status)`.
4. Replace Title-case unions in feature types with `TaskDisplayStatus`, `PayoutDisplayStatus`, etc.
5. Make the 4×4 status mapping a single source of truth in `lib/types/enums.ts` + display labels in `lib/i18n/en.ts` (or status util).

### Fix C — Centralize filter defaults & sentinels

1. Add `lib/constants/filters.ts`:
   ```ts
   export const ALL_STATUS = "__all__";
   export const STATUS_FILTER_OPTIONS = [{ value: ALL_STATUS, label: "All Status" }, …];
   export const SORT_OPTIONS = { tasks: […], users: […] };
   export const DATE_FILTER_OPTIONS = ["Today","This Week","This Month","All Time"];
   ```
2. Replace all `["All Status", …]` arrays with the constant.
3. Replace `filters.status !== "All Status" ? …` with `filters.status !== ALL_STATUS`.

### Fix D — API endpoints + base URL

1. All endpoints already live in `lib/services/*.service.ts` (good).
2. Move the lone `fetch("/api/tasks")` at `CreateTaskModal.tsx:68` into a `tasksService.create()` method that uses `apiConfig.baseURL`.
3. Add a `paystack` (or generic `paymentGateway`) constant — replace `"Paystack"` literal at `TransactionDetailsModal.tsx:158`.

### Fix E — Colors → tokens

1. Add to `lib/design-tokens.ts`:
   ```ts
   export const statusColors = {
     success: { bg: "bg-green-100", text: "text-green-700", dot: "#10b981" },
     warning: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "#f59e0b" },
     error:   { bg: "bg-red-100",    text: "text-red-700",    dot: "#ef4444" },
     info:    { bg: "bg-blue-100",   text: "text-blue-700",   dot: "#3b82f6" },
     neutral: { bg: "bg-gray-100",   text: "text-gray-700",   dot: "#9ba3ad" },
   } as const;
   ```
2. Export a single `<StatusBadge status="…" />` component used everywhere instead of 8+ inline color switches.

### Fix F — i18n (out of scope to add a lib in this audit, but planned)

1. Pick a library (`next-intl` fits Next 16 App Router).
2. Add `messages/en.json` with all the literal strings enumerated in sections 1.11, 2.15, 3.19.
3. Replace literals with `t("users.requesters.title")`, etc.

### Fix G — Mock data in production paths

1. Move `payoutApi.ts`, `walletApi.ts`, `transactionApi.ts`, `taskApi.ts`, `revenueApi.ts`, `RunnerKYCTab.tsx`, `RunnerRatingTab.tsx`, `RunnerWalletTab.tsx`, `RunnerTaskRecordsTab.tsx` mocks behind:
   ```ts
   const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === "true";
   ```
2. Otherwise return `Promise.reject(new Error("Mock disabled"))` so missing real APIs surface immediately.

### Fix H — Duplicate mapper exports

1. Delete the duplicate `mapAdminUserToRequester` from `mapAdminUserToRequesterDetail.ts` and import from the canonical file (or vice versa).
2. Same for `mapAdminUserToRunner`.

### Fix I — Misc

| Finding | Proposed change |
|---|---|
| `RunnerAvailabilityPerformance.tsx:8-10,53` magic `10` and `7` | Name them `TASKS_DENOMINATOR_OFFSET = 10`, `TASKS_PENDING_OFFSET = 7` |
| `RunnerRatingTab.tsx:84` `[...Array(5)]` | `const MAX_RATING = 5` |
| `CreateTaskModal.tsx:66` `+ 24` hours | `const DEFAULT_BIDDING_HOURS = 24` |
| `CreateTaskModal.tsx:179` `min="500"` | `const MIN_TASK_BUDGET = 500` |
| `mapAdminUserToRunnerDetail.ts:38` `transportMode: "motorcycle"` | Remove default — backend should always provide it |
| `TransactionDetailsModal.tsx:402` identical branches ternary | Replace with `task.budget` |
| `walletApi.ts:11,12` `"REQ"`/`"RUN"` ID prefixes | Use a `userIdPrefix(userType)` helper |

---

## 6. Recommended implementation order

1. **Quick wins (no behavior change):**
   - Fix duplicate mapper exports (§1.9) — 5 min.
   - Fix `TaskDetails.tsx:402` identical-branch ternary — 1 min.
   - Remove hardcoded `transportMode: "motorcycle"` fallback — 2 min.
   - Add `usePayoutList`/`useTaskList`/`useRequesterList`/`useRunnerList`/`useWalletList` `LIMIT = 20` → shared constant — 15 min.
   - Move `fetch("/api/tasks")` into `tasksService` — 10 min.

2. **Money & dates centralization (§5 A):**
   - Touches ~30 files, but each replacement is a single-line swap.
   - Should be one PR with global regex replace.

3. **Status enums + colors (§5 B + E):**
   - Touches `enums.ts` + ~25 component files.
   - Need design review for `<StatusBadge>` component first.

4. **Mock data removal / flag (§5 G):**
   - Behind feature flag → low risk.

5. **i18n (§5 F):**
   - Largest, most invasive. Schedule as separate epic.

---

## 7. File-level cleanup checklist (paste into PRs)

```
features/users/requesters/components/
  RequesterListTable.tsx        — replace Intl formatter, status switch, magic colors
  RequesterListFilters.tsx      — use STATUS_FILTER_OPTIONS
  RequesterAdminActions.tsx     — replace Title-case union type
  RequesterWalletSummaryCards.tsx — replace Intl formatter
  RequesterWalletTransactions.tsx — replace Intl formatter, status switch
  RequesterPaymentTable.tsx     — replace Intl formatter, status switch
  RequesterTaskHistoryTable.tsx — replace Intl formatter, status switch
  RequesterPersonalInfo.tsx     — fix en-US locale, replace "Motorcycle"-style literal
  RequesterDetails.tsx          — fix en-US locale
  AdjustWalletModal.tsx         — replace "₦" label, replace magic "0.01"
features/users/runners/components/
  RunnerListTable.tsx           — replace Intl formatter, status switch, colors
  RunnerListFilters.tsx         — use STATUS_FILTER_OPTIONS
  RunnerAdminActions.tsx        — replace Title-case union type
  RunnerKYCTab.tsx              — delete mock kycDocuments
  RunnerRatingTab.tsx           — delete mock reviews
  RunnerWalletTab.tsx           — delete mock dailyPayments
  RunnerTaskRecordsTab.tsx      — delete mock pagination
  RunnerDetails.tsx             — fix en-US locale, replace 🏍️ literal
  RunnerPersonalInfo.tsx        — fix en-US locale
  RunnerAvailabilityPerformance.tsx — name magic 10/7
features/users/requesters/lib/
  mapAdminUserToRequester.ts        — DELETE duplicate export (see mapAdminUserToRequesterDetail.ts)
  mapAdminUserToRequesterDetail.ts  — keep canonical
features/users/runners/lib/
  mapAdminUserToRunner.ts           — DELETE duplicate export
  mapAdminUserToRunnerDetail.ts     — keep canonical
features/tasks/
  components/TaskListFilters.tsx    — use STATUS_FILTER_OPTIONS, SORT_OPTIONS
  components/TasksList.tsx          — initial filter state → constants
  components/TaskListTable.tsx      — replace Intl formatter, status switch, color classes
  components/TaskDetails.tsx        — replace Intl formatter, status switch, hardcoded IDs/names/dates, ternary bug L402
  components/CreateTaskModal.tsx    — replace fetch("/api/tasks") with tasksService.create, replace "₦" labels, name magic numbers
  components/IssueRefundModal.tsx   — replace "₦" label, name magic numbers
  components/TaskBudgetBids.tsx     — replace Intl formatter, local Bid interface, status switch
  components/TaskDeliveryEvidence.tsx — delete local DeliveryFile redeclaration
  components/TaskChatLog.tsx
  components/TaskTimelineStatus.tsx
  hooks/useTaskList.ts              — use ALL_STATUS sentinel, use shared LIMIT
  lib/mapAdminTaskToListItem.ts     — remove duplicate status mapping (or use single source from useTaskList)
  types/task.types.ts               — replace Title-case unions with enums from lib/types/enums.ts
features/finance/
  payout-requests/types/payout.types.ts     — use WithdrawalStatus
  payout-requests/lib/mapWithdrawalToPayoutRequest.ts — single status mapping, single formatDate
  payout-requests/hooks/usePayoutList.ts    — use ALL_STATUS sentinel, use shared LIMIT
  payout-requests/components/PayoutDetailsModal.tsx — replace Intl formatter, status switch, colors
  payout-requests/components/PayoutListTable.tsx    — replace Intl formatter, status switch
  payout-requests/components/PayoutListFilters.tsx  — use STATUS_FILTER_OPTIONS
  payout-requests/components/PayoutRequestsList.tsx — use shared date filter options
  payout-requests/api/payoutApi.ts          — gate behind USE_MOCKS
  transactions/types/transaction.types.ts  — add TransactionStatus enum import, single userType casing
  transactions/components/TransactionListFilters.tsx — use STATUS_FILTER_OPTIONS + TYPE_FILTER_OPTIONS
  transactions/components/TransactionListTable.tsx    — replace Intl formatter, status switch
  transactions/components/TransactionDetailsModal.tsx — replace Intl formatter, "Paystack" constant, status switch
  transactions/components/TransactionsList.tsx        — use shared date filter options
  transactions/hooks/useTransactionList.ts — use shared page size
  transactions/api/transactionApi.ts       — gate behind USE_MOCKS
  wallets/types/wallet.types.ts           — use UserType enum (lowercase)
  wallets/types/transaction.types.ts      — use WalletTxType enum
  wallets/lib/mapAdminWalletToWallet.ts   — use UserType enum
  wallets/components/WalletListTable.tsx  — use UserType enum, replace Intl formatter, status switch
  wallets/components/WalletListFilters.tsx — use shared search placeholder constant
  wallets/components/WalletHistorySlideOver.tsx — use WalletTxType, replace Intl formatter, status switch, formatDate, formatTime
  wallets/components/WalletsOverview.tsx  — replace Intl formatter
  wallets/api/walletApi.ts                — gate behind USE_MOCKS, use ID prefix helper
  wallets/api/transactionApi.ts           — gate behind USE_MOCKS
  revenue-reports/components/RevenueReports.tsx — replace Intl formatter, hex colors → tokens
  revenue-reports/api/revenueApi.ts       — gate behind USE_MOCKS, hex colors → tokens
lib/utils/money.ts                        — already canonical
lib/utils/date.ts                         — NEW (formatDate, formatDateTime, formatTime, LOCALE)
lib/utils/status.ts                       — NEW (statusBadgeClass, statusLabel)
lib/config/pagination.ts                  — NEW (DEFAULT_PAGE_SIZE, etc.)
lib/constants/filters.ts                  — NEW (ALL_STATUS, STATUS_FILTER_OPTIONS, SORT_OPTIONS, DATE_FILTER_OPTIONS)
lib/types/enums.ts                        — extend with TransactionStatus, TransactionType, UserType, WalletTxType, BidStatus, DeliveryFileType
lib/design-tokens.ts                      — extend with statusColors
```

---

## 8. Open questions for the team

1. Should `UserType` be `requester`/`runner` or `client`/`runner` (backend enum uses `client`)? Today the codebase uses **both**.
2. Should we standardize on `en-NG` locale everywhere (currency AND dates)? Currently mixed.
3. Should the admin show Title-case statuses (e.g. "In Progress") for users, or stick with backend snake_case ("in_progress")?
4. Is there a design system for badges, or do we want to introduce one in this work?
5. Is i18n on the roadmap? If yes, prefer strings-as-keys from day one; if no, leave the literals but extract the constants.
6. Are the mock APIs (`taskApi.ts`, `payoutApi.ts`, etc.) going to be replaced by real backend calls in the near term, or kept as fixtures for a while?
