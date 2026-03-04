# Current Architecture Analysis & Best Practices

## Overview
This document explains the current architecture, what's integrated with the backend, and how everything wires together.

---

## 🏗️ Architecture Layers

### 1. **lib/** - Shared Infrastructure (Backend-Integrated)
This is your **production-ready** layer that connects to the real backend.

```
lib/
├── api/
│   ├── client.ts          # Axios instance with auth interceptor
│   └── config.ts          # API base URL configuration
├── services/              # Backend API service functions
│   ├── auth.service.ts    # ✅ INTEGRATED: Login, refresh tokens
│   ├── wallets.service.ts # ✅ INTEGRATED: GET /admin/wallets
│   ├── users.service.ts   # ✅ INTEGRATED: User management
│   └── ...                # Other integrated services
├── types/                 # TypeScript types matching backend DTOs
├── context/
│   └── AuthContext.tsx    # ✅ INTEGRATED: Auth state management
└── query/
    ├── query-client.ts    # TanStack Query configuration
    └── keys.ts            # Query key factories
```

**Status:** ✅ **FULLY INTEGRATED WITH BACKEND**
- Uses real API endpoints
- Handles authentication with JWT tokens
- Axios interceptor adds Bearer token to requests
- Auto-refresh on 401 errors
- Unwraps backend response format: `{ success: true, data: {...} }`

---

### 2. **features/** - Feature Modules (Mock Data)
These are **UI-complete** features with mock data, ready for backend integration.

```
features/
├── finance/
│   ├── wallets/
│   │   ├── api/walletApi.ts           # 🔶 MOCK DATA
│   │   ├── hooks/useWalletList.ts     # React hooks
│   │   ├── components/                # UI components
│   │   └── types/wallet.types.ts      # Feature-specific types
│   ├── revenue-reports/               # 🔶 MOCK DATA
│   └── payout-requests/               # 🔶 MOCK DATA
├── kyc/                               # 🔶 MOCK DATA
├── compliance/                        # 🔶 MOCK DATA
└── users/                             # 🔶 MOCK DATA
```

**Status:** 🔶 **MOCK DATA - READY FOR INTEGRATION**
- Complete UI implementation
- Mock APIs simulate backend responses
- Same structure as lib/services for easy migration

---

## 🔄 Data Flow Architecture

### Current Flow (Features with Mock Data)

```
Component
    ↓
Custom Hook (e.g., useWalletList)
    ↓
Feature API (e.g., walletApi.getWalletsList)
    ↓
Mock Data (setTimeout to simulate network delay)
    ↓
Returns mock response
    ↓
Hook updates state
    ↓
Component re-renders with data
```

### Production Flow (lib/services - Already Integrated)

```
Component
    ↓
TanStack Query Hook (useQuery/useMutation)
    ↓
Service Function (e.g., walletsService.list)
    ↓
apiClient (Axios)
    ↓
Request Interceptor (adds Bearer token)
    ↓
Backend API (e.g., GET /admin/wallets)
    ↓
Response Interceptor (unwraps { success, data })
    ↓
TanStack Query caches result
    ↓
Component re-renders with real data
```

---

## 📋 What's Currently Integrated

### ✅ Fully Integrated (lib/services)

1. **Authentication** (`lib/services/auth.service.ts`)
   - `POST /auth/login`
   - `POST /auth/refresh-token`
   - Token management in AuthContext

2. **Dashboard** (`lib/services/dashboard.service.ts`)
   - `GET /admin/dashboard/stats`

3. **Users** (`lib/services/users.service.ts`)
   - `GET /admin/users`
   - `GET /admin/users/:id`

4. **Wallets** (`lib/services/wallets.service.ts`)
   - `GET /admin/wallets` (with pagination)

5. **Withdrawals** (`lib/services/withdrawals.service.ts`)
   - `GET /admin/withdrawals`

6. **Tasks** (`lib/services/tasks.service.ts`)
   - `GET /tasks/admin/all`
   - Reported issues management

7. **Runners** (`lib/services/runners.service.ts`)
   - Manual auto-deduction
   - Subscription stats

8. **System Settings** (`lib/services/system-settings.service.ts`)
   - CRUD operations for settings

9. **Feedback** (`lib/services/feedback.service.ts`)
   - List, archive, delete feedback

10. **Runner Documents** (`lib/services/runner-documents.service.ts`)
    - Document verification
    - Pending documents

### 🔶 Mock Data (features/)

All features in the `features/` folder currently use mock data:
- Finance (Wallets, Revenue Reports, Payouts, Transactions)
- KYC Verification
- Compliance Management
- User Management (Requesters, Runners)

---

## 🔌 How to Integrate Features with Backend

### Step 1: Check if Service Exists in lib/services

```typescript
// Example: lib/services/wallets.service.ts already exists
export const walletsService = {
  list(params?: { page?: number; limit?: number }): Promise<AdminWalletsResponse> {
    return apiClient.get("/admin/wallets", { params }).then((r) => r.data);
  },
};
```

### Step 2: Replace Feature API with Service Call

**Before (Mock):**
```typescript
// features/finance/wallets/api/walletApi.ts
export const walletApi = {
  getWalletsList: async (userType, filters, page) => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Mock delay
    return { data: mockData, pagination: {...} };
  },
};
```

**After (Integrated):**
```typescript
// features/finance/wallets/api/walletApi.ts
import { walletsService } from "@/lib/services";
import { apiClient } from "@/lib/api/client";

export const walletApi = {
  getWalletsList: async (userType, filters, page) => {
    // Call real backend service
    const response = await walletsService.list({
      page,
      limit: 8,
      userType,
      search: filters.search,
      // Map other filters as needed
    });
    return response;
  },
};
```

