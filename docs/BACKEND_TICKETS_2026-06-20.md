# Backend Tickets — From Admin/Backend Contract Probe (2026-06-20)

Verified against `https://app.pikquick.com` with admin token. 23 endpoints probed across the 8 swept admin modules. Backend repo path: `pikquick-backend/src/`.

---

## BE-1 — Stop double-wrapping responses in 5 controllers  · `P0`  · backend

**Issue.** The frontend's `apiClient` already strips one `{ success: true, data: ... }` envelope (see `pikquick-admin/lib/api/client.ts:62-69`). But several controllers wrap their body in a second `{ success, data }` envelope, so the frontend receives `{ success, data: <realPayload> }` and treats the outer `success` as a payload field.

**Affected endpoints** (confirmed via probe):

| Endpoint | Current shape (after one unwrap) | UI expects |
|---|---|---|
| `GET /admin/disputes/stats` | `{ success, data: { openTickets, inProgress, resolved } }` | `{ openTickets, inProgress, resolved }` |
| `GET /admin/kyc/stats` | `{ success, data: { pendingVerifications, resubmissionRequests } }` | `{ pendingVerifications, resubmissionRequests }` |
| `GET /admin/platform/settings` | `{ success, data: { accessFee, platformCommission } }` | `{ accessFee, platformCommission }` |
| `GET /admin/notifications` | `{ success, data: { notifications, unreadCount } }` | `{ notifications, unreadCount }` |
| `GET /admin/roles` | `{ success, data: { data: [...] } }` (uses `data` twice) | `Role[]` |

**Note.** The frontend now deep-unwraps automatically (defensive fix landed in this session — `pikquick-admin/lib/api/client.ts:62-69,97-119`). BE-1 is **optional defense-in-depth**; the frontend will still work either way. Skip only if other priorities take precedence.

**Likely cause.** A second `successResponse(...)` wrapper inside a service method, after the controller already returned one. Audit `pikquick-backend/src/disputes/`, `kyc/`, `admin/`, `notification/` for patterns like `return { success: true, data: ... }` returning from a service that the controller then re-wraps.

**Recommended fix.** Remove the inner wrap in the service. Keep one wrap at the controller boundary.

---

## BE-2 — 8 endpoints return 500 on staging  · `P0`  · backend/DBA

**Endpoints** (all 200 expected, all 500 observed):

| Endpoint | Method | Body |
|---|---|---|
| `/admin/referral/overview` | GET | — |
| `/admin/kyc` | GET | — |
| `/admin/disputes/tickets` | POST | `{ search, priority, category, status, dateFrom, dateTo, page, pageSize }` |
| `/support/admin/tickets` | GET | — |
| `/admin/admins` | GET | — |
| `/admin/task-categories` | GET | — |
| `/admin/analytics` | GET | — |
| `/admin/transactions/export` | GET | — |

**Sample error body** (all 8):
```json
{"statusCode":500,"code":"INTERNAL_SERVER_ERROR","message":"Internal server error"}
```

**Likely causes** (need staging logs to confirm):
1. Missing migration on staging (most likely for `transactions/export` if it depends on a column added later).
2. DB query referencing a column that doesn't exist (e.g., `support/admin/tickets` and `kyc` after a recent schema change).
3. Uncaught exception in service (Knex `KnexTimeoutError`, `TypeError`, etc.).

**Action.** Check `pikquick-backend` logs for the staging pod handling these requests. Trace each stack trace to its source file. For each:
- If migration: write/run the missing migration.
- If column mismatch: align the query with the schema.
- If uncaught: add try/catch + a more specific error message (replace the generic 500).

The frontend is correctly retrying and surfacing the error — these are backend bugs, not sweep regressions.

---

## BE-3 — Register 4 missing controllers  · `P1`  · backend

The frontend has working UI/service code that calls these endpoints, but **no controller is mounted**. The UI will hit 404 even on a healthy backend.

