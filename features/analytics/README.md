# Analytics & Insights

This module provides comprehensive analytics and insights dashboard for the PikQuick admin platform.

## Features

- **Stats Cards**: Display key metrics (Total Tasks, Avg Completion Time, Retention Rate, Active Users)
- **Tasks by Category**: Pie chart showing task distribution across categories
- **Task Completion Time Trend**: Line chart showing completion time trends over months
- **Top 5 Cities by Task Volume**: Horizontal bar chart showing cities with highest task volumes

## Components

### AnalyticsDashboard
Main dashboard component that displays:
- 4 stat cards with icons and metrics
- Pie chart for task categories
- Line chart for completion time trends
- Horizontal bar chart for top cities

## API

### analyticsApi
- `getAnalyticsData()`: Fetch all analytics data including stats, charts data

## Hooks

### useAnalyticsData
Custom hook that:
- Fetches analytics data on mount
- Provides loading state
- Returns analytics data object

## Types

### AnalyticsData
```typescript
interface AnalyticsData {
  stats: AnalyticsStats;
  tasksByCategory: TaskCategory[];
  completionTrend: CompletionTrendData[];
  topCities: CityTaskVolume[];
}
```

## Charts Used

- **Recharts PieChart**: For tasks by category
- **Recharts LineChart**: For completion time trend
- **Recharts BarChart**: For top cities (horizontal layout)

## Usage

```tsx
import { AnalyticsDashboard } from '@/features/analytics';

export default function AnalyticsPage() {
  return <AnalyticsDashboard />;
}
```

## Routes

- `/dashboard/analytics` - Main analytics dashboard page
