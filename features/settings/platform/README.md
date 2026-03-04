# Platform Settings Feature

This feature allows administrators to configure platform-wide settings including access fees, commission rates, and task categories.

## Components

- `PlatformSettings`: Main component displaying all platform settings
- `AddCategoryModal`: Modal for adding new task categories
- `EditCategoryModal`: Modal for editing existing task categories

## Features

- Configure daily runner access fee
- Set platform commission percentage
- Manage task categories (add, edit, delete)
- Real-time settings updates

## Usage

```tsx
import { PlatformSettings } from "@/features/settings/platform";

export default function PlatformSettingsPage() {
  return <PlatformSettings />;
}
```
