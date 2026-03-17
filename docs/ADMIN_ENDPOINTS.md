# Admin API Endpoints

Reference for integrating the **admin dashboard** with the PikQuick backend. All admin endpoints require **JWT Bearer** authentication and **admin** role.

**Contents:**

1. [Dashboard & stats](#1-dashboard--stats) · 2. [Users (admin)](#2-users-admin) · 3. [User management (legacy)](#3-user-management-legacy-admin-routes) · 4. [Withdrawals](#4-withdrawals-admin) · 5. [Wallets](#5-wallets-admin) · 6. [Escrow](#6-escrow-admin) · 7. [Tasks](#7-tasks-admin) · 8. [Runners](#8-runners-admin) · 9. [Runner profile](#9-runner-profile-admin) · 10. [System settings](#10-system-settings-admin) · 11. [Feedback](#11-feedback-admin) · 12. [Runner documents (KYC)](#12-runner-documents-kyc-admin) · 13. [Document types](#13-document-types-admin) · 14. [Task categories](#14-task-categories-admin) · 15. [Referrals (admin)](#15-referrals-admin) · 16. [Analytics](#16-analytics-admin) · 17. [Disputes](#17-disputes-admin) · 18. [Compliance](#18-compliance-admin) · 19. [KYC Verification](#19-kyc-verification-admin) · 20. [Activity Logs](#20-activity-logs-admin) · 21. [Admin Notifications](#21-admin-notifications) · [Enums](#enums-reference)

**DTOs:** Request/response shapes are described in each section; full definitions live in `src/**/dto/*.dto.ts` and `src/models/*.model.ts`.

---

## Authentication

- **Header:** `Authorization: Bearer <access_token>`
- **Role:** User must have `role: "admin"`.
- **Base URL:** Your API base (e.g. `https://api.pikquick.com`). **No global prefix** is applied — routes are exactly as documented (e.g. `/auth/login`, `/admin/users`).
- **CORS:** Driven by `ALLOWED_ORIGINS` (comma-separated). In production, set this to include the admin dashboard origin (e.g. `https://admin.pikquick.com`).

### Auth for admin dashboard

Admins use the same auth endpoints as other users.

- **Login:** `POST /auth/login`  
  **Body:** `{ "email": "string", "password": "string" }`  
  **Response:** All success responses are wrapped by the backend as:

  ```json
  {
    "success": true,
    "data": {
      "access_token": "string",
      "refresh_token": "string",
      "user": {
        "id": "uuid",
        "email": "string",
        "full_name": "string",
        "phone": "string | null",
        "role": "admin",
        "status": "active",
        "created_at": "ISO8601",
        "updated_at": "ISO8601"
      }
    },
    "timestamp": "ISO8601"
  }
  ```

  The dashboard should read **`data`** for tokens and user (e.g. `response.data.access_token`, `response.data.user`). Use `data.user.role` to confirm admin and build AuthContext.

- **Refresh token:** `POST /auth/refresh-token`  
  **Body:** `{ "refresh_token": "string" }`  
  **Response (wrapped):** `data` contains `{ "access_token": "string", "refresh_token": "string" }` (new pair; refresh token rotation).  
  Access token includes JWT `exp`; the frontend can refresh before expiry or react to 401 and redirect to login.

---

## Response and error shapes

- **Success responses:** Wrapped as `{ "success": true, "data": <payload>, "timestamp": "ISO8601" }`. Always read the actual payload from `data`.
- **Error responses:** **Not** wrapped. Shape:
  ```json
  {
    "statusCode": 401,
    "message": "Unauthorized",
    "code": "optional_error_code",
    "details": {}
  }
  ```
  For **400 validation errors** (e.g. ValidationPipe), `details.errors` is an array of `{ "field": "string", "message": "string" }` (and optionally `children` for nested fields).

---

## 1. Dashboard & stats

### GET `/admin/dashboard/stats`

Aggregated statistics for the admin dashboard (KPIs, counts, escrow summary).

**Response (200):**

```json
{
  "users": {
    "total": 4275,
    "by_role": { "client": 3000, "runner": 1200, "admin": 75 }
  },
  "tasks": {
    "total": 1145,
    "by_status": {
      "pending": 100,
      "task_assigned": 50,
      "completed": 900,
      "cancelled": 95
    }
  },
  "escrow": {
    "total_pending_amount": 5000000,
    "total_pending_transactions": 120,
    "ready_to_release_amount": 2000000,
    "ready_to_release_count": 45,
    "average_hold_time_hours": 22.5
  },
  "withdrawals": { "pending_count": 3 },
  "pending_document_verifications": 5,
  "feedback_total": 42
}
```

| Field                            | Description                                            |
| -------------------------------- | ------------------------------------------------------ |
| `users.total`                    | Total non-deleted users                                |
| `users.by_role`                  | Count per role (`client`, `runner`, `admin`)           |
| `tasks.total` / `by_status`      | Task counts by status                                  |
| `escrow.total_pending_amount`    | Sum in **kobo**; divide by 100 for NGN                 |
| `escrow.ready_to_release_*`      | Amount/count eligible for release (e.g. 24h hold)      |
| `withdrawals.pending_count`      | Withdrawals with status `pending`                      |
| `pending_document_verifications` | Runner documents with `verification_status: "pending"` |

---

## 2. Users (admin)

**Base path:** `/admin/users`  
**Controller:** `AdminUserController`

### GET `/admin/users`

Paginated list of users. Excludes soft-deleted; response does not include `password`.

**Query:**

| Param    | Type   | Required | Description                                          |
| -------- | ------ | -------- | ---------------------------------------------------- |
| `page`   | number | No       | 1-based; default `1`                                 |
| `limit`  | number | No       | Page size; default `20`, max 100                     |
| `role`   | string | No       | Filter: `client`, `runner`, `admin`                  |
| `status` | string | No       | Filter: `active`, `inactive`, `suspended`, `deleted` |
| `search` | string | No       | Search in `email` and `full_name`                    |

**Response (200):**

```json
{
  "data": [
    {
      "id": "uuid",
      "full_name": "string",
      "email": "string",
      "phone": "string | null",
      "role": "client",
      "status": "active",
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

**Enums:** `UserRole`: `client`, `runner`, `admin`. `UserStatus`: `active`, `inactive`, `suspended`, `deleted`.

---

### GET `/admin/users/:id`

Get one user by ID (admin view). Password is omitted.

**Params:** `id` (path) – user UUID.

**Response (200):** Same user object as in list (no `password`).  
**404:** User not found or soft-deleted.

---

## 3. User management (legacy admin routes)

**Base path:** `/user`  
**Controller:** `UserController` (admin-only methods)

### PUT `/user/role/:id`

Update a user’s role.

**Params:** `id` – user UUID.  
**Body:** `{ "role": "admin" | "client" | "runner" }`

**Response (200):** Full user entity (backend may include hashed password; dashboard should not display it).

---

### DELETE `/user/cache/by-id/:userId`

Clear cache entries for a user by ID.

**Response (200):** `{ "success": true }`

---

### DELETE `/user/cache/by-email/:email`

Clear cache entries for a user by email.

**Response (200):** `{ "success": true }`

---

### DELETE `/user/:id`

Soft-delete a user. Only admins can delete other users.

**Params:** `id` – user UUID.

**Response (200):** `{ "message": "User account deleted successfully" }`  
**404:** User not found or already deleted.

---

## 4. Withdrawals (admin)

**Base path:** `/admin/withdrawals`  
**Controller:** `AdminWithdrawalController`

### GET `/admin/withdrawals`

Paginated list of all withdrawals (payout requests).

**Query:**

| Param     | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| `page`    | number | No       | Default `1`                                   |
| `limit`   | number | No       | Default `20`, max 100                         |
| `status`  | string | No       | `pending`, `successful`, `failed`, `reversed` |
| `user_id` | string | No       | Filter by user UUID                           |

**Response (200):**

```json
{
  "data": [
    {
      "id": "string",
      "user_id": "string",
      "amount": 250000,
      "reference": "string",
      "status": "pending",
      "transfer_code": "string | undefined",
      "failure_reason": "string | undefined",
      "created_at": "ISO8601",
      "updated_at": "ISO8601",
      "completed_at": "ISO8601 | undefined"
    }
  ],
  "total": 50,
  "page": 1,
  "limit": 20
}
```

**Note:** `amount` is in **kobo**; divide by 100 for NGN.

**WithdrawalStatus:** `pending` \| `successful` \| `failed` \| `reversed`

---

## 5. Wallets (admin)

**Base path:** `/admin/wallets`  
**Controller:** `AdminWalletController`

### GET `/admin/wallets`

Wallet overview (totals) plus paginated list of wallets.

**Query:**

| Param   | Type   | Required | Description  |
| ------- | ------ | -------- | ------------ |
| `page`  | number | No       | Default `1`  |
| `limit` | number | No       | Default `20` |

**Response (200):**

```json
{
  "summary": {
    "total_wallets": 10,
    "total_balance": 67200,
    "total_balance_ngn": 67200
  },
  "data": [
    {
      "id": "string",
      "user_id": "string",
      "balance": 45000,
      "status": "ACTIVE",
      "currency_code": "NGN",
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 20
}
```

---

## 6. Escrow (admin)

**Base path:** `/escrow`  
**Controller:** `EscrowController` (admin routes protected by role)

### GET `/escrow/admin/statistics`

Escrow statistics for admin (pending amounts, counts, average hold).

**Response (200):**

```json
{
  "total_pending_amount": 5000000,
  "total_pending_transactions": 120,
  "ready_to_release_amount": 2000000,
  "ready_to_release_count": 45,
  "average_hold_time_hours": 22.5,
  "total_pending_amount_ngn": 50000,
  "ready_to_release_amount_ngn": 20000
}
```

Amounts in kobo and NGN are both returned.

---

### POST `/escrow/admin/release/:transactionId`

Manually release escrow for a single transaction (e.g. dispute resolution).

**Params:** `transactionId` – transaction UUID.  
**Body:** `{ "reason": "string" }` (required; e.g. “Manual release by admin – reason”).

**Response (200):**

```json
{
  "message": "Escrow funds released successfully",
  "transaction_id": "uuid",
  "released_by": "admin-user-uuid",
  "reason": "string"
}
```

---

### POST `/escrow/admin/process-releases`

Trigger the batch job that releases all eligible escrow (e.g. after 24h hold).

**Body:** none.

**Response (200):**

```json
{
  "message": "Escrow release process triggered successfully",
  "triggered_by": "admin-user-uuid",
  "triggered_at": "ISO8601"
}
```

---

## 7. Tasks (admin)

**Base path:** `/tasks`  
**Controller:** `TaskController`

### GET `/tasks` (admin list: `scope=all`)

Single list endpoint for all roles. Admin uses **`GET /tasks?scope=all`** for a paginated list of all tasks (replaces former `GET /tasks/admin/all`).

**Query (admin):**

| Param        | Type   | Required         | Description                      |
| ------------ | ------ | ---------------- | -------------------------------- |
| `scope`      | string | Yes (admin list) | `all` for admin                  |
| `status`     | string | No               | Task status (see TaskStatus)     |
| `runner_id`  | string | No               | Filter by runner user ID         |
| `start_date` | string | No               | YYYY-MM-DD                       |
| `end_date`   | string | No               | YYYY-MM-DD                       |
| `page`       | number | No               | 1-based; default `1`             |
| `limit`      | number | No               | Page size; default `20`, max 100 |

**Response (200) when scope=all:**

```json
{
  "data": [
    /* TaskResponseDto[] */
  ],
  "total": 500,
  "page": 1,
  "limit": 20
}
```

Each item in `data` has the same shape as public task responses (e.g. `id`, `description`, `budget`, `task_type`, `status`, `client_id`, `client_name`, `runner_id`, `runner_name`, `created_at`, `updated_at`, etc.). See **docs/TASK_LIFECYCLE.md** for full list query params and other scopes (`mine`, `available`, `history`).

---

### GET `/tasks/admin/all-reported-issues`

All reported issues across tasks (for disputes/support). Returns rows from `task_proof_submissions` where `status = 'issue_reported'`, ordered by `issue_reported_at` desc.

**Response (200):** Array of reported-issue objects. Each item has the shape below (DB columns; `proof_urls` is parsed from JSON into an array):

| Field               | Type           | Description                                                                                                             |
| ------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `id`                | string         | Submission UUID                                                                                                         |
| `task_id`           | string         | Task UUID                                                                                                               |
| `runner_id`         | string         | Runner user UUID                                                                                                        |
| `proof_urls`        | string[]       | Array of proof image URLs                                                                                               |
| `notes`             | string \| null | Submission notes                                                                                                        |
| `submitted_at`      | string         | ISO8601                                                                                                                 |
| `status`            | string         | `issue_reported`                                                                                                        |
| `acknowledged_at`   | string \| null | ISO8601                                                                                                                 |
| `issue_type`        | string \| null | e.g. `incomplete_work`, `wrong_location`, `damaged_items`, `wrong_items`, `poor_quality`, `other`, `poor_communication` |
| `issue_notes`       | string \| null | Client’s issue description                                                                                              |
| `issue_reported_at` | string \| null | ISO8601 when issue was reported                                                                                         |
| `created_at`        | string         | ISO8601                                                                                                                 |
| `updated_at`        | string         | ISO8601                                                                                                                 |

---

## 8. Runners (admin)

**Base path:** `/admin/runners`  
**Controller:** `RunnerAdminController`

### POST `/admin/runners/auto-deduction/manual-trigger`

Run the daily runner fee (auto-deduction) job manually.

**Body:** none.

**Response (200):**

```json
{
  "processed": 25,
  "successful": 20,
  "failed": 5,
  "message": "Manual deduction completed: 20 successful, 5 failed out of 25 processed"
}
```

**DTO:** `ManualDeductionResultDto`: `processed`, `successful`, `failed`, `message`.

---

### GET `/admin/runners/subscriptions/stats`

Runner subscription statistics (e.g. daily fee subscriptions).

**Response (200):**

```json
{
  "totalSubscribed": 120,
  "totalUnsubscribed": 0,
  "recentSubscriptions": [
    {
      "id": "uuid",
      "userId": "string",
      "isSubscribed": true,
      "subscribedAt": "ISO8601",
      "lastDeductionAt": "ISO8601 | null",
      "lastDeductionAmount": "number | null",
      "createdAt": "ISO8601",
      "updatedAt": "ISO8601"
    }
  ]
}
```

- `totalSubscribed`: count of runners currently subscribed to auto-deduction.
- `totalUnsubscribed`: currently always `0` (not tracked separately).
- `recentSubscriptions`: subscriptions that started in the last 30 days (`RunnerSubscription[]`).

---

## 9. Runner profile (admin)

**Base path:** `/runner-profile`  
**Controller:** `RunnerProfileController`

### GET `/runner-profile/statistics`

Global runner statistics (counts, verified, available, trust score, transport mode distribution). Admin only.

**Response (200):**

```json
{
  "total_runners": 362,
  "verified_runners": 300,
  "available_runners": 150,
  "average_trust_score": 4.2,
  "transport_mode_distribution": [
    { "transport_mode": "motorcycle", "count": 200 },
    { "transport_mode": "bicycle", "count": 100 }
  ]
}
```

---

### PUT `/runner-profile/verification-and-availability`

Temporary admin endpoint to set a runner’s verification status and availability (testing/support).

**Body:**

```json
{
  "userId": "runner-user-uuid",
  "is_available": true,
  "status": "verified",
  "reason": "optional note"
}
```

---

### DELETE `/runner-profile/:userId`

Permanently delete a runner profile. Allowed for admin or profile owner.

**Params:** `userId` – runner’s user ID.

**Response (200):** `{ "message": "Profile deleted successfully" }`

---

## 10. System settings (admin)

**Base path:** `/admin/system-settings`  
**Controller:** `SystemSettingsController`

All responses require admin JWT.

### GET `/admin/system-settings`

List all system settings (key-value + metadata).

**Response (200):** Array of setting objects (key, value, description, dataType, etc.).

---

### GET `/admin/system-settings/auto-deduction/config`

Current auto-deduction configuration.

**Response (200):** `AutoDeductionConfigResponseDto`:

```json
{
  "dailyFee": 100,
  "deductionTime": "08:00",
  "enabled": true
}
```

---

### PUT `/admin/system-settings/daily-fee`

Update daily runner fee (NGN).

**Body:** `UpdateDailyFeeDto`: `{ "amount": 100 }` (number, 1–10000).

---

### PUT `/admin/system-settings/auto-deduction/time`

Update time when auto-deduction runs (24h).

**Body:** `UpdateAutoDeductionTimeDto`: `{ "time": "08:00" }` (HH:MM).

---

### PUT `/admin/system-settings/auto-deduction/toggle`

Enable or disable auto-deduction globally.

**Body:** `ToggleAutoDeductionDto`: `{ "enabled": true }`

---

### GET `/admin/system-settings/:key`

Get one setting by key (e.g. `daily_runner_fee`).

---

### POST `/admin/system-settings`

Create a custom system setting.

**Body:** `CreateSystemSettingDto`:

```ts
{
  key: string;
  value: string;
  description?: string;
  dataType: 'string' | 'number' | 'boolean' | 'json';
}
```

---

### PUT `/admin/system-settings/:key`

Update a setting by key.

**Body:** `UpdateSystemSettingDto`: `{ "value": "string", "description"?: "string" }`

---

### DELETE `/admin/system-settings/:key`

Delete a setting. Protected settings cannot be deleted.

---

## 11. Feedback (admin)

**Base path:** `/feedback`  
**Guards:** JWT + `RolesGuard` with `admin`.  
**Controller:** `FeedbackController`

### GET `/feedback`

List all feedback (paginated). Admin only.

**Query:** `page` (number), `limit` (number), `archived` (boolean, optional).

**Response (200):**

```json
{
  "data": [
    {
      "id": "string",
      "full_name": "string",
      "email": "string",
      "message": "string",
      "is_archived": false,
      "created_at": "ISO8601",
      "updated_at": "ISO8601"
    }
  ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

**DTO:** `FeedbackResponseDto`: `id`, `full_name`, `email`, `message`, `is_archived`, `created_at`, `updated_at`. Response includes `page` and `limit` for consistency with other paginated list endpoints.

---

### GET `/feedback/:id`

Get one feedback by ID. Admin only.

---

### PATCH `/feedback/:id/archive`

Mark feedback as archived. Admin only.

**Response (200):** Updated `FeedbackResponseDto`.

---

### PATCH `/feedback/:id/unarchive`

Unarchive feedback. Admin only.

---

### DELETE `/feedback/:id`

Delete feedback. Admin only. **Response:** 204 No Content.

---

## 12. Runner documents (KYC) (admin)

**Base path:** `/runner-documents`  
**Controller:** `RunnerDocumentController`

### GET `/runner-documents`

List all runner documents (with filters). Admin only.

**Query:** `RunnerDocumentFilterDto` – optional `runner_id`, `document_type_id`, `verification_status`, `search`.

**Response (200):** Array of `RunnerDocumentResponseDto` (id, runner_id, document_type_id, document_url, verification_status, rejection_reason, submitted_at, verified_at, etc.).

---

### GET `/runner-documents/pending`

List documents with `verification_status: "pending"` for KYC queue. Admin only.

**Response (200):** Array of runner documents.

---

### GET `/runner-documents/runner/:runnerId`

Documents for one runner. Admin only.

---

### GET `/runner-documents/runner/:runnerId/verification-status`

Verification summary for a runner. Admin only.

**Response (200):**

```json
{
  "total_required": 3,
  "total_submitted": 3,
  "total_verified": 2,
  "total_rejected": 0,
  "is_fully_verified": false
}
```

---

### PUT `/runner-documents/:id/verify`

Verify or reject a document. Admin only.

**Body:** `VerifyRunnerDocumentDto`:

```json
{
  "verification_status": "verified | rejected",
  "rejection_reason": "optional string, max 500 chars if rejected"
}
```

**DocumentVerificationStatus:** `pending` \| `verified` \| `rejected`

---

## 13. Document types (admin)

**Base path:** `/document-types`  
**Controller:** `DocumentTypeController`

Create/update/delete are admin-only. List and get by ID are available to authenticated users.

### POST `/document-types`

Create document type (e.g. “National ID”, “Driver’s licence”). Admin only.

**Body:** `CreateDocumentTypeDto`:

```json
{
  "name": "string (2–100)",
  "description": "string (optional, max 500)",
  "is_required": true
}
```

---

### PUT `/document-types/:id`

Update document type. Admin only.

**Body:** `UpdateDocumentTypeDto`: `name?`, `description?`, `is_required?`.

---

### DELETE `/document-types/:id`

Delete document type. Admin only. **Response:** 204.

---

## 14. Task categories (admin)

**Base path:** `/task-categories`  
**Controller:** `TaskCategoryController`

### POST `/task-categories`

Create category. Admin only.

**Body:** `CreateTaskCategoryDto`:

```json
{
  "name": "string (3–50)",
  "description": "string (optional, max 500)",
  "category_image": "string (optional)"
}
```

---

### PUT `/task-categories/:id`

Update category. Admin only.

**Body:** `UpdateTaskCategoryDto`: `name?`, `description?`, `category_image?`.

---

### DELETE `/task-categories/:id`

Delete category. Admin only. **Response:** 204.

---

## 15. Referrals (admin)

**Base path:** `/admin/referral`  
**Controller:** `AdminReferralController`

All responses require admin JWT.

---

### GET `/admin/referral/settings`

Get referral program settings and tiers.

**Response (200):**

```json
{
  "settings": {
    "program_enabled": true,
    "active_referral_definition": "first_task_completed",
    "verification_period_hours": 24,
    "require_manual_review_elite": true,
    "first_n_amount_ngn": null
  },
  "tiers": [
    {
      "key": "STARTER",
      "name": "Starter Tier",
      "threshold": 10,
      "reward_amount_ngn": 1500,
      "sort_order": 1,
      "requires_manual_review": false
    }
  ]
}
```

**DTO:** `AdminReferralSettingsResponseDto`

---

### POST `/admin/referral/settings`

Update referral program settings and tiers.

**Body:** `AdminUpdateReferralSettingsDto`

```json
{
  "settings": {
    "program_enabled": true,
    "active_referral_definition": "first_task_completed",
    "verification_period_hours": 24,
    "require_manual_review_elite": true,
    "first_n_amount_ngn": null
  },
  "tiers": [
    {
      "key": "STARTER",
      "name": "Starter Tier",
      "threshold": 10,
      "reward_amount_ngn": 1500,
      "sort_order": 1,
      "requires_manual_review": false
    }
  ]
}
```

All fields are optional. Include only what you want to update.

---

### GET `/admin/referral/overview`

Get referral overview metrics for a specific month.

**Query:**

| Param   | Type   | Required | Description                                                    |
| ------- | ------ | -------- | -------------------------------------------------------------- |
| `month` | string | No       | Format: `YYYY-MM` (e.g. `2026-02`). Defaults to current month. |

**Response (200):**

```json
{
  "month": "2026-02",
  "totalReferrals": 1284,
  "activeReferrals": 856,
  "rewardsUnlocked": 422,
  "eliteCandidates": 18,
  "totalPaidAmount": 850000,
  "totalPendingAmount": 150000
}
```

**DTO:** `AdminReferralOverviewDto`

---

### GET `/admin/referral/records`

List referral records (paginated).

**Query:**

| Param    | Type   | Required | Description                           |
| -------- | ------ | -------- | ------------------------------------- |
| `page`   | number | No       | Default `1`                           |
| `limit`  | number | No       | Default `10`                          |
| `month`  | string | No       | Format: `YYYY-MM`                     |
| `status` | string | No       | e.g. `active`, `pending`, `completed` |

**Response (200):**

```json
{
  "data": [
    {
      "id": "referral-id",
      "referrer_id": "user-id",
      "referred_user_id": "referred-id",
      "status": "active",
      "month": "2026-02"
    }
  ],
  "meta": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "hasMore": true
  }
}
```

---

### GET `/admin/referral/records/:id`

Get detailed view of a single referral record.

**Params:** `id` – referral record UUID.

**Response (200):**

```json
{
  "referral": {
    "id": "referral-id",
    "referrer_id": "user-id",
    "referred_user_id": "referred-id",
    "status": "active",
    "month": "2026-02",
    "first_task_id": "task-id",
    "qualified_at": "2026-02-10T12:34:56.000Z"
  }
}
```

**DTO:** `AdminReferralRecordResponseDto`

---

### GET `/admin/referral/elite-review`

List elite referral rewards that require manual review.

**Query:**

| Param   | Type   | Required | Description  |
| ------- | ------ | -------- | ------------ |
| `page`  | number | No       | Default `1`  |
| `limit` | number | No       | Default `10` |

**Response (200):**

```json
{
  "data": [
    {
      "id": "reward-id",
      "referrer_id": "user-id",
      "tier_key": "ELITE",
      "amount_ngn": 25000,
      "status": "under_review",
      "month": "2026-02"
    }
  ],
  "meta": {
    "total": 3,
    "page": 1,
    "limit": 10,
    "hasMore": false
  }
}
```

---

### POST `/admin/referral/elite-review/:id/approve`

Approve an elite referral reward.

**Params:** `id` – reward UUID.

**Body:**

```json
{
  "notes": "Elite review passed; no suspicious activity detected."
}
```

**Response (200):**

```json
{
  "reward": {
    "id": "reward-id",
    "referrer_id": "user-id",
    "tier_key": "ELITE",
    "amount_ngn": 25000,
    "status": "approved",
    "month": "2026-02"
  }
}
```

**DTO:** `AdminEliteRewardResponseDto`

---

### POST `/admin/referral/elite-review/:id/reject`

Reject an elite referral reward.

**Params:** `id` – reward UUID.

**Body:**

```json
{
  "reason": "Multiple accounts from same device",
  "notes": "High fraud risk; rejecting elite reward."
}
```

**Response (200):**

```json
{
  "reward": {
    "id": "reward-id",
    "referrer_id": "user-id",
    "tier_key": "ELITE",
    "amount_ngn": 25000,
    "status": "rejected",
    "month": "2026-02"
  }
}
```

**DTO:** `AdminEliteRewardResponseDto`

---

### POST `/admin/referral/rewards/:id/payout`

Payout a referral reward to the user's wallet.

**Params:** `id` – reward UUID.

**Response (200):**

```json
{
  "message": "Reward payout processed",
  "wallet": {
    "id": "wallet-id",
    "userId": "user-id",
    "balance": 6500
  },
  "transaction": {
    "id": "transaction-id",
    "user_id": "user-id",
    "wallet_id": "wallet-id",
    "amount": 1500,
    "type": "REFERRAL_REWARD",
    "status": "COMPLETED"
  }
}
```

**DTO:** `AdminPayoutRewardResponseDto`

---

## 16. Analytics (admin)

**Base path:** `/admin/analytics`  
**Controller:** `AnalyticsController`

All responses require admin JWT.

### GET `/admin/analytics`

Get full platform analytics dashboard with all charts and stats.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "stats": {
      "totalTasks": 150,
      "avgCompletionTime": 45,
      "retentionRate": 78,
      "activeUsers": 234
    },
    "tasksByCategory": [
      { "name": "Delivery", "value": 80, "color": "#FF6B6B" },
      { "name": "Errands", "value": 45, "color": "#4ECDC4" }
    ],
    "completionTrend": [
      { "month": "2025-09", "minutes": 42 },
      { "month": "2025-10", "minutes": 38 }
    ],
    "topCities": [
      { "city": "Lagos", "volume": 120 },
      { "city": "Abuja", "volume": 85 }
    ],
    "monthlyEarnings": [{ "month": "2025-09", "earnings": 12500 }],
    "revenueBreakdown": [
      { "name": "Task Payments", "value": 15000, "color": "#4ECDC4" },
      { "name": "Subscriptions", "value": 2500, "color": "#FF6B6B" }
    ],
    "peakUsageHours": [
      {
        "time": "08:00",
        "Mon": 12,
        "Tue": 15,
        "Wed": 10,
        "Thu": 14,
        "Fri": 18,
        "Sat": 8,
        "Sun": 5
      }
    ],
    "userMetrics": {
      "repeatUserRate": 45,
      "newUserRate": 55,
      "monthlyData": [
        { "month": "2025-09", "newUsers": 45, "returningUsers": 30 }
      ]
    }
  }
}
```

### GET `/admin/analytics/stats`

Get dashboard statistics only.

### GET `/admin/analytics/tasks-by-category`

Get tasks grouped by category.

### GET `/admin/analytics/completion-trend`

Get task completion trend over time.

### GET `/admin/analytics/top-cities`

Get top cities by task volume.

### GET `/admin/analytics/monthly-earnings`

Get monthly earnings.

### GET `/admin/analytics/revenue-breakdown`

Get revenue breakdown by source.

### GET `/admin/analytics/peak-usage`

Get peak usage hours by day of week.

### GET `/admin/analytics/user-metrics`

Get user metrics and retention.

---

## 17. Disputes (admin)

**Base path:** `/admin/disputes`  
**Controller:** `DisputeController`

All responses require admin JWT.

### POST `/admin/disputes/tickets`

Get paginated list of dispute tickets with filters.

**Query:** `page`, `pageSize`

**Request Body:**

```json
{
  "search": "string",
  "priority": "High" | "Medium" | "Low",
  "category": "Task Dispute" | "Payment Issue" | "Account Issue" | "Technical Support" | "Other",
  "dateFrom": "2025-01-01",
  "dateTo": "2025-12-31"
}
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "uuid",
        "ticketId": "DSP-000001",
        "user": { "name": "John Doe", "role": "Runner" },
        "category": "Task Dispute",
        "priority": "High",
        "assignedAgent": "Admin User",
        "status": "Open",
        "date": "2025-03-15T10:30:00Z"
      }
    ],
    "total": 25,
    "page": 1,
    "pageSize": 10,
    "totalPages": 3
  }
}
```

### GET `/admin/disputes/stats`

Get dispute ticket statistics.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "openTickets": 12,
    "inProgress": 5,
    "resolved": 8
  }
}
```

