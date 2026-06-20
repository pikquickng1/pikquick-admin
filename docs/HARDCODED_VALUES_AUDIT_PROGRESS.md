# Phase 2 Hardcoded Values Sweep — Progress Log

## Goal
Sweep 8 admin modules (referral, kyc, runner-documents, compliance, disputes, support-tickets, settings, analytics, notifications) to remove hardcoded values, mirror backend enums, centralize helpers, and use shared components.

## Constraints & Preferences
- Backend uses `pikquick-backend/src/models/*.model.ts` as source of truth; mirror lowercase enum values.
- User role casing standardized on backend `UserRole = client/runner/admin`.
- Status colors via helper functions + new `<StatusBadge>` component (not migration to design tokens).
- Mock data gated behind `NEXT_PUBLIC_USE_MOCKS` env flag.
- `GET /admin/transactions/:id/receipt` and `GET /admin/transactions/export` were missing on backend — created in backend + wired services.
- No i18n library installed; skip that epic.
- `<StatusBadge>` accepts `status` (preferred — auto-derives tone + label). `tone` prop reserved for hard overrides only.
- `<Input>` does NOT accept `debouncedValue` prop — search inputs must handle debounce internally (none of the swept modules use debounce currently).

## Helper Inventory (single source of truth)
- **Date**: `formatDate`, `formatDateTime`, `formatTime`, `formatRelative` in `lib/utils/date.ts`.
- **Money**: `formatNgn`, `formatNgnFromKobo`, `koboToNgn`, `ngnToKobo` in `lib/utils/money.ts` (NOT `lib/utils/currency.ts`).
- **Status**: `statusTone`, `statusBadgeClass`, `statusLabel`, `statusToApi`, `statusBadgeClasses`, `flagStatusLabel`, `referralStatusLabel`, `referralRewardLabel`, `referralTierLabel`, `riskLevelLabel`, `adminRoleLabel`, `notificationChannelLabel`, `notificationAudienceLabel`, `notificationMessageTypeLabel`, `walletStatusLabel`, `walletStatusClass`, `walletTxLabel`, `walletTxClass` in `lib/utils/status.ts`.
- **Filters**: `USER_STATUS_OPTIONS`, `RUNNER_AVAILABILITY_OPTIONS`, `RUNNER_VERIFICATION_OPTIONS`, `TASK_STATUS_OPTIONS`, `PAYOUT_STATUS_OPTIONS`, `TRANSACTION_STATUS_OPTIONS`, `TRANSACTION_TYPE_OPTIONS`, `USER_TYPE_OPTIONS`, `DATE_FILTER_OPTIONS`, `TASK_SORT_OPTIONS`, `USER_SORT_OPTIONS`, `REVENUE_PERIOD_OPTIONS`, `REVENUE_LOCATION_OPTIONS`, `REFERRAL_STATUS_OPTIONS`, `REFERRAL_TIER_OPTIONS`, `FLAG_STATUS_OPTIONS`, `DISPUTE_STATUS_OPTIONS`, `DISPUTE_PRIORITY_OPTIONS`, `DISPUTE_CATEGORY_OPTIONS`, `SUPPORT_TICKET_STATUS_OPTIONS`, `SUPPORT_TICKET_PRIORITY_OPTIONS`, `ADMIN_ROLE_OPTIONS`, `ADMIN_USER_STATUS_OPTIONS`, `NOTIFICATION_AUDIENCE_OPTIONS`, `NOTIFICATION_CHANNEL_OPTIONS`, `NOTIFICATION_MESSAGE_TYPE_OPTIONS`, `EXPORT_FORMATS`, `EXPORT_MIME_TYPES` in `lib/constants/filters.ts`.
- **Constants**: `DEFAULT_PAGE_SIZE`, `DEFAULT_PAGE`, `DEFAULT_SEARCH_DEBOUNCE_MS`, `DEFAULT_DATE_FILTER` in `lib/config/pagination.ts`.
- **Hooks**: `useDebouncedValue` in `lib/hooks/useDebouncedValue.ts`.
- **Components**: `<StatusBadge>`, `<WalletStatusBadge>`, `<WalletTxBadge>` in `components/ui/status-badge.tsx`; `<PageHeader>` in `components/ui/page-header.tsx`; `<LoadingState>` in `components/ui/loading-state.tsx`; `<Select>` in `components/ui/select.tsx`; `<Button>` (cva variants: default/outline/destructive/secondary/ghost/link) in `components/ui/button.tsx`; `<Input>` in `components/ui/input.tsx`.
- **Permissions**: `DEFAULT_PERMISSIONS` in `lib/permissions/defaults.ts`.
- **Charts**: `CHART_COLORS`, `CHART_WEEKDAY_PALETTE`, `CHART_PIE_PALETTE` + magic chart dimensions in `lib/utils/chart-colors.ts`.
- **Enums**: 7 phase-2 enums (`ReferralStatus`, `ReferralRewardStatus`, `ActiveReferralDefinition`, `ReferralTierKey`, `FlagStatus`, `RiskLevel`, `NotificationChannel`, `NotificationMessageType`, `AdminRole`, `ReadStatus`) + `ALL_FILTER` sentinel in `lib/types/enums.ts`.
- **Query keys**: All admin modules in `lib/query/keys.ts` (dashboard, users, runners, requesters, withdrawals, wallets, escrow, tasks, runnerProfile, systemSettings, feedback, runnerDocuments, documentTypes, taskCategories, referral, kyc, compliance).

