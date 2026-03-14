# Referral Records Feature

This feature provides detailed audit trail and management of individual referral records.

## Features

- Complete referral audit details table
- Search by referrer or referred user
- Filter by date range and status
- Track first task completion
- Status management (Active, Pending, Disqualified)
- Export functionality
- Pagination support

## Components

- `ReferralRecordsList`: Main component with table and pagination
- `ReferralRecordTable`: Data table with all referral records
- `ReferralRecordFilters`: Search and filter controls

## Usage

```tsx
import { ReferralRecordsList } from "@/features/referral/records";

export default function ReferralRecordsPage() {
  return <ReferralRecordsList />;
}
```

## Status Types

- Active: Referral is active and first task completed
- Pending: Referral signed up but first task not completed
- Disqualified: Referral did not meet requirements

## API Integration

The feature uses mock data. To integrate with real API:

1. Update `features/referral/records/api/referralRecordApi.ts`
2. Replace mock implementations with actual API calls
3. Update types if needed in `features/referral/records/types/referral-record.types.ts`