### GET `/admin/disputes/tickets/:id`

Get a specific dispute ticket by ID.

### POST `/admin/disputes/:id/assign`

Assign a dispute ticket to an agent.

**Body:** `{ "agentId": "uuid" }`

### POST `/admin/disputes/:id/resolve`

Resolve a dispute ticket.

**Body:**

```json
{
  "status": "Resolved",
  "resolutionNotes": "Issue resolved by refunding user"
}
```

---

## 18. Compliance (admin)

**Base path:** `/admin/compliance`  
**Controller:** `ComplianceController`

All responses require admin JWT.

### GET `/admin/compliance/flagged`

Get list of flagged activities.

**Query:** `page`, `limit`, `search`, `status`, `dateFrom`, `dateTo`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "userId": "uuid",
        "userName": "John Doe",
        "activitySummary": "Multiple failed transactions",
        "flaggedDate": "2025-03-15T10:30:00Z",
        "flagStatus": "Flagged",
        "flagReason": "Suspicious transaction pattern"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 45,
      "itemsPerPage": 10
    }
  }
}
```

### GET `/admin/compliance/flagged/:id`

Get flagged activity details.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "userName": "John Doe",
    "activitySummary": "Multiple failed transactions",
    "flaggedDate": "2025-03-15T10:30:00Z",
    "flagStatus": "Flagged",
    "flagReason": "Suspicious transaction pattern",
    "totalAmount": 50000,
    "transactionCount": 15
  }
}
```