## Module Progress
### Done
- **referral**: types/api/hooks/components swept. `features/referral/index.ts` rebuilt as a real barrel. `<StatusBadge>`, `formatNgn`, `formatDate`, `LoadingState`, `CHART_COLORS`. Mock data gated behind `USE_MOCKS`.
- **kyc**: types/api/hooks/components swept. `KycStatus` and `KycTab` type aliases. 6 duplicate `useState<"pending"|...>` removed. Dead search filter placeholder removed.
- **runner-documents**: types/hooks/components swept. `<StatusBadge>`, `formatDate`, shared `ID_DISPLAY_LENGTH` constant.
- **compliance**: types/api/hooks/components swept. `FlagStatus` enum adopted. Status dropdown wired via `FLAG_STATUS_OPTIONS` + `flagStatusLabel`. `<StatusBadge status={flagStatus}>` pattern.
- **disputes**: types/api/hooks/components swept. Added `DisputeStatus`/`DisputePriority`/`DisputeCategory` TitleCase enums matching backend. `<StatusBadge status={priority|status}>`. Consolidated `disputeApi.ts` + removed `useTicketStats.ts`. `<LoadingState>` + `<Pagination>` + `<PageHeader>`. Hooks use react-query + `queryKeys.disputes.*`.
- **support-tickets**: hooks/components swept. `<StatusBadge status={status|priority}>` for both columns. `<LoadingState>` + `<Pagination>` + `<PageHeader>`. `formatDateTime` for created_at. `useSupportTicketsList`/`useSupportTicketDetail` switched to react-query + `queryKeys.supportTickets.*`. `DEFAULT_SUPPORT_TICKET_FILTERS` constant.
- **settings/roles**: types/api/hooks/components swept. Uses shared `DEFAULT_PERMISSIONS` from `lib/permissions/defaults.ts`. `getDefaultPermissions()` for init state. `<PageHeader>` + `<Button>` + `<LoadingState>`. Refactored `EditRolePermissionsModal` to avoid set-state-in-effect via `key={role.id}` remount.
- **settings/platform**: types/api/hooks/components swept. Renamed `PlatformSettings` interface to `PlatformSettingsData` to avoid collision with component name. `<PageHeader>` + `<Button>` + `<LoadingState>` + `<Input>` + `<Label>`. `formatNgn` for fee display. React-query + `queryKeys.settings.platform` + `taskCategories`. `useMutation` for `updateSettings`. `PlatformSettingsPayload` for snake_case backend contract.
- **settings/user-access**: types/api/hooks/components swept. `AdminUserRoleLabel`/`AdminUserStatusLabel` aliases for TitleCase UI labels. `<StatusBadge status={status.toLowerCase()}>` fixes the always-green status badge bug. `<PageHeader>` + `<LoadingState>` + `<Button>`. `formatRelative` for lastLogin. Hardcoded `<option>` lists replaced with `ADMIN_ROLE_OPTIONS` + `adminRoleLabel`. `useMutation` for delete with invalidation. `EditAdminModal` refactored to avoid set-state-in-effect via `key={admin.id}`.
- **settings/notifications**: types/api/hooks/components swept. Replaced hand-rolled `notificationsApi` with calls to `adminService.getNotifications/createNotification` (the real backend contract). `<StatusBadge status={type.toLowerCase()}>` for System/Custom. `<PageHeader>` + `<LoadingState>` + `<Pagination>`. `formatDateTime` for date column. `NOTIFICATION_AUDIENCE_OPTIONS` + `NOTIFICATION_CHANNEL_OPTIONS` + `notificationAudienceLabel` + `notificationChannelLabel` replace inline option lists.
- **analytics**: api/hooks/components swept. `useAnalyticsData` switched to react-query + `queryKeys.analytics.data`. `CHART_COLORS`/`CHART_WEEKDAY_PALETTE`/`CHART_PIE_PALETTE` + magic chart dimensions replace ~50 inline hex literals. `formatNgn` + `formatNgnMillions` helper for currency axis. `<PageHeader>` + `<LoadingState>`. Stat cards built from array config instead of 4 hand-rolled divs. `CompareCitiesModal` uses `<Select>` + `formatNgn`; mock data retained (TODO: backend has no `/admin/analytics/cities` endpoint yet).
- **notifications (in-app panel)**: types/api/hooks/components swept. `AdminNotification` interface with `icon`/`iconColor` enums. `ICON_MAP`/`ICON_CLASS` constant maps replace in-render switch statements. `formatRelative` for timestamps. `useNotifications` switched to react-query with optimistic `markAsRead`/`markAllAsRead` mutations and cache invalidation. `<LoadingState>` + `<Button>` "Mark all" affordance wired up.
- **Header**: `bg-[#FF5C5C]` hex replaced with `UNREAD_BADGE_BG_CLASS` from `lib/config/feature-flags.ts` (`bg-red-500` Tailwind token).
- **systemSettings** (receipts/export): backend route + admin service wiring confirmed.

