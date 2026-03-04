# Profile Feature

This feature displays the admin user's profile information, security details, and recent activity logs.

## Components

- `ProfilePage`: Main component displaying the profile page
- `ProfileOverview`: Profile information section with Edit Profile and Change Password buttons
- `SecurityActivity`: Security and activity information section
- `RecentActivityLogs`: Recent activity logs section

## Features

- View profile information (name, email, phone, role)
- Edit profile functionality
- Change password functionality
- View security and activity details (last login, device, location, IP)
- View recent activity logs
- Logout from all devices

## Usage

```tsx
import { ProfilePage } from "@/features/profile";

export default function Profile() {
  return <ProfilePage />;
}
```