| Endpoint UI calls | Status |
|---|---|
| `GET /admin/referral/elite-review/stats` | 404 — not registered |
| `GET /admin/runner-documents` | 404 — controller missing |
| `GET /admin/runner-documents/pending` | 404 |
| `GET /admin/runner-documents/runner/:runnerId` | 404 |
| `GET /admin/runner-documents/runner/:runnerId/verification-status` | 404 |
| `PUT /admin/runner-documents/:id/verify` | 404 |
| `GET /admin/document-types` | 404 |
| `POST /admin/compliance/flagged` | 404 |
| `GET /admin/compliance/flagged/:id` | 404 |
| `GET /admin/compliance/stats` | 404 |
| `PATCH /admin/compliance/flagged/:id/status` | 404 |

**Action.** Create `RunnerDocumentsController`, `DocumentTypesController`, and `ComplianceController` under `pikquick-backend/src/admin/`. Register them in `pikquick-backend/src/admin/admin.module.ts`. The frontend `lib/services/runner-documents.service.ts`, `compliance.service.ts`, `document-types.service.ts` already target the correct paths and HTTP verbs — match those.

**Note.** The frontend now has a `USE_MOCKS` fallback for runner-documents and compliance (`pikquick-admin/features/runner-documents/types/runner-documents.mock.ts`, `pikquick-admin/features/compliance/api/complianceApi.ts:54,72,90`) — set `NEXT_PUBLIC_USE_MOCKS=true` in `.env.local` for offline work.

---

## BE-4 — Confirm PATCH payload shape for `/admin/platform/settings`  · `P2`  · backend

**Issue.** The frontend `usePlatformSettings` `updateSettings` mutation sends:
```ts
{ access_fee: number, platform_commission: number }
```
(snake_case, derived from `PlatformSettingsPayload` type).

The backend read returns `{ accessFee, platformCommission }` (camelCase).

**Risk.** If the backend controller binds only to camelCase, snake_case in the body will be silently ignored (NestJS default `ValidationPipe` with `transform: true` may or may not handle this depending on the DTO class).

**Action.** Either:
- **(A)** Update `PlatformSettingsDto` to use camelCase, and update the frontend to send camelCase, OR
- **(B)** Confirm the backend already accepts both via `class-transformer`.

**Verification.** PATCH probe with the exact frontend payload — confirm 200 + that the new values are persisted by GETting again. Should be a 2-minute test against staging.

---

## BE-5 — JWT lifetime is 15 minutes — too short  · `P3`  · backend/auth

**Issue.** The token returned by `POST /auth/login` has `exp - iat = 900s` (15 minutes). The admin app's session is unusable for any multi-step workflow longer than that.

**Recommended.** Bump access-token lifetime to at least 1 hour (3600s). Match refresh-token policy to industry standard (sliding window, 7–30 days). Audit `pikquick-backend/src/auth/services/auth.service.ts` for the JWT signing config.

---

## Summary table

| Ticket | Priority | Owner | Blocks frontend feature? |
|---|---|---|---|
| BE-1 (double-wrap) | P0 (defense in depth) | backend | No — frontend works either way |
| BE-2 (500s) | P0 | backend/DBA | **Yes** — 8 features broken |
| BE-3 (missing controllers) | P1 | backend | **Yes** — runner-docs + compliance fully broken |
| BE-4 (PATCH shape) | P2 | backend | Possibly — silent write failures |
| BE-5 (JWT TTL) | P3 | auth | UX only |

Frontend-side fixes already shipped (2026-06-20):
- `lib/api/client.ts` — deep unwrap (handles BE-1 + future drift).
- `features/settings/roles/types/roles.types.ts` — `Role.permissions: string[]` matches backend.
- `features/runner-documents/types/runner-documents.mock.ts` + hook USE_MOCKS branch — usable offline.
- `features/compliance/api/complianceApi.ts` — USE_MOCKS branch with realistic mock data.