### GET `/admin/compliance/stats`

Get compliance statistics.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "kycSummaryCount": 25,
    "flaggedTransactions": 12,
    "suspendedAccounts": 3
  }
}
```

### PATCH `/admin/compliance/flagged/:id/status`

Update flagged activity status.

**Body:** `{ "status": "Flagged" | "Under Review" | "Resolved" }`

---

## 19. KYC Verification (admin)

**Base path:** `/admin/kyc`  
**Controller:** `KycController`

All responses require admin JWT.

### GET `/admin/kyc`

Get list of KYC applications.

**Query:** `page`, `limit`, `status`, `search`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "id": "uuid",
        "runnerName": "John Doe",
        "idType": "National ID",
        "email": "john@example.com",
        "phone": "+2348123456789",
        "dateSubmitted": "2025-03-15T10:30:00Z",
        "status": "pending",
        "rejectionReason": null
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalItems": 25,
      "itemsPerPage": 10
    }
  }
}
```

### GET `/admin/kyc/:id`

Get KYC application details.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "runnerName": "John Doe",
    "idType": "National ID",
    "email": "john@example.com",
    "phone": "+2348123456789",
    "dateSubmitted": "2025-03-15T10:30:00Z",
    "status": "pending",
    "documents": {
      "idDocument": "https://cloudinary.com/doc.jpg",
      "proofOfAddress": null,
      "selfie": null
    },
    "rejectionReason": null
  }
}
```

### GET `/admin/kyc/stats`

Get KYC statistics.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "pendingVerifications": 15,
    "resubmissionRequests": 3
  }
}
```

