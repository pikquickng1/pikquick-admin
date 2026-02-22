# Users Feature Module

This module contains all user-related functionality following a feature-based architecture.

## Structure

```
features/users/
├── api/                    # API layer - replace mock data with real endpoints
│   └── requesterApi.ts
├── components/             # UI components
│   ├── RequestersList.tsx           # Main list component
│   ├── RequesterListFilters.tsx     # Search and filter controls
│   ├── RequesterListTable.tsx       # Table display
│   ├── RequesterDetails.tsx         # Main details component
│   ├── RequesterPersonalInfo.tsx    # Personal info section
│   ├── RequesterAdminActions.tsx    # Admin action buttons
│   ├── RequesterWalletSummary.tsx   # Wallet summary card
│   └── RequesterTransactions.tsx    # Transaction list
├── hooks/                  # Custom React hooks
│   ├── useRequester.ts              # Fetch single requester data
│   ├── useRequesterActions.ts       # Admin actions (suspend, reset, etc.)
│   └── useRequesterList.ts          # Fetch requester list with filters
├── types/                  # TypeScript interfaces
│   ├── requester.types.ts           # Single requester types
│   └── requester-list.types.ts      # List and filter types
└── index.ts               # Clean exports
```

## Usage

### List Page
```tsx
import { RequestersList } from "@/features/users";

export default function RequestersPage() {
  return <RequestersList />;
}
```

### Details Page
```tsx
import { RequesterDetails } from "@/features/users";

export default function RequesterDetailsPage({ params }) {
  return <RequesterDetails requesterId={params.id} />;
}
```

## Making it Production-Ready

### 1. Update API Layer
Replace mock data in `api/requesterApi.ts`:

```typescript
export const requesterApi = {
  getRequestersList: async (filters, page) => {
    const params = new URLSearchParams({
      search: filters.search,
      status: filters.status,
      sortBy: filters.sortBy,
      page: page.toString(),
    });
    const response = await fetch(`/api/requesters?${params}`);
    return response.json();
  },
  
  getRequesterById: async (id) => {
    const response = await fetch(`/api/requesters/${id}`);
    return response.json();
  },
  
  // ... other methods
};
```

### 2. Add Error Handling
Components already handle loading and error states from hooks.

### 3. Add Authentication
Add auth headers in API calls:

```typescript
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
```

### 4. Optional: Add React Query
For better caching and state management:

```typescript
import { useQuery } from '@tanstack/react-query';

export function useRequester(id: string) {
  return useQuery({
    queryKey: ['requester', id],
    queryFn: () => requesterApi.getRequesterById(id),
  });
}
```

## Benefits

- **Separation of Concerns**: UI, logic, and data are separated
- **Type Safety**: Full TypeScript support
- **Reusable**: Components can be used anywhere
- **Testable**: Easy to mock API layer
- **Scalable**: Add new features following the same pattern
