# Elite Rewards Review Feature

This feature manages the review and approval process for elite referral rewards.

## Features

- Elite reward statistics (Awaiting Review, Approved MTD, Total Elite Payouts)
- Complete elite rewards table with user details
- Search and filter capabilities
- Status management (Pending, Approved, Rejected)
- Export functionality
- Pagination support

## Components

- `EliteRewardsList`: Main component with stats and table
- `EliteRewardTable`: Data table with all elite rewards
- `EliteRewardFilters`: Search and filter controls

## Usage

```tsx
import { EliteRewardsList } from "@/features/referral/elite-rewards";

export default function EliteRewardsPage() {
  return <EliteRewardsList />;
}
```

## Status Types

- Pending: Awaiting admin review
- Approved: Reward has been approved and paid
- Rejected: Reward was rejected

## API Integration

The feature uses mock data. To integrate with real API:

1. Update `features/referral/elite-rewards/api/eliteRewardApi.ts`
2. Replace mock implementations with actual API calls
3. Update types if needed in `features/referral/elite-rewards/types/elite-reward.types.ts`