### In Progress
- none

### Blocked
- (none)

## Verification
- `npx tsc --noEmit` clean after settings + analytics + notifications sweep (verified 2026-06-20).
- `eslint` on all swept files: 0 errors. 33 pre-existing warnings (unused imports, no-img-element, set-state-in-effect in untouched modules like AuthContext/TasksList/RequestersList/RunnersList).

## Next Steps (priority order)
- All planned module sweeps are complete. Remaining lint warnings are pre-existing or unused-import housekeeping (33 warnings, 0 errors on swept files).
- Optional follow-ups: i18n epic (skipped — no library installed), backend `/admin/analytics/cities` endpoint to retire `CompareCitiesModal` mock data, `KYCLastAdminId` parameter wiring on kyc approve/reject backend call.

## Critical Context
- Module-shape pattern: each module has `api/` (mock in production paths), `components/`, `hooks/`, `types/` (TitleCase unions), `index.ts` (barrel). All eight modules follow the same anti-patterns.
- `apiClient` (lib/api/client.ts) auto-unwraps `{ success: true, data: <payload> }` envelopes. Services return `.data` directly; feature `api/` wrappers MUST NOT re-wrap.
- Backend route prefix for referral: `GET/POST /admin/referral/*` (controller `admin-referral.controller.ts`).
- Errors seen during sweep:
  - `Duplicate identifier 'ReferralRecordFilters'` — fixed by renaming barrel exports to `ReferralRecordFiltersShape`, etc.
  - `ALL_FILTER` not assignable to `ReferralStatus | undefined` — fixed by widening filter type with `typeof ALL_FILTER`.
  - `queryKeys.referral`/`queryKeys.kyc` undefined — added to `lib/query/keys.ts`.
  - `flagStatusLabel` is in `lib/utils/status.ts`, NOT `lib/types/enums.ts`.
  - `formatNgn` is in `lib/utils/money.ts`, NOT `lib/utils/currency.ts` or `lib/utils/date.ts`.
  - `<StatusBadge>` takes `status` (string), NOT `tone={flagStatusLabel(...)}` (wrong).
  - `<Input>` does NOT accept `debouncedValue` prop.
  - `CompliancePagination` does NOT exist as a shared component — use inline buttons or create one.
  - `ComplianceStats` is not a separate component — must add to components/ if needed, or fold stats into the page.
- Audit doc: `pikquick-admin/docs/HARDCODED_VALUES_AUDIT_PHASE2.md` (~645 findings catalogued).
- Pre-existing lint issues out of scope: `setState`-in-effect warnings on list pages, `react-hooks/exhaustive-deps` warnings.

## Verification
- `npx tsc --noEmit` clean after disputes/support-tickets sweep (verified 2026-06-20).
