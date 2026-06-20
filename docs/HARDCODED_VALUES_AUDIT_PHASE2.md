# Hardcoded Values Audit — Frontend Modules (Phase 2)

**Scope:** referral, kyc, runner-documents, compliance, disputes, support-tickets, settings (overview/roles/platform/notifications/user-access), analytics, notifications
**Project:** `/Users/almajiris-machine/workspace/pikquick/pikquick-admin`

---

## 0. Cross-cutting pattern (applies to every module below)

Every audited module shows the **same recurring anti-patterns**:

| Anti-pattern | Frequency in this phase |
|---|---|
| `Intl.NumberFormat("en-NG", {style:"currency", currency:"NGN"})` re-implemented inline | 6 (referral) + 1 (compliance) = **7 copies** (lib/utils/money.ts:formatNgn exists) |
| `new Date(...).toLocaleDateString("en-US", ...)` re-implemented inline | 6 (runner-documents, kyc, support-tickets, compliance, analytics, dispute-adjacent) |
| `getStatusColor(s)` switch on Tailwind bg/text classes | 15+ (every module) |
| `formatCurrency` (NGN) duplicated | 7 (referral ×6, compliance ×1) |
| `LIMIT = 20` / `itemsPerPage: 5/8/10` pagination magic | 12+ sites |
| Hardcoded `"All Status"` / `"All Priority"` / `"All Users"` sentinels | 6 (referral, disputes, support-tickets, notifications) |
| Status enums re-declared as Title-Cased string unions instead of using `lib/types/enums.ts` | 8+ type files |
| Inline SVG data URI for `<select>` arrow icon | 10 occurrences across runner-documents, disputes, support-tickets, notifications, referral |
| Hardcoded hex chart colors (`#3B82F6`, `#10B981`, `#E5E7EB`, etc.) | 50+ in analytics, referral, revenue-reports |
| Mock data in `api/` files running in production paths | 18+ `setTimeout` mocks, 20+ hardcoded record rows |
| `formatStatus(s)` Title-casing function re-implemented | 5+ copies (runner-documents, support-tickets, others) |
| Loading spinner block (`w-12 h-12 border-4 ...`) duplicated | 12+ page-level components |
| "Back" button JSX duplicated | 4 settings pages |

**Core canonical helpers that exist but are NOT used** (most are from phase 1):
- `lib/utils/money.ts` — `formatNgn()`, `koboToNgn()`, `ngnToKobo()`
- `lib/utils/date.ts` — `formatDate()`, `formatDateTime()`, `formatTime()`, `LOCALE="en-NG"`
- `lib/utils/status.ts` — `statusBadgeClass()`, `statusLabel()`, `statusTone()`, `statusToApi()`, `walletStatusClass()`, `walletTxClass()`
- `lib/config/pagination.ts` — `DEFAULT_PAGE_SIZE`, `DEFAULT_PAGE`, `TRANSACTION_PAGE_SIZE`, `DEFAULT_SEARCH_DEBOUNCE_MS`, `DEFAULT_DATE_FILTER`
- `lib/config/feature-flags.ts` — `USE_MOCKS`, `PAYMENT_GATEWAY`, `MAX_RATING`, `CURRENCY_SYMBOL`
- `lib/constants/filters.ts` — `USER_STATUS_OPTIONS`, `RUNNER_AVAILABILITY_OPTIONS`, `RUNNER_VERIFICATION_OPTIONS`, `TASK_STATUS_OPTIONS`, `PAYOUT_STATUS_OPTIONS`, `TRANSACTION_STATUS_OPTIONS`, `TRANSACTION_TYPE_OPTIONS`, `DATE_FILTER_OPTIONS`, `TASK_SORT_OPTIONS`, `USER_SORT_OPTIONS`, `REVENUE_PERIOD_OPTIONS`, `REVENUE_LOCATION_OPTIONS`, `EXPORT_FORMATS`, `SEARCH_PLACEHOLDER_USER`, `SEARCH_PLACEHOLDER_WALLET`
- `lib/types/enums.ts` — `ALL_FILTER` sentinel, `UserRole`, `UserStatus`, `VerificationStatus`, `DocumentVerificationStatus`, `TaskStatus`, `WithdrawalStatus`, `TransactionStatus`, `TransactionType`, `WalletStatus`, `WalletTxType`, `BidStatus`, `DeliveryFileType`, `PaymentType`, `TransportMode`, `EscrowStatus`, `NotificationAudience`, etc.
- `components/ui/status-badge.tsx` — `<StatusBadge>`, `<WalletStatusBadge>`, `<WalletTxBadge>`
- `lib/design-tokens.ts` — `colors.*`, hex semantic tokens

---

## 1. REFERRAL MANAGEMENT (`features/referral/`)

**Files:** 4 sub-features × 4 subdirs each = 16 component files + 7 mock API files + 7 hooks + 4 type files.

