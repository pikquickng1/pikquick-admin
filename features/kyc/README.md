# KYC Verification Feature

This feature provides KYC (Know Your Customer) verification management for runners.

## Features

- View pending verifications and resubmission requests
- Tab-based filtering with count badges
- Search functionality
- View verification details
- Approve/reject verifications
- Pagination support

## Components

- `KYCVerificationList`: Main component with tabs and table

## Usage

```tsx
import { KYCVerificationList } from "@/features/kyc";

export default function KYCPage() {
  return <KYCVerificationList />;
}
```

## API Integration

The feature uses mock data. To integrate with real API:

1. Update `features/kyc/api/kycApi.ts`
2. Replace mock implementations with actual API calls
3. Update types if needed in `features/kyc/types/kyc.types.ts`
