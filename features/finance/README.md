# Finance Feature

This module contains all finance-related features for the PikQuick admin dashboard.

## Structure

```
features/finance/
├── transactions/              # Transaction management
│   ├── api/                  # Transaction API calls
│   ├── components/           # Transaction components
│   ├── hooks/                # Transaction hooks
│   ├── types/                # Transaction types
│   ├── index.ts             # Public exports
│   └── README.md            # Transaction documentation
├── payout-requests/          # Payout request management
│   ├── api/                  # Payout API calls
│   ├── components/           # Payout components
│   ├── hooks/                # Payout hooks
│   ├── types/                # Payout types
│   ├── index.ts             # Public exports
│   └── README.md            # Payout documentation
├── index.ts                  # Finance module exports
└── README.md                 # This file
```

## Features

### Transactions
Manage all platform transactions including task payments, daily access fees, wallet top-ups, refunds, and withdrawals.

**Key Features:**
- Transaction list with filters and search
- Transaction statistics dashboard
- Transaction details with gateway response
- Export transactions (CSV/Excel)
- Receipt download

**Route:** `/dashboard/finance/transactions`

[View Transactions Documentation](./transactions/README.md)

### Payout Requests
Manage runner payout requests with approval/rejection workflow.

**Key Features:**
- Payout request list with filters
- Payout statistics dashboard
- Approve/reject payout requests
- Export payout requests (CSV/Excel)
- Bank details verification

**Route:** `/dashboard/finance/payout-requests`

[View Payout Requests Documentation](./payout-requests/README.md)

## Usage

### Import Transactions
```tsx
import { TransactionsList } from "@/features/finance";
// or
import { TransactionsList } from "@/features/finance/transactions";

export default function TransactionsPage() {
  return <TransactionsList />;
}
```

### Import Payout Requests
```tsx
import { PayoutRequestsList } from "@/features/finance";
// or
import { PayoutRequestsList } from "@/features/finance/payout-requests";

export default function PayoutRequestsPage() {
  return <PayoutRequestsList />;
}
```

## API Integration

Both features are ready for real API integration. All API calls are in the respective `api/` folders with TODO comments indicating where to replace mock data with actual API endpoints.

### Transactions API
- `getTransactionsList` - Fetch paginated transactions
- `getTransactionById` - Fetch single transaction details
- `getTransactionStats` - Fetch transaction statistics
- `downloadReceipt` - Download transaction receipt
- `exportTransactions` - Export transactions data

### Payout Requests API
- `getPayoutsList` - Fetch paginated payout requests
- `getPayoutById` - Fetch single payout details
- `getPayoutStats` - Fetch payout statistics
- `approvePayout` - Approve a payout request
- `rejectPayout` - Reject a payout request with reason
- `exportPayouts` - Export payout requests data

## Common Patterns

Both features follow the same architectural patterns:

1. **API Layer**: Centralized API calls with mock data
2. **Hooks**: Custom hooks for data fetching and actions
3. **Components**: Reusable UI components
4. **Types**: TypeScript type definitions
5. **Filters**: Search, status, and date range filtering
6. **Export**: CSV and Excel export functionality
7. **Pagination**: Consistent pagination across lists

## Dependencies

- `date-fns` - Date formatting and manipulation
- `@/components/ui/*` - Shared UI components (shadcn/ui)
- `lucide-react` - Icon library
- `@radix-ui/*` - Headless UI primitives

## Routes

- `/dashboard/finance/transactions` - Transactions page
- `/dashboard/finance/payout-requests` - Payout requests page
