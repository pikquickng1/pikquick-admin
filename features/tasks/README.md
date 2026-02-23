# Tasks Feature

This module handles all task-related functionality in the admin dashboard.

## Structure

```
tasks/
├── components/     # Task UI components
├── hooks/         # Task-related React hooks
├── types/         # TypeScript type definitions
├── api/           # API calls for task operations
└── index.ts       # Public exports
```

## Features

- Task list with filters and pagination
- Task details view
- Task status management
- Search by name, email, or phone
- Filter by status (All Status, In Progress, Completed, Pending, Cancelled)
- Sort by rating or date
- Stats cards showing active tasks, approved refunds, and active runners

## Usage

```tsx
import { TasksList, useTaskList } from '@/features/tasks';
```

## Components

- `TasksList` - Main task list page with stats and table
- `TaskListTable` - Reusable table component with DataTable
- `TaskListFilters` - Search and filter controls

## Hooks

- `useTaskList` - Fetch and manage task list data

## API

All API functions are in `api/taskApi.ts` and currently use mock data. Replace with actual API calls when backend is ready.
