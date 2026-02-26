# Backend adjustments for admin dashboard integration

This document tracks changes or clarifications needed on the **PikQuick backend**. Items that have been addressed by the backend are marked as **Done**.

---

## Done (backend implemented)

- **Auth:** `POST /auth/login` and `POST /auth/refresh-token` with wrapped response `{ success, data: { access_token, refresh_token, user } }`. Dashboard reads `data` and uses it for AuthContext.
- **Response wrapping:** Success responses use `{ success: true, data: <payload>, timestamp }`. Dashboard API client unwraps so services receive `<payload>`.
- **Error shape:** Errors are not wrapped; shape `{ statusCode, message, code?, details? }` with `details.errors` for validation. Dashboard types and login error handling use this.
- **Feedback list:** Response includes `page` and `limit` with `data` and `total`.
- **Tasks admin list:** `GET /tasks/admin/all` has `page`, `limit` query params and returns `{ data, total, page, limit }`.
- **Runner subscription stats:** Response shape documented (`totalSubscribed`, `totalUnsubscribed`, `recentSubscriptions`). Dashboard types updated.
- **Reported issues:** Full structure documented (id, task_id, runner_id, proof_urls, notes, status, issue_type, issue_notes, etc.). Dashboard types updated.
- **Base URL:** No global prefix; routes as documented (e.g. `/auth/login`, `/admin/users`).

---

## Remaining / operational

### CORS

- **Backend:** Set `ALLOWED_ORIGINS` (comma-separated) to include the admin dashboard origin in production (e.g. `https://admin.pikquick.com`) and optionally `http://localhost:3000` for local dev.

---

## Optional future improvements

- **Refresh on 401:** Backend supports refresh token; dashboard could implement automatic token refresh on 401 (call `POST /auth/refresh-token`, then retry the failed request) before redirecting to login.
- **Protected settings:** Document which system setting keys cannot be deleted so the UI can disable delete for those.

---

*Last updated after backend auth, wrapping, pagination, and DTO documentation changes.*
