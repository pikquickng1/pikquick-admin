# Admin dashboard – architecture overview

## Stack

- **Next.js 16** (App Router)
- **TanStack Query (React Query)** – server state, caching, mutations
- **Context API** – auth state (access + refresh token, user)
- **Axios** – HTTP client with auth interceptor; success responses unwrapped from `{ success, data }`
- **TypeScript** – types aligned with backend DTOs

## Folder structure

```
lib/
  api/           # API client and config
  types/         # DTOs and enums (from backend)
  services/      # API service functions (one per domain)
  context/       # AuthContext
  query/         # Query client and key factories
  hooks/         # useAuth re-export
  utils/         # cn, money (kobo/NGN)
app/
  providers.tsx  # QueryClientProvider + AuthProvider
```

## Data flow

1. **Auth:** Login via `authService.login({ email, password })` → backend returns `{ access_token, refresh_token, user }` (unwrapped by client). Call `login(accessToken, refreshToken, user)`; tokens and user are stored in memory + localStorage. `setTokenGetter` provides the access token to the axios client. Use `setTokens(accessToken, refreshToken)` after refresh. Refresh: `POST /auth/refresh-token` with `refresh_token`; optional to implement auto-refresh on 401.
2. **Queries:** Use `useQuery` with a service function and a key from `lib/query/keys.ts`. Example:  
   `useQuery({ queryKey: queryKeys.dashboard.stats(), queryFn: () => dashboardService.getStats() })`
3. **Mutations:** Use `useMutation` with a service function and invalidate related query keys on success.

## Services

- **authService** – `POST /auth/login`, `POST /auth/refresh-token`
- **dashboardService** – `GET /admin/dashboard/stats`
- **usersService** – `GET /admin/users`, `GET /admin/users/:id`
- **userManagementService** – legacy `/user` routes (role, cache, soft-delete)
- **withdrawalsService** – `GET /admin/withdrawals`
- **walletsService** – `GET /admin/wallets`
- **escrowService** – escrow stats, release, process-releases
- **tasksService** – `GET /tasks/admin/all`, reported issues
- **runnersService** – manual auto-deduction, subscription stats
- **runnerProfileService** – runner stats, verification/availability, delete profile
- **systemSettingsService** – list, get, create, update, delete; daily fee and auto-deduction
- **feedbackService** – list, get, archive, unarchive, delete
- **runnerDocumentsService** – list, pending, by runner, verification status, verify
- **documentTypesService** – CRUD document types
- **taskCategoriesService** – CRUD task categories

## Env

- `NEXT_PUBLIC_API_BASE_URL` – backend base URL (e.g. `https://api.pikquick.com`). See `.env.example`.

## Backend alignment

- See **docs/BACKEND_ADJUSTMENTS.md**. Backend uses wrapped success responses and documented error shape; CORS must allow the dashboard origin.
