# Activity Log Feature

This feature displays a log of all admin activities on the platform, including actions taken, affected users, and timestamps.

## Components

- `ActivityLogList`: Main component displaying the activity log with search and pagination
- `ActivityLogTable`: Data table component for displaying activity logs

## Features

- View all admin activities
- Search functionality
- Pagination support
- Displays admin role, name, action, affected user, and timestamp

## Usage

```tsx
import { ActivityLogList } from "@/features/activity-log";

export default function ActivityLogPage() {
  return <ActivityLogList />;
}
```