### Step 3: Update Types to Match Backend DTOs

```typescript
// Use types from lib/types/ instead of feature-specific types
import type { AdminWalletsResponse } from "@/lib/types";
```

### Step 4: Use TanStack Query (Optional but Recommended)

```typescript
// features/finance/wallets/hooks/useWalletList.ts
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { walletsService } from "@/lib/services";

export function useWalletList(userType, filters, page) {
  return useQuery({
    queryKey: queryKeys.wallets.list(userType, filters, page),
    queryFn: () => walletsService.list({ page, userType, ...filters }),
    staleTime: 30_000, // Cache for 30 seconds
  });
}
```

---

## 🎯 Best Practices

### 1. **Separation of Concerns**

```
✅ GOOD:
lib/services/        → Backend integration (production)
features/*/api/      → Feature-specific API layer (can use lib/services)
features/*/hooks/    → React hooks with business logic
features/*/components/ → UI components (no API calls)

❌ BAD:
components/          → Making direct API calls
```

### 2. **Type Safety**

```typescript
// ✅ GOOD: Use backend DTOs
import type { AdminWalletsResponse } from "@/lib/types";

// ❌ BAD: Duplicate types
interface MyWalletResponse { ... } // Don't create if backend type exists
```

### 3. **Error Handling**

```typescript
// ✅ GOOD: Let axios interceptor handle 401
try {
  const data = await walletsService.list(params);
  return data;
} catch (error) {
  // Handle specific errors
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data);
  }
  throw error;
}
```

### 4. **Caching with TanStack Query**

```typescript
// ✅ GOOD: Use query keys for cache management
const { data, isLoading } = useQuery({
  queryKey: queryKeys.wallets.list(filters),
  queryFn: () => walletsService.list(filters),
  staleTime: 30_000, // Don't refetch for 30 seconds
});

// Invalidate cache after mutation
const mutation = useMutation({
  mutationFn: walletsService.update,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.wallets.all });
  },
});
```

### 5. **Environment Configuration**

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.pikquick.com

# Development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

---

## 🔧 Why This Architecture?

### lib/ (Shared Services)
**Purpose:** Centralized backend integration
- ✅ Single source of truth for API calls
- ✅ Consistent error handling
- ✅ Auth token management
- ✅ Response unwrapping
- ✅ Easy to test and mock

### features/ (Feature Modules)
**Purpose:** Isolated, reusable feature modules
- ✅ Self-contained features
- ✅ Easy to develop with mock data
- ✅ Can be moved/reused across projects
- ✅ Clear boundaries between features

### Hooks Layer
**Purpose:** Business logic and state management
- ✅ Separates data fetching from UI
- ✅ Reusable across components
- ✅ Easy to test
- ✅ Handles loading/error states

### Components Layer
**Purpose:** Pure UI presentation
- ✅ No API calls
- ✅ Receives data via props
- ✅ Easy to test and preview
- ✅ Reusable

---

## 📊 Integration Status Summary

| Feature | Mock Data | Backend Service | Status |
|---------|-----------|----------------|--------|
| Auth | ❌ | ✅ lib/services/auth.service.ts | ✅ Integrated |
| Dashboard Stats | ❌ | ✅ lib/services/dashboard.service.ts | ✅ Integrated |
| Users List | ❌ | ✅ lib/services/users.service.ts | ✅ Integrated |
| Wallets (Basic) | ❌ | ✅ lib/services/wallets.service.ts | ✅ Integrated |
| Wallets (Feature) | ✅ | ⚠️ Partial | 🔶 Ready to integrate |
| Revenue Reports | ✅ | ❌ | 🔶 Needs backend endpoint |
| KYC Verification | ✅ | ❌ | 🔶 Needs backend endpoint |
| Compliance | ✅ | ❌ | 🔶 Needs backend endpoint |
| Payout Requests | ✅ | ❌ | 🔶 Needs backend endpoint |

---

## 🚀 Next Steps for Full Integration

1. **Create Missing Backend Endpoints**
   - Revenue reports API
   - KYC verification API
   - Compliance management API
   - Detailed wallet transactions API

2. **Add Services to lib/services/**
   ```typescript
   // lib/services/kyc.service.ts
   export const kycService = {
     list: (params) => apiClient.get("/admin/kyc", { params }),
     getById: (id) => apiClient.get(`/admin/kyc/${id}`),
     approve: (id) => apiClient.post(`/admin/kyc/${id}/approve`),
     reject: (id, reason) => apiClient.post(`/admin/kyc/${id}/reject`, { reason }),
   };
   ```

3. **Update Feature APIs to Use Services**
   ```typescript
   // features/kyc/api/kycApi.ts
   import { kycService } from "@/lib/services/kyc.service";
   
   export const kycApi = {
     getKYCList: (status, filters, page) => {
       return kycService.list({ status, ...filters, page });
     },
   };
   ```

4. **Add Query Keys**
   ```typescript
   // lib/query/keys.ts
   export const queryKeys = {
     kyc: {
       all: ["kyc"] as const,
       lists: () => [...queryKeys.kyc.all, "list"] as const,
       list: (filters: any) => [...queryKeys.kyc.lists(), filters] as const,
     },
   };
   ```

---

## 💡 Key Takeaways

1. **lib/services** = Production backend integration (already working)
2. **features/*/api** = Feature-specific API layer (currently mock, ready to integrate)
3. **Hooks** = Business logic and state management
4. **Components** = Pure UI (no API calls)
5. **TanStack Query** = Caching and server state management
6. **Axios Client** = HTTP client with auth and response unwrapping

The architecture is solid and follows React/Next.js best practices. The mock data in features/ makes development fast, and integration is straightforward when backend endpoints are ready.
