# Disputes & Support

This module provides the ticket management system for handling user disputes and support requests.

## Features

- **Status Tabs**: Open Tickets, In Progress, and Resolved with badge counts (inside table)
- **Filters**: Search, Priority dropdown, Category dropdown, Date picker (at the top)
- **Ticket Table**: Comprehensive table with selectable rows
- **Pagination**: Navigate through large ticket lists
- **Actions**: View ticket details

## Components

### DisputesList
Main component that displays the ticket management interface with:
- Filters at the top (search, priority, category, date)
- Status tabs inside table wrapper (Open, In Progress, Resolved) with badge counts
- DataTable component with ticket data
- Pagination controls

### DisputeListFilters
Filter component with:
- Search input (by ticket ID or user)
- Priority dropdown (All Priority, High, Medium, Low)
- Category dropdown (All Categories, Task Dispute, Payment Issue, Account Issue, Technical Support, Other)
- Date picker with calendar popover

## API

### disputeApi
- `getTickets(filters, page, pageSize)`: Fetch paginated ticket list with filters
- `getTicketStats()`: Fetch ticket counts by status

## Hooks

### useTicketList
Custom hook that:
- Fetches tickets based on filters and pagination
- Provides loading state
- Returns tickets array and total count

### useTicketStats
Custom hook that:
- Fetches ticket statistics
- Provides loading state
- Returns stats object with counts

## Types

### Ticket
```typescript
interface Ticket {
  id: string;
  ticketId: string;
  user: {
    name: string;
    role: "Runner" | "Requester";
  };
  category: TicketCategory;
  priority: TicketPriority;
  assignedAgent: string;
  status: TicketStatus;
  date: string;
}
```

### TicketListFilters
```typescript
interface TicketListFilters {
  search: string;
  priority: string;
  category: string;
  dateFrom?: string;
  dateTo?: string;
}
```

## Usage

```tsx
import { DisputesList } from '@/features/disputes';

export default function DisputesPage() {
  return <DisputesList />;
}
```

## Layout Pattern

This feature follows the exact pattern from your design:
1. **Page Title** - "Disputes & Support"
2. **Table Wrapper** (white background with border):
   - **Filters Section** (inside table, at top) - Search, Priority, Category, Date
   - **Tabs Section** (inside table, below filters) - 3 tabs with only active tab showing white background
   - **Data Table** - Ticket list with columns
3. **Pagination** - Below the table

### Tab Behavior:
- Background: Light gray (neutral-50)
- Active tab: White background with shadow
- Inactive tabs: Transparent background
- Only ONE tab shows white at a time

## Routes

- `/dashboard/disputes` - Main disputes list page
- `/dashboard/disputes/[id]` - Ticket detail page (to be implemented)
