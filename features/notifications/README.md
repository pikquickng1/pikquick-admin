# Notifications Feature

This feature displays real-time notifications for admin users with unread counts and search functionality.

## Components

- `NotificationsPanel`: Slide-over panel displaying notifications list

## Features

- View all notifications
- Search notifications
- Unread count badge
- Mark individual notifications as read
- Mark all as read
- Different notification types with icons (KYC, Users, Disputes, Payouts)

## Usage

```tsx
import { NotificationsPanel } from "@/features/notifications";

<NotificationsPanel isOpen={isOpen} onClose={onClose} />
```
