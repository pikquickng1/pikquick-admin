# Referral Overview Feature

This feature provides comprehensive referral program analytics and management for the platform.

## Features

- Referral statistics (Total Referrals, Active Referrals, Rewards Unlocked, Elite Candidates, Total Payouts)
- Daily referral performance chart (Bar chart)
- Rewards status breakdown (Pie chart with Paid vs. Pending)
- Top referrers leaderboard with status badges
- Real-time referral tracking

## Components

- `ReferralOverview`: Main component with all charts, statistics, and top referrers table

## Usage

```tsx
import { ReferralOverview } from "@/features/referral/overview";

export default function ReferralOverviewPage() {
  return <ReferralOverview />;
}
```

## Charts

The feature uses Recharts library for data visualization:
- Bar Chart for daily referral performance
- Donut Chart for rewards status distribution

## API Integration

The feature uses mock data. To integrate with real API:

1. Update `features/referral/overview/api/referralApi.ts`
2. Replace mock implementations with actual API calls
3. Update types if needed in `features/referral/overview/types/referral.types.ts`

## Status Badges

- Elite: Purple badge for top-tier referrers
- Pro: Blue badge for professional referrers
- Starter: Green badge for new referrers
