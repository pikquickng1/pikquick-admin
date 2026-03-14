# Compliance Management Feature

This feature handles compliance monitoring and flagged activity management.

## Structure

- `api/` - API calls for compliance data
- `components/` - React components
- `hooks/` - Custom React hooks
- `types/` - TypeScript type definitions

## Components

- `ComplianceManagement` - Main compliance dashboard with stats and flagged activities
- `ComplianceListFilters` - Search and date filters

## Usage

```tsx
import { ComplianceManagement } from "@/features/compliance";

export default function CompliancePage() {
  return <ComplianceManagement />;
}
```
