# Referral Settings

This module provides the configuration interface for managing the referral program settings.

## Features

- **Program Configuration**: Toggle to enable/disable the entire referral program
- **Tier Management**: Configure thresholds and reward amounts for Starter, Pro, and Elite tiers
- **Active Referral Definition**: Define what qualifies as an "active referral" (signup, first task, or verified account)
- **Anti-Fraud Verification**: Toggle manual review requirement for Elite rewards
- **System Controls**: Save configuration and reset to defaults
- **Recent Changes Log**: Track configuration changes with user and timestamp
- **Rewards Budget**: Monitor available budget for referral payouts with progress indicator

## Components

### ReferralSettings
Main component that displays the settings interface with:
- Program status toggle
- Tier configuration cards (Starter/Pro/Elite)
- Active referral definition radio buttons
- Anti-fraud verification toggle
- System control buttons (Save/Reset)
- Recent changes log
- Rewards budget card with progress bar

## API

### referralSettingsApi
- `getSettings()`: Fetch current referral program settings
- `saveConfiguration()`: Save configuration changes
- `resetToDefaults()`: Reset all settings to default values

## Hooks

### useReferralSettings
Custom hook that:
- Fetches settings data on mount
- Provides loading state
- Returns settings object

## Types

### ReferralSettings
```typescript
interface ReferralSettings {
  programActive: boolean;
  tiers: TierThreshold[];
  activeReferralDefinitions: ActiveReferralDefinition[];
  antiFraudVerification: boolean;
  rewardsBudget: {
    total: number;
    available: number;
    percentage: number;
  };
  recentChanges: RecentChange[];
}
```

## Usage

```tsx
import { ReferralSettings } from '@/features/referral';

export default function SettingsPage() {
  return <ReferralSettings />;
}
```

## Routes

- `/dashboard/referral/settings` - Main settings page