### POST `/admin/kyc/:id/approve`

Approve KYC application.

**Body:** `{ "adminId": "uuid" }`

**Response (200):**

```json
{
  "success": true,
  "message": "KYC approved successfully"
}
```

### POST `/admin/kyc/:id/reject`

Reject KYC application.

**Body:**

```json
{
  "reason": "Document is blurry",
  "adminId": "uuid"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "KYC rejected successfully"
}
```

---

## 20. Activity Logs (admin)

**Base path:** `/admin/activity-logs`  
**Controller:** `ActivityLogController`

All responses require admin JWT.

### GET `/admin/activity-logs`

Get list of activity logs.

**Query:** `page`, `limit`, `search`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "uuid",
        "admin": "uuid",
        "adminName": "Admin User",
        "action": "USER_SUSPENDED",
        "affectedUser": { "id": "uuid", "name": "John Doe" },
        "timestamp": "2025-03-15T10:30:00Z"
      }
    ],
    "total": 150,
    "page": 1,
    "totalPages": 8
  }
}
```

---

## 21. Admin Notifications

**Base path:** `/admin/notifications`  
**Controller:** `AdminNotificationController`

All responses require admin JWT.

### GET `/admin/notifications`

Get all admin notifications.

**Response (200):**

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "title": "New KYC Submission",
        "description": "John Doe has submitted their documents",
        "timestamp": "2025-03-15T10:30:00Z",
        "isNew": true,
        "icon": "bell",
        "iconColor": "#4ECDC4"
      }
    ],
    "unreadCount": 5
  }
}
```

