# Revenue Reports Feature

This feature provides comprehensive revenue analytics and reporting for the platform.

## Features

- Revenue statistics (Total Inflow, Total Outflow, Net Profit)
- Daily earnings trend chart (Line chart)
- Revenue by category breakdown (Pie chart)
- Detailed category breakdown list
- Key metrics (Average Transaction, Transaction Volume, Active Users, Platform Fee)
- Period and location filters

## Components

- `RevenueReports`: Main component with all charts and statistics

## Usage

```tsx
import { RevenueReports } from "@/features/finance/revenue-reports";

export default function RevenueReportsPage() {
  return <RevenueReports />;
}
```

## Charts

The feature uses Recharts library for data visualization:
- Line Chart for daily earnings trend
- Pie Chart for revenue category distribution

## API Integration

The feature uses mock data. To integrate with real API:

1. Update `features/finance/revenue-reports/api/revenueApi.ts`
2. Replace mock implementations with actual API calls
3. Update types if needed in `features/finance/revenue-reports/types/revenue.types.ts`
