# Wallets Overview Feature

This feature provides a comprehensive view of user wallets in the system, including both requester and runner wallets.

## Features

- View wallet statistics (Total Requester Balance, Total Runner Balance, Total Wallets)
- Switch between Requester and Runner wallet views
- Search wallets by name or ID
- Filter wallets by date
- View wallet transaction history
- Pagination support

## Components

- `WalletsOverview`: Main component with stats cards and tabs
- `WalletListTable`: Table displaying wallet information
- `WalletListFilters`: Search and date filter components

## Usage

```tsx
import { WalletsOverview } from "@/features/finance/wallets";

export default function WalletsPage() {
  return <WalletsOverview />;
}
```

## API Integration

The feature uses mock data. To integrate with real API:

1. Update `features/finance/wallets/api/walletApi.ts`
2. Replace mock implementations with actual API calls
3. Update types if needed in `features/finance/wallets/types/wallet.types.ts`
