# Referral Management Feature

This feature provides comprehensive referral program management including analytics, audit trails, and detailed tracking.

## Structure

The referral feature is organized into submodules:

- `overview/` - Referral analytics dashboard with stats and charts
- `records/` - Detailed referral audit trail and management

## Submodules

### Overview
Provides high-level referral program analytics:
- Total referrals, active referrals, rewards unlocked
- Daily referral performance charts
- Rewards status breakdown
- Top referrers leaderboard

### Records
Detailed audit trail of all referrals:
- Complete referral records table
- Search and filter capabilities
- First task completion tracking
- Status management (Active, Pending, Disqualified)

## Usage

```tsx
// Referral Overview
import { ReferralOverview } from "@/features/referral/overview";

// Referral Records
import { ReferralRecordsList } from "@/features/referral/records";
```

## Routes

- `/dashboard/referral` - Referral Overview
- `/dashboard/referral/records` - Referral Records

## API Integration

Each submodule uses mock data. To integrate with real API:

1. Update the respective `api/` files in each submodule
2. Replace mock implementations with actual API calls
3. Update types if needed in the respective `types/` files