### PATCH `/admin/notifications/:id/read`

Mark notification as read.

**Response (200):**

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### POST `/admin/notifications/read-all`

Mark all notifications as read.

**Response (200):**

```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

---

## Enums reference

| Enum                           | Values                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| **UserRole**                   | `client`, `runner`, `admin`                                                                |
| **UserStatus**                 | `active`, `inactive`, `suspended`, `deleted`                                               |
| **WithdrawalStatus**           | `pending`, `successful`, `failed`, `reversed`                                              |
| **DocumentVerificationStatus** | `pending`, `verified`, `rejected`                                                          |
| **ReferralStatus**             | `pending`, `active`, `completed`, `disqualified`                                           |
| **ReferralRewardStatus**       | `pending`, `under_review`, `approved`, `rejected`, `paid`                                  |
| **TaskStatus**                 | e.g. `pending`, `task_assigned`, `completed`, `cancelled`, etc. (see `TaskStatus` in code) |
| **DisputesStatus**             | `Open`, `In Progress`, `Resolved`                                                          |
| **DisputesPriority**           | `High`, `Medium`, `Low`                                                                    |
| **DisputesCategory**           | `Task Dispute`, `Payment Issue`, `Account Issue`, `Technical Support`, `Other`             |
| **FlagStatus**                 | `Flagged`, `Under Review`, `Resolved`                                                      |

---

## Error responses

- **401 Unauthorized:** Missing or invalid JWT.
- **403 Forbidden:** Valid JWT but user is not admin.
- **404 Not Found:** Resource not found (e.g. user, feedback, document).
- **400 Bad Request:** Validation error on body/query; check Swagger or response body for details.

---

## Integration notes for admin dashboard

1. **Auth:** Send `Authorization: Bearer <access_token>` for every request; ensure the logged-in user has `role: "admin"`.
2. **Pagination:** List endpoints use `page` (1-based) and `limit`; use `total` for “Showing X–Y of Z”.
3. **Money:** Escrow and withdrawal `amount` are in **kobo**; multiply by 0.01 or divide by 100 for NGN display. Dashboard stats and escrow stats also expose `*_ngn` where applicable.
4. **Swagger:** Run the app and open `/api` (or your Swagger path) for full request/response schemas and try-it-out.