### 1.1 Status enums redefined (Title-Cased, mismatched with backend lowercase)
| File | Line | Hardcoded value |
|---|---|---|
| `features/referral/records/types/referral-record.types.ts:1` | `status: "Active" \| "Pending" \| "Disqualified"` (TitleCase) |
| `features/referral/elite-rewards/types/elite-reward.types.ts:1` | `status: "Pending" \| "Approved" \| "Rejected"` |
| `features/referral/records/types/referral-detail.types.ts:18` | `status: "Verified" \| "Pending" \| "Unverified"` |
| `features/referral/records/types/referral-detail.types.ts:33` | `status: "Completed" \| "Pending" \| "Failed"` (overlaps with TaskStatus) |
| `features/referral/records/types/referral-detail.types.ts:37-41` | `fraud.types: "device_similarity"\|"ip_match"\|"rapid_referral"`, `level: "Low"\|"Medium"\|"High"`, `status: "safe"\|"warning"\|"danger"` (3 ad-hoc unions, no enum) |
| `features/referral/elite-rewards/types/elite-reward-detail.types.ts:19-29` | `level: "LOW"\|"MEDIUM"\|"HIGH"`, `status: "NONE DETECTED"\|"DETECTED"`, `"CONSISTENT"\|"INCONSISTENT"`, `"100% VALID"\|"INVALID"` |
| `features/referral/elite-rewards/types/elite-reward-detail.types.ts:4-7` + same union in 3 sibling files | `role: "Runner"\|"Requester"` (duplicated 4×) |
| `features/referral/overview/types/referral.types.ts:25` | `status: "Elite"\|"Pro"\|"Starter"` |
| `features/referral/settings/api/referralSettingsApi.ts:11-30, 32-37` | tier ids `starter/pro/green/blue/purple`; def ids `signup/kyc/first_task/first_payment` (don't match backend `STARTER/PRO/ELITE` or `signup_only/kyc_verified/first_task_completed/first_n_amount_processed`) |

**Missing from `lib/types/enums.ts`:** `ReferralStatus`, `ReferralRewardStatus`, `ActiveReferralDefinition`, `ReferralTierKey`. Backend (`pikquick-backend/src/models/referral.model.ts`) has all 4.

### 1.2 Currency formatting — **6 identical `Intl.NumberFormat` blocks**
- `ReferralOverview.tsx:21-27`, `ReferralDetailsPage.tsx:59-65`, `EliteRewardTable.tsx:25-31`, `EliteRewardsList.tsx:35-41`, `EliteRewardDetailPage.tsx:56-62`, `ReferralSettings.tsx:31-37`. All identical to `lib/utils/money.ts:formatNgn`.

### 1.3 `getStatus*` color mappers — **8 separate functions**
- `ReferralOverview.tsx:47-58` (tier→color), `ReferralRecordTable.tsx:25-32` (status→color), `ReferralDetailsPage.tsx:75-99` (fraud icon+color, 2 functions), `EliteRewardTable.tsx:33-44` (status+role→color, 2 functions), `EliteRewardDetailPage.tsx:72-83` (integrity color), `ReferralSettings.tsx:98-105` (tier color ternary).
- Central `STATUS_BADGE_CLASS` + `<StatusBadge>` not used.

### 1.4 Mock data + `setTimeout` in production paths
- 18 `setTimeout` mocks across 7 mock API files; 20+ fabricated rows; 9 `console.log`-only mutations.
- Service layer: `lib/services/referral.service.ts` (correctly typed, hits `/admin/referral/*`) exists but is **never imported anywhere** in `features/` or `app/` — module uses local mocks exclusively.

### 1.5 Routes, page sizes, dead UI
- `LIMIT = 20` / `itemsPerPage: 5/8` inconsistent (`referral-record.types.ts` uses 5, `elite-reward.types.ts` uses 8, both with `totalPages: 20, totalItems: 100`).
- `ReferralRecordFilters.tsx` renders stub `<button>Filter</button>` with no dropdown — filter prop is dead code.
- `window.location.href = /dashboard/...` (×2) bypasses Next.js `router.push`.
- `bar` of spinner block (`min-h-[400px]` + 4-line `<div>` spinner) duplicated 6×.
- `getInitials(name)` duplicated 2×.

### 1.6 Hardcoded `₦` symbol in labels (6 occurrences)
- `Total Payouts (₦)`, `REWARD AMOUNT (₦)`, `First ₦10,000 processed`, `Are you sure you want to approve this reward of ₦25,000 for Adebayo Samuel?`, `₦{value}M` (with `.toFixed(1)` + "M" suffix).

### 1.7 Other notes
- `eligible rewards` modal embeds hardcoded name `Adebayo Samuel`, month `February`, amount `₦25,000` (`EliteRewardDetailPage.tsx:405`).
- `useDebouncedValue` not used; `SEARCH_DEBOUNCE_MS` not imported.
- `lib/services/referral.service.ts` is correctly implemented but has **zero consumers**.
- Empty `features/referral/index.ts` (0 bytes).

---

## 2. KYC VERIFICATION (`features/kyc/`)

### 2.1 Status enum inconsistency (lowercase/approved mix)
| File | Line | Hardcoded value |
|---|---|---|
| `features/kyc/types/kyc.types.ts:8` | `status: "pending" \| "approved" \| "rejected" \| "resubmission"` (note `"approved"` — backend uses `"verified"`) |
| `features/kyc/api/kycApi.ts:6, 19` | `status: "pending" \| "resubmission"` (union duplicated ×2 in same file) |
| `features/kyc/hooks/useKYCList.ts:8` | Same union — 3rd duplicate |
| `features/kyc/hooks/useKYCDetails.ts:7` | Same union — 4th duplicate |
| `features/kyc/components/KYCDetailsSlideOver.tsx:26, 293` | Same union — 5th duplicate, `"verified"` used in user-facing copy ("grants them verified runner status") |
| `features/kyc/components/KYCVerificationList.tsx:14, 127, 131, 145, 149, 195` | Same union — 6th duplicate, **6 sites in this single file** |
| `features/users/runners/components/RunnerKYCTab.tsx:11, 22, 30, 38, 46` | `status: "verified" \| "pending" \| "rejected"` (7th duplicate, sibling module) |

### 2.2 Document type strings (free-form, not enum)
- `KYCDetailsSlideOver.tsx:170, 180, 189, 199, 205` — `"Government ID"`, `"Selfie"`, `"Address Proof"`.
- `KycDocumentType` enum already in `lib/types/enums.ts:196-206` but **not imported anywhere in KYC**.

### 2.3 Date formatting — `toLocaleDateString("en-US", ...)` duplicated
- `KYCVerificationList.tsx:48-55` — uses `"en-US"` (locale mismatch with rest of codebase which uses `"en-NG"`).
- `lib/utils/date.ts:formatDate` not used.

### 2.4 Color/badge code duplication (sibling)
- `RunnerDocumentsList.tsx:12-23` (`getStatusColor` switch) + `formatStatus` (`:25-27`) duplicate work that `lib/utils/status.ts:statusBadgeClass` + `statusLabel` already do.
- `RunnerDocumentsList.tsx:141-153` button styles `bg-green-600 / bg-red-600` inconsistent with `STATUS_BADGE_CLASS.success` (which uses `green-700`).
- `KYCDetailsSlideOver.tsx` button colors duplicated: `bg-green-500 hover:bg-green-600` (×2), `bg-blue-500 hover:bg-blue-600` (×3).

### 2.5 Pagination / mock / label issues
- `useKYCList.ts:18` `itemsPerPage: 8` (backend default is 10, sibling is 10) — inconsistent.
- `kycApi.ts:41, 50` passes `adminId: ""` (empty string) to `kycService.approve()`/`reject()` → backend audit logs always empty.
- `KYCListFilters.search` declared in type but no search input rendered — **dead code**.
- `DocumentPreviewModal` never receives `documentUrl` (signed Cloudinary URL discarded); download is `console.log`.
- `labels.ts` non-existent; ~30 string literals in `KYCDetailsSlideOver.tsx` alone.

---

## 3. RUNNER DOCUMENTS (`features/runner-documents/`)

### 3.1 Status enum + sentinel mismatches
| File | Line | Hardcoded value |
|---|---|---|
| `RunnerDocumentFilters.tsx:50-52` | `<option value="all">All Status</option>` etc. — uses local `"all"` sentinel instead of `ALL_FILTER = "__all__"` |
| `RunnerDocumentFilters.tsx:14, 39, 50, 51, 52` | `DocumentVerificationStatus \| "all"` cast; raw `"pending"`/`"verified"`/`"rejected"` strings |
| `RunnerDocumentsList.tsx:14-22` | `getStatusColor` switch on `"verified"`/`"pending"`/`"rejected"` — duplicates `STATUS_BADGE_CLASS` but with `green-600`/`yellow-600`/`red-600` (inconsistent shade) |
| `RunnerDocumentsList.tsx:25-27` | `formatStatus(s) = s.charAt(0).toUpperCase() + s.slice(1)` — duplicates `statusLabel()` |
| `RunnerDocumentsList.tsx:41, 45, 55, 142, 149, 156, 171, 214` | Inline union `status: "verified" \| "rejected"`, raw comparisons |

### 3.2 Filter dropdown + missing features
- `RunnerDocumentFilters.tsx:49-52` re-creates `RUNNER_VERIFICATION_OPTIONS` already in `lib/constants/filters.ts:34-39`.
- `document_type_id` filter prop is in type but **no dropdown rendered** — dead code.
- No expiry-status logic (`expiry_date` shown but never classified).
- No file-type icon mapping (PDFs/images treated identically).
- No "Download" button (only View/Approve/Reject).

### 3.3 Date formatting — `"en-US"` locale, duplicated
- `RunnerDocumentsList.tsx:30-35` — inline `toLocaleDateString("en-US", ...)`; appears in 5+ files project-wide.

### 3.4 Colors, magic numbers, duplicated IDs
- Tailwind color classes hardcoded throughout (15+ sites), `bg-red-50`, `bg-green-600 hover:bg-green-700`, etc.
- Magic `slice(0, 8)` (3× in same file for ID truncation).
- `pageSize = 10` duplicated in `RunnerDocumentsList.tsx:186` and `useRunnerDocumentsList.ts:10`.
- Spinner block (`w-12 h-12 border-4 ...`) duplicated.

### 3.5 Labels
- ~30 English literals in `RunnerDocumentsList.tsx` (table headers, modal labels, button text, error messages).
- `slice(0, 8)` (ID truncation length) appears 3× in same file.

### 3.6 Endpoints
- `lib/services/runner-documents.service.ts:11-32` — 5 endpoint paths hardcoded inline.
- `lib/services/kyc.service.ts` exists as **parallel service** covering the same domain with different paths.

---

## 4. COMPLIANCE MANAGEMENT (`features/compliance/`)

### 4.1 FlagStatus enum missing from `lib/types/enums.ts`
| File | Line | Hardcoded value |
|---|---|---|
| `features/compliance/types/compliance.types.ts:1` | `FlagStatus = "Flagged" \| "Under Review" \| "Resolved"` (TitleCase) |
| `ComplianceListTable.tsx:39-41` | Color switch on same 3 values (×2 duplicates) |
| `FlaggedActivityDetailsModal.tsx:31, 45, 72` | API payload strings + always-red badge (bug: badge never updates per status) |

### 4.2 Filter dropdown + missing UI
- `ComplianceListFilters.tsx` only has search + dateFrom (no `dateTo`, no status dropdown). Backend supports `?status=` but UI never sends it.
- `FlaggedActivityDetailsModal.tsx:138-141` hardcoded mock officer list (`officer1/2/3` with names "John Doe/Jane Smith/Mike Johnson") + sentinel `""` for "Choose an officer".

### 4.3 Other duplications
- `formatCurrency` (`FlaggedActivityDetailsModal.tsx:55-61`) duplicates `formatNgn` (minus `maximumFractionDigits: 0`).
- `formatDate` (`ComplianceListTable.tsx:26-35`) uses `"en-US"` (locale mismatch).
- `itemsPerPage: 8` (`useComplianceList.ts:14`) inconsistent with backend default `limit=10`.
- No debounce applied despite `DEFAULT_SEARCH_DEBOUNCE_MS` existing.

### 4.4 Bugs
- `ComplianceManagement.tsx:81` malformed class `text-text-primary text-text- mt-1` (typo `text-text-`).
- `FlaggedActivityDetailsModal.tsx:174` button label `"Mark as Review"` but sets status `"Under Review"` (mismatch).
- `ComplianceListTable.tsx:43` style fallback `styles.Flagged` always — default is "Flagged" key, not a status-aware fallback.

---

## 5. DISPUTES & SUPPORT TICKETS

### 5.1 Status / priority enums
| File | Line | Hardcoded value |
|---|---|---|
| `disputes/types/dispute.types.ts:1-3` | `TicketStatus = "Open" \| "In Progress" \| "Resolved"` (TitleCase); `TicketPriority = "High" \| "Medium" \| "Low"` (only 3 levels; backend support has `urgent`); `TicketCategory = "Task Dispute" \| "Payment Issue" \| "Account Issue" \| "Technical Support" \| "Other"` |
| `disputes/types/ticket-detail.types.ts:11` | `currentStatus: "In Progress" \| "Open" \| "Resolved"` (case order differs from dispute.types.ts) |
| `support-tickets/types/support-ticket.types.ts:22` | `status: SupportTicketStatus \| "all"` (uses enum type but `<option>` literals use raw strings) |
| `SupportTicketsList.tsx:13-22, 26-35` | `case "urgent"`, `case "high"`, etc. — raw strings (not enum) |
| `SupportTicketListFilters.tsx:48-51, 72-75` | 4× `<option>` for status + 4× for priority — duplicate of `app/dashboard/support/[id]/page.tsx:213-216, 226-229` |

### 5.2 Filter sentinels
- `DisputesList.tsx:22-23` uses `"All Priority"` / `"All Categories"` (TitleCase strings) as both default state AND filter value — conflicts with real priority values if a real status matches the string.
- `DisputeListFilters.tsx:52, 70` repeats the same `"All Priority"` / `"All Categories"` defaults.
- `SupportTicketsList.tsx:66-68` uses bare `"all"` sentinel (also conflicts with `ALL_FILTER = "__all__"`).
- `TicketDetailsSlideOver.tsx:210` sentinel `"Select Admin"` TitleCase.

### 5.3 Status color maps duplicated
- `DisputesList.tsx:56-75` — `getPriorityColor` + `getStatusColor` (12 cases).
- `DisputesList.tsx:199-238` — 3× tab-count badges (`Open=blue-800`, `In Progress=yellow-800`, `Resolved=green-800`).
- `TicketDetailsSlideOver.tsx:64-70` — second `getStatusColor` (same logic, reordered cases).
- `SupportTicketsList.tsx:11-39` — `getPriorityColor` (4 priorities, urgent=orange/red distinction) + `getStatusColor` (4 statuses).
- `app/dashboard/support/[id]/page.tsx:10-23` — verbatim duplicate of `SupportTicketsList.tsx:26-39`.

### 5.4 Inline SVG for `<select>` arrow (data URI duplicated 10× across repo)
- `DisputeListFilters.tsx:47, 65`, `TicketDetailsSlideOver.tsx:169, 188, 205`, `SupportTicketListFilters.tsx:42, 66`, `RunnerDocumentFilters.tsx:44`, `CreateNotificationModal.tsx:116, 137`.

### 5.5 Pagination / magic numbers
- `pageSize` magic: 3 values across 3 files (`8`, `10`, `10`).
- `slice(0, 8)` ID truncation in `SupportTicketsList.tsx:89`.
- Backend `support-ticket.controller.ts:102, 253` hardcodes `20` and `100` (frontend uses 10 — mismatch).

### 5.6 Helpers duplicated
- `formatDate` duplicated in `SupportTicketsList.tsx:45-53` and `app/dashboard/support/[id]/page.tsx:29-37` (verbatim) — `"en-US"` locale.
- `formatStatus` duplicated in same 2 files (verbatim).
- `getInitials` (2× in referral, same pattern here).

### 5.7 Mock + label issues
- `TicketDetailsSlideOver.tsx:211-213` hardcoded admin list (`Admin Mike/Sarah/John`) — no backend.
- `ticketDetailApi.ts:17` hardcoded `"Resolved"` status string.
- `ticketDetailApi.ts:24-30` `sendMessage` is `console.log` only.
- ~50 English literals across `DisputesList.tsx`, `SupportTicketsList.tsx`, `TicketDetailsSlideOver.tsx`, filter files.
- Duplicate strings across files: `"Loading tickets..."`, `"View Details"`, `"Ticket ID"`, `"Mark as Resolved"` (×2 in same file).

### 5.8 Backend inconsistencies
- Backend disputes repo uses `priority || 'Medium'`, `status || 'Open'` (TitleCase) — but backend support uses lowercase. Frontend mirrors backend inconsistencies.

---

## 6. SETTINGS (`features/settings/`)

**Sub-features:** overview, roles, platform, notifications, user-access.

### 6.1 Roles
- **Critical duplication:** `Permission[]` default array identical in `CreateRoleModal.tsx:28-37` and `EditRolePermissionsModal.tsx:30-39` (8 modules × 4 flags, byte-identical; `EditRolePermissionsModal.tsx:29` comment "Different default permissions based on role" is misleading — function ignores the `role` argument).
- **Critical duplication:** `Permission` interface re-declared in 3 files (`CreateRoleModal.tsx:14-20`, `EditRolePermissionsModal.tsx:13-19`, `ManageRoles.tsx:11-17`).
- Role color map (`blue/green/orange/purple/gray`) re-implemented in `ManageRoles.tsx:43-52`, `UserAccessControl.tsx:25-34`, partial in `NotificationsAlerts.tsx:27-44`.

### 6.2 Platform
- Dead-code magic numbers: `usePlatformSettings.ts:9-10` defaults `accessFee: 100, platformCommission: 15` never used (overridden by fetch).
- `PlatformSettings.tsx:85` hardcoded `₦` glyph in label.
- `PlatformSettings.tsx:24-25, 34-35, 39-40` — 4 `console.log` placeholders with TODO comments.
- `lib/utils/money.ts` not used.

### 6.3 Notifications (settings sub-module)
- `audience: "All" \| "Runners" \| "Requesters"` (`notifications.types.ts:4`) **inconsistent** with `CreateNotificationModal.tsx:121` default `"All Users"` (case mismatch — type union doesn't include the default value).
- `type: "System" \| "Custom"` (line 5) — ad-hoc, not in backend enum.
- Channel options (`"Push Notification" | "Email" | "SMS" | "In-App"`) hardcoded at `CreateNotificationModal.tsx:142-145` — no enum.
- `CreateNotificationModal.tsx:40-41` defaults `"12"`, `"00"`, `"PM"` (magic).
- `CreateNotificationModal.tsx:74, 79` magic 12 (hours) and 60 (minutes).
- `CreateNotificationModal.tsx:116, 137` inline SVG data URI duplicated verbatim.
- `useNotifications.ts:13` page size `8` (should use `DEFAULT_PAGE_SIZE = 20`).
- `NotificationsAlerts.tsx:53-67` pagination magic 5/3/2/4/1/1/2/3 (window logic).
- "Failed to ..." console.error messages duplicated across 4 files.

### 6.4 User-access
- **Critical:** `role: "Super Admin" | "Finance Admin" | "Support Admin" | "Operations Admin"` (`user-access.types.ts:5`) — admin sub-roles not in any enum; `lib/types/enums.ts:UserRole = CLIENT/RUNNER/ADMIN` is **not used** anywhere.
- `status: "Active" | "Inactive"` (TitleCase) duplicates `UserStatus` enum (which uses lowercase).
- Role union re-declared in `EditAdminModal.tsx:28, 86-89`, `AddAdminModal.tsx:30, 36`, `UserAccessControl.tsx:25-31` (4× duplicates).
- Role `<option>` list identical in `AddAdminModal.tsx:118-121` and `EditAdminModal.tsx:94-97`.
- Role badge color ternary in `UserAccessControl.tsx:25-34` (also: line 201 always renders green regardless of status — bug).
- `UserAccessControl.tsx:67` uses native `alert()` — inconsistent UX.
- `UserAccessControl.tsx:81-82, 91-92` `console.log` + `// API call would go here` stubs.
- 8× "Failed to ..." log strings across api/hooks.

### 6.5 Overview
- 3 hardcoded routes (`/dashboard/settings/{user-access,platform,notifications}`) at `SettingsOverview.tsx:12, 18, 24`.

### 6.6 Cross-cutting (settings)
- **Loading-spinner block (`min-h-[400px]` + spinner div + `"Loading..."`)** duplicated 4× (platform, roles, user-access, notifications).
- **"Back" button JSX** duplicated 4× identically.
- **"Failed to ..." console.error messages** repeated 8× across api files.
- **TODO/console.log stubs** repeated 7× across components.
- **`UserRole` enum exists centrally but is unused** across settings module.

---

## 7. ANALYTICS & INSIGHTS (`features/analytics/`)

### 7.1 Chart hex colors (50+ inline literals)
- `#E5E7EB` (axis grey) ×20, `#6B7280` (tick grey) ×13, `#3B82F6` (blue) ×7, `#10B981` (green) ×5, `#8884d8` (default purple) ×3, `#F59E0B/#8B5CF6/#EF4444/#EC4899/#14B8A6` weekday palette, `#fff` tooltip bg.
- Should use shared palette (e.g. `REVENUE_CHART_COLORS` already exists in revenue-reports/types).

### 7.2 Date / currency / percentage formatting
- `AnalyticsDashboard.tsx:257` hardcoded `format(date, "MMM dd, yyyy")` date-fns format.
- `AnalyticsDashboard.tsx:296, 298` hardcoded `\`₦${value}M\`` (Naira + "M" suffix in template literal).
- `CompareCitiesModal.tsx:26-30` hardcoded city revenue strings (`"₦2.5M"`, `"₦1.8M"`, ..., `"₦900K"`) — inconsistent M/K suffixes.
- `formatNgn` not used.
- 6× inline `${...}%` template literals with literal `%` glyph.

### 7.3 Mock data inline in components
- `CompareCitiesModal.tsx:25-31` — `cityMetrics` Record literal with 5 Nigerian cities + revenue strings (data not from API).
- `AnalyticsDashboard.tsx:39, 41, 42` — ternary chain with hardcoded category names (`"Delivery"`, `"Errand"`, `"Food"`) + 4 fallback magic numbers per metric (`276, 49, 89`).

### 7.4 Magic numbers (chart dimensions)
- `outerRadius={90}` (×2), `outerRadius={120}` (×1), `strokeWidth={2}` (×3), `r: 4` (×2), `activeDot={{ r: 6 }}` (×2), `barSize={40}` (×2), `domain={[0, 60]}` / `[0, 1500]}` / `[0, 6]}` / `[0, 100]}` / `[0, 1600]}`, tick values `[0, 1.5, 3, 4.5, 6]}` / `[0, 400, 800, 1200, 1600]}`.
- `min-h-[400px]` spinner block ×2.
- `CompareCitiesModal.tsx:38-39` default city fallbacks (`"Lagos"`, `"Abuja"`).

### 7.5 Category / region name inconsistencies
- `AnalyticsDashboard.tsx:39` uses `"Errand"` (singular); `docs/ADMIN_ENDPOINTS.md:1164` documents `"Errands"` (plural) — contract mismatch.

### 7.6 Duplicated error messages
- `"Failed to fetch analytics data:"` in `analyticsApi.ts:10` AND `useAnalyticsData.ts:18` (verbatim).

### 7.7 Inline SVG icon path
- `AnalyticsDashboard.tsx:254` — full SVG path string for calendar icon inline; should be `<Calendar />` from lucide-react.

### 7.8 i18n candidates (~50 English strings)
- Stat-card labels (`"Total Tasks"`, `"Avg Completion Time"`, `"Retention Rate"`, `"Active Users"`), section titles (`"Tasks by Category"`, `"Task Completion Time Trend"`, `"Top 5 Cities by Task Volume"`, etc.), button labels (`"Drill Down"`, `"Compare Cities"`, `"Export City Data"`, etc.), modal labels.

---

## 8. NOTIFICATIONS (admin in-app panel + settings module)

**Two parallel subsystems:**
- `features/notifications/` — in-app slide-over panel (`NotificationsPanel.tsx`).
- `features/settings/notifications/` — admin send/log page (`NotificationsAlerts.tsx` + `CreateNotificationModal.tsx`).

### 8.1 NotificationAudience / NotificationType enums unused
- `lib/types/enums.ts:216-225` defines `NotificationAudience = USER/ADMIN/RUNNER/CLIENT/ALL/VERIFICATION` — **never imported** by either feature.
- Both features use their own ad-hoc vocabularies:
  - `NotificationsPanel.tsx` invents 4-icon map `{ shield, users, alert, dollar }` — none map to backend.
  - `NotificationsAlerts.tsx:25-33` uses `"All" | "Runners" | "Requesters"` (TitleCase).
  - `CreateNotificationModal.tsx:121` uses `"All Users" | "Runners" | "Requesters"` — **conflict with above** (case mismatch: `"All"` vs `"All Users"`).
- `notifications.types.ts:4` audience union doesn't include `"All Users"` (default).
- Backend `NotificationType` (32 values like TASK_INVITATION, TASK_ASSIGNED, etc.) is **completely absent** from admin UI.

### 8.2 Notification shape divergence
- `features/notifications/types/notifications.types.ts` defines `Notification { isNew, icon, iconColor, ... }` (UI-invented).
- `features/settings/notifications/types/notifications.types.ts` defines `Notification { date, audience, type, messagePreview, ... }` (different shape).
- `isNew` (UI boolean) vs `is_read` (backend) — never bridged.
- `timestamp` (UI string, pre-formatted) vs `date` (UI string, pre-formatted) — no formatter contract.
- Two `Notification` interfaces in two `notificationsApi.ts` files calling two different services (`notificationsService` vs `adminService`).

### 8.3 Service layer issues
- `lib/services/notifications.service.ts` defines `notificationsService` (correct) but is **not exported** from `lib/services/index.ts` — only reachable via direct path import.
- Same endpoint `/admin/notifications` hardcoded in both `lib/services/notifications.service.ts:5` and `lib/services/admin.service.ts:29, 32`.

### 8.4 Pagination magic
- `useNotifications.ts:13` `const limit = 8;` (should use `DEFAULT_PAGE_SIZE = 20`).
- `NotificationsAlerts.tsx:53-67` magic numbers 5/3/2/4/1/2/3 in window logic.

### 8.5 Color / time picker / label issues
- `NotificationsPanel.tsx:24-27` 4 inline color classes (`bg-blue-100 text-blue-600` etc.) — `<StatusBadge>` not used.
- `CreateNotificationModal.tsx:74` magic 12 (hours), `:79` magic 60 (minutes), `:40-42` defaults `"12"/"00"/"PM"`, `:51-53` magic 12/0 for AM/PM conversion.
- `CreateNotificationModal.tsx:116, 137` inline SVG data URI duplicated verbatim.
- `NotificationsPanel.tsx:84` placeholder has typo `"Search notifications.."` (double dot).
- `NotificationsPanel.tsx:66` inline pluralization `unreadCount !== 1 ? "s" : ""`.
- `Header.tsx:76` unread bell badge hardcoded hex `bg-[#FF5C5C]` (not in `lib/design-tokens.ts`).
- `Header.tsx:54` hardcoded hex `#E1E1E1` (matches `colors.border.light` in design-tokens but not imported).
- `Header.tsx:27` default initials `"AD"` for unknown user.

### 8.6 No time-ago / debounce / search filter
- `NotificationsPanel.tsx:82-88` search input has no debounce (despite `DEFAULT_SEARCH_DEBOUNCE_MS`).
- `formatDate`/`formatDateTime` not used.
- No relative-time formatter (relies on backend pre-formatted strings).

### 8.7 `markAllAsRead` dead code
- `useNotifications.ts:37-41` defines `markAllAsRead` but no UI button calls it.

---

## 9. Backend enums not yet mirrored in `lib/types/enums.ts`

For the fixes to land cleanly, these enums must be added (alphabetical by domain):

| Enum | Backend source | Module |
|---|---|---|
| `ReferralStatus` (`active`/`pending`/`completed`/`disqualified`) | `pikquick-backend/src/models/referral.model.ts:1-6` | referral |
| `ReferralRewardStatus` (`pending_verification`/`paid`/`under_review`/`rejected`) | same file L8-13 | referral |
| `ActiveReferralDefinition` (`signup_only`/`kyc_verified`/`first_task_completed`/`first_n_amount_processed`) | same file L15-20 | referral |
| `ReferralTierKey` (`STARTER`/`PRO`/`ELITE`) | same file L22-26 | referral |
| `FlagStatus` (`flagged`/`under_review`/`resolved`) | compliance module | compliance |
| `RiskLevel` / `FraudLevel` (`low`/`medium`/`high`) | if implemented | referral/compliance |
| `NotificationChannel` (`push`/`email`/`sms`/`in_app`) | not in backend yet | notifications |
| `NotificationMessageType` (`system`/`custom`) | not in backend yet | notifications |
| `AdminRole` (`super_admin`/`finance_admin`/`support_admin`/`operations_admin`) | not in backend yet | settings/user-access |
| `NotificationType` (32 backend values) | `pikquick-backend/src/models/notification.model.ts:3-42` | notifications |

---

## 10. Recommended shared utilities to create

These would unblock most modules at once:

| File | Exports |
|---|---|
| `lib/utils/date.ts` (extend) | Already has `formatDate/formatDateTime/formatTime`. Add `formatRelative(date)` with `< 60 / 3600 / 86400 / 604800` ladder. |
| `lib/utils/status.ts` (extend) | Add `fraudLevelTone()`, `kycDocTypeLabel()`, `referralTierLabel()`, `payoutStatusClass()` (already done in phase 1). |
| `lib/utils/chart-colors.ts` | `CHART_AXIS`, `CHART_GRID`, `CHART_PRIMARY`, `CHART_SUCCESS`, `CHART_PIE_PALETTE`, `CHART_WEEKDAY_PALETTE`. |
| `lib/constants/filters.ts` (extend) | `SUPPORT_TICKET_STATUS_OPTIONS`, `SUPPORT_TICKET_PRIORITY_OPTIONS`, `DISPUTE_CATEGORY_OPTIONS`, `FLAG_STATUS_OPTIONS`, `ADMIN_ROLE_OPTIONS`, `NOTIFICATION_AUDIENCE_OPTIONS`, `NOTIFICATION_CHANNEL_OPTIONS`, `NOTIFICATION_MESSAGE_TYPE_OPTIONS`, `REFERRAL_TIER_OPTIONS`, `CITY_OPTIONS`. |
| `lib/config/endpoints.ts` | Centralized URL paths per module so services don't duplicate path strings. |
| `lib/components/PageHeader.tsx` | Back button + h1 — kills the 4× duplicate in settings pages. |
| `lib/components/LoadingState.tsx` | Spinner block — kills the 12+ duplicate. |
| `lib/components/Select.tsx` | Wraps `<select>` with the inline SVG arrow so 10 occurrences go away. |
| `lib/permissions/defaults.ts` | Single source of `DEFAULT_PERMISSIONS: Permission[]` — fixes the role module duplication. |

---

## 11. Proposed fix order (high ROI first)

1. **Extend `lib/types/enums.ts`** with the 7-9 missing enums listed in §9. Low risk; unblocks every module.
2. **Extend `lib/constants/filters.ts`** with the 9 new dropdown sets. Low risk.
3. **Replace inline `Intl.NumberFormat` blocks (7 sites)** with `formatNgn`. Trivial grep/replace.
4. **Replace inline `toLocaleDateString("en-US")` blocks (6 sites)** with `formatDate`/`formatDateTime`. Trivial.
5. **Replace 15+ inline `getStatusColor` switches** with `<StatusBadge status={...} />`. One-liner per site.
6. **Replace inline select-arrow SVG** with a shared `<Select>` component. 10 occurrences.
7. **Replace inline currency `₦` glyphs** with `CURRENCY_SYMBOL`. ~10 sites.
8. **Add `lib/utils/chart-colors.ts`** and refactor analytics + revenue-reports to use it.
9. **Add `lib/utils/date.ts:formatRelative`** for the notifications panel.
10. **Deduplicate `Permission[]` defaults** in `lib/permissions/defaults.ts`.
11. **Gate mock data behind `USE_MOCKS`** in 18+ `api/` files.
12. **Fix consistency bugs** (compliance `text-text-` typo, modal "Mark as Review" mismatch, KYC `adminId: ""`, empty search filters, dead `markAllAsRead`).

---

## 12. Files with NO findings (clean)

The following files were audited and found to be clean or trivially OK:
- `features/referral/index.ts` (empty barrel — flagged separately)
- `lib/types/enums.ts`, `lib/types/system-settings.types.ts`
- All `index.ts` barrel files in sub-features

---

## 13. Counts at a glance

| Module | Hardcoded findings | Top 3 categories |
|---|---|---|
| Referral | ~85 | enums (4 missing), `formatCurrency` ×6, mock data in 7 api files |
| KYC | ~40 | `"approved"` vs `"verified"` mismatch, "approved"/"rejected" `useState<...>` duplicated 6×, dead search filter |
| Runner Documents | ~35 | `"all"` sentinel vs `ALL_FILTER`, `getStatusColor`+`formatStatus` reimplemented, date `en-US` |
| Compliance | ~55 | `FlagStatus` enum missing, missing status filter UI, always-red badge bug |
| Disputes + Support | ~80 | TitleCase unions, `"All Priority"` sentinel, `getStatusColor` ×3, `formatDate` ×2 |
| Settings | ~120 | 4× admin role unions, `Permission[]` default duplicated, 4× spinner block, `UserRole` unused |
| Analytics | ~120 | 50+ hex colors inline, Naira template strings, mock data in components, magic chart dimensions |
| Notifications | ~110 | Two parallel subsystems, `NotificationAudience` unused, 12/60/5/3/2 magic numbers, "All" vs "All Users" mismatch |
| **Total** | **~645** | — |

This audit, combined with phase 1 (users/tasks/finance) totals roughly **1,000+ hardcoded findings** across the admin project.
