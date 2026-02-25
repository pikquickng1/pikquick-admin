# Transactions Feature

This feature handles all transaction-related functionality in the PikQuick admin dashboard.

## Structure

```
features/transactions/
├── components/
│   ├── TransactionsList.tsx          # Main list view with stats
│   ├── TransactionListTable.tsx      # Data table component
│   ├── TransactionListFilters.tsx    # Filter controls with calendar
│   └── TransactionDetailsModal.tsx   # Transaction details modal
├── hooks/
│   ├── useTransactionList.ts         # Hook for fetching transactions list
│   ├── useTransaction.ts             # Hook for fetching single transaction
│   └── useTransactionStats.ts        # Hook for fetching transaction stats
├── types/
│   └── transaction.types.ts          # TypeScript type definitions
├── api/
│   └── transactionApi.ts             # API calls (ready for real data)
└── index.ts                          # Public exports
```

## Features

### Transaction List Page
- **Stats Cards**: Total Platform Earnings, Daily Access Payments, Task Payments, Refunds
- **Export**: Export transactions as CSV or Excel
- **Filters**: Search, Type, Status, Date (with calendar picker)
- **Data Table**: Transaction ID, User, Type, Amount, Date, Status, Actions
- **Pagination**: Navigate through transaction pages
- **Details Modal**: View complete transaction details with gateway response

### Components

#### TransactionsList
Main component that orchestrates the transaction list view.

**Features:**
- Stats cards with real-time data
- Export dropdown (CSV/Excel)
- Month/period filter dropdown
- Transaction table with filters
- Pagination controls
- Transaction details modal

#### TransactionListTable
Displays transactions in a data table format.

**Columns:**
- Transaction ID
- User (name and type: Requester/Runner)
- Type (Task Payment, Daily Access, Wallet Top-up, Refund, Withdrawal)
- Amount (formatted currency)
- Date (with time)
- Status (Completed, Pending, Failed)
- Action (View Details button)

#### TransactionListFilters
Filter controls for the transaction list.

**Filters:**
- Search by name, email, or phone number
- Type dropdown (All Types, Task Payment, Daily Access, etc.)
- Status dropdown (All Status, Completed, Pending, Failed)
- Date picker with calendar (using shadcn calendar component)

#### TransactionDetailsModal
Modal displaying complete transaction information.

**Sections:**
- Transaction ID with status badge
- User Information (name, user type)
- Transaction Details (type, amount, date & time, payment gateway)
- Gateway Response (reference, gateway status, processing fee, error message)
- Actions (Cancel, Download Receipt)

## Usage

```tsx
import { TransactionsList } from "@/features/finance/transactions";

export default function TransactionsPage() {
  return <TransactionsList />;
}
```

## API Integration

The feature is ready to consume real API data. Replace the mock implementations in `api/transactionApi.ts`:

### API Methods

#### getTransactionsList
Fetch paginated list of transactions with filters.

```typescript
// Current (mock with TODO comments)
getTransactionsList: async (filters, page) => {
  // TODO: Replace with actual API call
  // const params = new URLSearchParams({...});
  // const response = await fetch(`/api/transactions?${params}`);
  // return response.json();
  
  // Mock implementation
  return mockData;
}

// Replace with:
getTransactionsList: async (filters, page) => {
  const params = new URLSearchParams({
    search: filters.search,
    type: filters.type,
    status: filters.status,
    dateFrom: filters.dateRange?.from.toISOString(),
    dateTo: filters.dateRange?.to.toISOString(),
    page: page.toString(),
  });
  const response = await fetch(`/api/transactions?${params}`);
  return response.json();
}
```

#### getTransactionById
Fetch detailed information for a single transaction.

```typescript
// Current (mock with TODO comments)
getTransactionById: async (id) => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/transactions/${id}`);
  // return response.json();
  
  // Mock implementation
  return mockDetailedData;
}

// Replace with:
getTransactionById: async (id) => {
  const response = await fetch(`/api/transactions/${id}`);
  return response.json();
}
```

#### getTransactionStats
Fetch transaction statistics for dashboard cards.

```typescript
// Current (mock with TODO comments)
getTransactionStats: async () => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/transactions/stats');
  // return response.json();
  
  // Mock implementation
  return mockStats;
}

// Replace with:
getTransactionStats: async () => {
  const response = await fetch('/api/transactions/stats');
  return response.json();
}
```

#### downloadReceipt
Download transaction receipt as PDF.

```typescript
// Current (mock with TODO comments)
downloadReceipt: async (transactionId) => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/transactions/${transactionId}/receipt`);
  // return response.blob();
  
  // Mock implementation
  return new Blob(["Mock receipt"], { type: "application/pdf" });
}

// Replace with:
downloadReceipt: async (transactionId) => {
  const response = await fetch(`/api/transactions/${transactionId}/receipt`);
  return response.blob();
}
```

#### exportTransactions
Export transactions as CSV or Excel.

```typescript
// Current (mock with TODO comments)
exportTransactions: async (filters, format) => {
  // TODO: Replace with actual API call
  // const params = new URLSearchParams({...});
  // const response = await fetch(`/api/transactions/export?${params}`);
  // return response.blob();
  
  // Mock implementation
  return new Blob(["Mock export"], { type: mimeType });
}

// Replace with:
exportTransactions: async (filters, format) => {
  const params = new URLSearchParams({
    search: filters.search,
    type: filters.type,
    status: filters.status,
    dateFrom: filters.dateRange?.from.toISOString(),
    dateTo: filters.dateRange?.to.toISOString(),
    format: format,
  });
  const response = await fetch(`/api/transactions/export?${params}`);
  return response.blob();
}
```

## Hooks

### useTransactionList
Hook for fetching paginated transaction list with filters.

```typescript
const { transactions, loading, pagination, refetch } = useTransactionList(filters, page);
```

### useTransaction
Hook for fetching single transaction details and downloading receipt.

```typescript
const { transaction, loading, error, refetch, downloadReceipt } = useTransaction(transactionId);
```

### useTransactionStats
Hook for fetching transaction statistics.

```typescript
const { stats, loading, error, refetch } = useTransactionStats();
```

## Types

### Transaction
```typescript
interface Transaction {
  id: string;
  userId: string;
  userName: string;
  userType: "Requester" | "Runner";
  type: "Task Payment" | "Daily Access" | "Wallet Top-up" | "Refund" | "Withdrawal";
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}
```

### TransactionDetails
```typescript
interface TransactionDetails extends Transaction {
  paymentGateway: string;
  gatewayResponse: {
    reference: string;
    gatewayStatus: string;
    processingFee: string;
    errorMessage?: string;
  };
}
```

### TransactionStats
```typescript
interface TransactionStats {
  totalPlatformEarnings: number;
  dailyAccessPayments: number;
  taskPayments: number;
  refunds: number;
}
```

### TransactionListFilters
```typescript
interface TransactionListFilters {
  search: string;
  type: string;
  status: string;
  dateRange?: {
    from: Date;
    to: Date;
  };
}
```

## Routes

- `/dashboard/finance/transactions` - Transaction list page

## Dependencies

- `date-fns` - Date formatting and manipulation
- `@/components/ui/calendar` - Calendar picker component
- `@/components/ui/popover` - Popover for calendar
- `@/components/ui/dialog` - Modal dialog component
- `@/components/ui/data-table` - Reusable data table
- `@/components/ui/pagination` - Pagination component
- `@/components/ui/dropdown-menu` - Dropdown menu component
- `lucide-react` - Icon library
