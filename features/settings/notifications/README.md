# Notifications & Alerts Feature

This feature allows administrators to view notification logs and create new notifications for platform users.

## Components

- `NotificationsAlerts`: Main component displaying notifications log table with pagination
- `CreateNotificationModal`: Modal for creating and sending new notifications

## Features

- View all notifications log with pagination
- Filter by audience (All, Runners, Requesters)
- Filter by type (System, Custom)
- Create and send new notifications
- Track who sent each notification

## Usage

```tsx
import { NotificationsAlerts } from "@/features/settings/notifications";

export default function NotificationsPage() {
  return <NotificationsAlerts />;
}
```
