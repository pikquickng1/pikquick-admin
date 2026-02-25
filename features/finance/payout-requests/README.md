# Payout Requests Feature

This feature handles all payout request-related functionality in the PikQuick admin dashboard.

## Structure

```
features/payout-requests/
├── components/
│   ├── PayoutRequestsList.tsx        # Main list view with stats
│   ├── PayoutListTable.tsx           # Data table component
│   ├── PayoutListFilters.tsx         # Filter controls with calendar
│   └── PayoutDetailsModal.tsx        # Payout details modal with approve/reject
├── hooks/
│   ├── usePayoutList.ts              # Hook for fetching payout list
│   ├── usePayout.ts                  # Hook for fetching single payout
│   ├── usePayoutStats.ts             # Hook for fetching payout stats
│   └── usePayoutActions.ts           # Hook for approve/reject actions
├── types/
│   └── payout.types.ts               # TypeScript type definitions
├── api/
│   └── payoutApi.ts                  # API calls (ready for real data)
└── index.ts                          # Public exports
```

## Features

### Payout Requests Page
- **Stats Cards**: Pending Requests, Approved This Week, Total Pending Amount
- **Export**: Export payout requests as CSV or Excel
- **Filters**: Search, Status, Date (with calendar picker)
- **Data Table**: Request ID, Runner (with rating), Amount, Bank Details, Date, Status, Actions
- **Pagination**: Navigate through payout pages
- **Details Modal**: View complete payout details with approve/reject actions

### Components

#### PayoutRequestsList
Main component that orchestrates the payout requests list view.

**Features:**
- Stats cards with real-time data
- Export dropdown (CSV/Excel)
- Month/period filter dropdown
- Payout requests table with filters
- Pagination controls
- Payout details modal with actions

#### PayoutListTable
Displays payout requests in a data table format.

**Columns:**
- Request ID
- Runner (name, rating, and task count)
- Amount (formatted currency)
- Bank Details (bank name and account number)
- Date
- Status (Pending, Completed, Rejected)
- Action (View Details button)

#### PayoutListFilters
Filter controls for the payout requests list.

**Filters:**
- Search by name, email, or phone number
- Status dropdown (All Status, Pending, Completed, Rejected)
- Date picker with calendar (using shadcn calendar component)

#### PayoutDetailsModal
Modal displaying complete payout request information with action buttons.

**Sections:**
- Request ID with status badge
- Runner Information (name, rating, tasks)
- Payout Details (amount, request date)
- Bank Details (bank name, account number, account name)
- Actions (Close, Reject with reason, Approve) - only for pending requests

**Features:**
- Approve payout request
- Reject payout request with reason input
- View complete payout details

## Usage

```tsx
import { PayoutRequestsList } from "@/features/finance/payout-requests";

export default function PayoutRequestsPage() {
  return <PayoutRequestsList />;
}
```

## API Integration

The feature is ready to consume real API data. Replace the mock implementations in `api/payoutApi.ts`:

### API Methods

#### getPayoutsList
Fetch paginated list of payout requests with filters.

```typescript
getPayoutsList: async (filters, page) => {
  const params = new URLSearchParams({
    search: filters.search,
    status: filters.status,
    dateFrom: filters.dateRange?.from.toISOString(),
    dateTo: filters.dateRange?.to.toISOString(),
    page: page.toString(),
  });
  const response = await fetch(`/api/payout-requests?${params}`);
  return response.json();
}
```

#### getPayoutById
Fetch detailed information for a single payout request.

```typescript
getPayoutById: async (id) => {
  const response = await fetch(`/api/payout-requests/${id}`);
  return response.json();
}
```

#### getPayoutStats
Fetch payout statistics for dashboard cards.

```typescript
getPayoutStats: async () => {
  const response = await fetch('/api/payout-requests/stats');
  return response.json();
}
```

#### approvePayout
Approve a payout request.

```typescript
approvePayout: async (id) => {
  await fetch(`/api/payout-requests/${id}/approve`, { method: 'POST' });
}
```

#### rejectPayout
Reject a payout request with a reason.

```typescript
rejectPayout: async (id, reason) => {
  await fetch(`/api/payout-requests/${id}/reject`, {
    method: 'POST',
    body: JSON.stringify({ reason })
  });
}
```

#### exportPayouts
Export payout requests as CSV or Excel.

```typescript
exportPayouts: async (filters, format) => {
  const params = new URLSearchParams({
    search: filters.search,
    status: filters.status,
    dateFrom: filters.dateRange?.from.toISOString(),
    dateTo: filters.dateRange?.to.toISOString(),
    format: format,
  });
  const response = await fetch(`/api/payout-requests/export?${params}`);
  return response.blob();
}
```

## Hooks

### usePayoutList
Hook for fetching paginated payout requests list with filters.

```typescript
const { payouts, loading, pagination, refetch } = usePayoutList(filters, page);
```

### usePayout
Hook for fetching single payout request details.

```typescript
const { payout, loading, error, refetch } = usePayout(payoutId);
```

### usePayoutStats
Hook for fetching payout statistics.

```typescript
const { stats, loading, error, refetch } = usePayoutStats();
```

### usePayoutActions
Hook for approve/reject actions.

```typescript
const { approvePayout, rejectPayout, loading } = usePayoutActions();
```

## Types

### PayoutRequest
```typescript
interface PayoutRequest {
  id: string;
  runnerId: string;
  runnerName: string;
  runnerRating: number;
  runnerTasks: number;
  amount: number;
  bankName: string;
  accountNumber: string;
  date: string;
  status: "Pending" | "Completed" | "Rejected";
}
```

### PayoutRequestDetails
```typescript
interface PayoutRequestDetails extends PayoutRequest {
  accountName: string;
  requestedDate: string;
  processedDate?: string;
  rejectionReason?: string;
}
```

### PayoutStats
```typescript
interface PayoutStats {
  pendingRequests: number;
  approvedThisWeek: number;
  totalPendingAmount: number;
}
```

### PayoutListFilters
```typescript
interface PayoutListFilters {
  search: string;
  status: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}
```

## Routes

- `/dashboard/finance/payout-requests` - Payout requests list page

## Dependencies

- `date-fns` - Date formatting and manipulation
- `@/components/ui/calendar` - Calendar picker component
- `@/components/ui/popover` - Popover for calendar
- `@/components/ui/dialog` - Modal dialog component
- `@/components/ui/pagination` - Pagination component
- `@/components/ui/dropdown-menu` - Dropdown menu component
- `lucide-react` - Icon library
