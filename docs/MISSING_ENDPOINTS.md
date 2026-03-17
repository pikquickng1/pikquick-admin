# Backend Endpoints Required for Deployment

This document lists all API endpoints that need to be implemented on the backend to make the admin dashboard fully functional.

---

## Status Summary

| Category | Status |
|----------|--------|
| Auth | ✅ Fully Implemented |
| Dashboard | ✅ Fully Implemented |
| Users | ✅ Fully Implemented |
| Withdrawals | ✅ Fully Implemented |
| Wallets | ✅ Fully Implemented |
| Escrow | ✅ Fully Implemented |
| Tasks | ✅ Fully Implemented |
| Runners | ✅ Fully Implemented |
| Runner Profile | ✅ Fully Implemented |
| System Settings | ✅ Fully Implemented |
| Feedback | ✅ Fully Implemented |
| Runner Documents (KYC) | ✅ Fully Implemented |
| Document Types | ✅ Fully Implemented |
| Task Categories | ✅ Fully Implemented |
| Referrals | ✅ Fully Implemented |
| Analytics | ✅ Implemented (Service + API) |
| Disputes | ✅ Implemented (Service + API) |
| Compliance | ✅ Implemented (Service + API) |
| KYC Verification | ✅ Implemented (Service + API) |
| Activity Log | ✅ Implemented (Service + API) |
| Notifications | ✅ Implemented (Service + API) |

---

## Required Backend Endpoints

### 1. Analytics (`GET /admin/analytics`)

**Purpose**: Display platform analytics dashboard with charts and stats.

**Response Format**:
```typescript
{
  stats: {
    totalTasks: number;
    avgCompletionTime: number;
    retentionRate: number;
    activeUsers: number;
  };
  tasksByCategory: Array<{ name: string; value: number; color: string }>;
  completionTrend: Array<{ month: string; minutes: number }>;
  topCities: Array<{ city: string; volume: number }>;
  monthlyEarnings: Array<{ month: string; earnings: number }>;
  revenueBreakdown: Array<{ name: string; value: number; color: string }>;
  peakUsageHours: Array<{
    time: string;
    Mon: number; Tue: number; Wed: number;
    Thu: number; Fri: number; Sat: number; Sun: number;
  }>;
  userMetrics: {
    repeatUserRate: number;
    newUserRate: number;
    monthlyData: Array<{ month: string; newUsers: number; returningUsers: number }>;
  };
}
```

---

### 2. Disputes / Tickets

#### List Tickets (`POST /admin/disputes/tickets`)

**Purpose**: Get paginated list of dispute tickets with filters.

**Request Body**:
```typescript
{
  search?: string;
  priority?: "High" | "Medium" | "Low";
  category?: "Task Dispute" | "Payment Issue" | "Account Issue" | "Technical Support" | "Other";
  dateFrom?: string;
  dateTo?: string;
}
```

**Query Params**: `page`, `pageSize`

**Response Format**:
```typescript
{
  tickets: Array<{
    id: string;
    ticketId: string;
    user: { name: string; role: "Runner" | "Requester" };
    category: string;
    priority: "High" | "Medium" | "Low";
    assignedAgent: string;
    status: "Open" | "In Progress" | "Resolved";
    date: string;
  }>;
  total: number;
  page: number;
  pageSize: number;
}
```

#### Get Ticket Stats (`GET /admin/disputes/stats`)

**Response Format**:
```typescript
{
  openTickets: number;
  inProgress: number;
  resolved: number;
}
```

---

### 3. Compliance

#### List Flagged Activities (`GET /admin/compliance/flagged`)

**Query Params**: `page`, `limit`, `search`, `status`, `dateFrom`, `dateTo`

**Response Format**:
```typescript
{
  data: Array<{
    id: string;
    userId: string;
    userName: string;
    activitySummary: string;
    flaggedDate: string;
    flagStatus: "Flagged" | "Under Review" | "Resolved";
    flagReason: string;
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
```

#### Get Flagged Activity Details (`GET /admin/compliance/flagged/:id`)

**Response Format**:
```typescript
{
  id: string;
  userId: string;
  userName: string;
  activitySummary: string;
  flaggedDate: string;
  flagStatus: "Flagged" | "Under Review" | "Resolved";
  flagReason: string;
  totalAmount: number;
  transactionCount: number;
}
```

#### Get Compliance Stats (`GET /admin/compliance/stats`)

**Response Format**:
```typescript
{
  kycSummaryCount: number;
  flaggedTransactions: number;
  suspendedAccounts: number;
}
```

#### Update Flag Status (`PATCH /admin/compliance/flagged/:id/status`)

**Request Body**:
```typescript
{
  status: "Flagged" | "Under Review" | "Resolved";
}
```

---

### 4. KYC Verification

#### List KYC Applications (`GET /admin/kyc`)

**Query Params**: `page`, `limit`, `status` (pending/resubmission), `search`

**Response Format**:
```typescript
{
  data: Array<{
    id: string;
    runnerName: string;
    idType: string;
    email: string;
    phone: string;
    dateSubmitted: string;
    status: "pending" | "approved" | "rejected" | "resubmission";
    rejectionReason?: string;
  }>;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
```

#### Get KYC Details (`GET /admin/kyc/:id`)

**Response Format**:
```typescript
{
  id: string;
  runnerName: string;
  idType: string;
  email: string;
  phone: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "rejected" | "resubmission";
  documents: {
    idDocument?: string;
    proofOfAddress?: string;
    selfie?: string;
  };
  rejectionReason?: string;
}
```

#### Get KYC Stats (`GET /admin/kyc/stats`)

**Response Format**:
```typescript
{
  pendingVerifications: number;
  resubmissionRequests: number;
}
```

#### Approve KYC (`POST /admin/kyc/:id/approve`)

**Response**: `200 OK`

#### Reject KYC (`POST /admin/kyc/:id/reject`)

**Request Body**:
```typescript
{
  reason: string;
}
```

---

### 5. Activity Log

#### List Activity Logs (`GET /admin/activity-logs`)

**Query Params**: `page`, `limit`, `search`

**Response Format**:
```typescript
{
  logs: Array<{
    id: string;
    admin: string;
    adminName: string;
    action: string;
    affectedUser: string;
    timestamp: string;
  }>;
  total: number;
  page: number;
  totalPages: number;
}
```

---

### 6. Notifications (Admin/Platform)

#### Get Notifications (`GET /admin/notifications`)

**Response Format**:
```typescript
{
  notifications: Array<{
    id: string;
    title: string;
    description: string;
    timestamp: string;
    isNew: boolean;
    icon: string;
    iconColor: string;
  }>;
  unreadCount: number;
}
```

#### Mark Notification as Read (`PATCH /admin/notifications/:id/read`)

**Response**: `200 OK`

#### Mark All as Read (`POST /admin/notifications/read-all`)

**Response**: `200 OK`

---

## Integration Guide

### Step 1: Create Service Files

Create new service files in `lib/services/` following the existing pattern:

```typescript
// lib/services/analytics.service.ts
import { apiClient } from "@/lib/api/client";

export const analyticsService = {
  getAnalytics: () => apiClient.get("/admin/analytics"),
};
```

### Step 2: Update Feature API Files

Replace mock data calls in `features/*/api/*.ts` with service calls:

```typescript
// Before (mock)
await new Promise((resolve) => setTimeout(resolve, 500));
return mockData;

// After (real API)
const response = await analyticsService.getAnalytics();
return response.data;
```

### Step 3: Add Query Keys

Add query keys to `lib/query/keys.ts` for caching:

```typescript
export const queryKeys = {
  analytics: ["analytics"] as const,
  // ... existing keys
};
```

---

## Quick Reference: All Required Endpoints

| Feature | Method | Endpoint |
|---------|--------|----------|
| Analytics | GET | `/admin/analytics` |
| Disputes - List | POST | `/admin/disputes/tickets` |
| Disputes - Stats | GET | `/admin/disputes/stats` |
| Compliance - List | GET | `/admin/compliance/flagged` |
| Compliance - Detail | GET | `/admin/compliance/flagged/:id` |
| Compliance - Stats | GET | `/admin/compliance/stats` |
| Compliance - Update | PATCH | `/admin/compliance/flagged/:id/status` |
| KYC - List | GET | `/admin/kyc` |
| KYC - Detail | GET | `/admin/kyc/:id` |
| KYC - Stats | GET | `/admin/kyc/stats` |
| KYC - Approve | POST | `/admin/kyc/:id/approve` |
| KYC - Reject | POST | `/admin/kyc/:id/reject` |
| Activity Logs | GET | `/admin/activity-logs` |
| Notifications - List | GET | `/admin/notifications` |
| Notifications - Read | PATCH | `/admin/notifications/:id/read` |
| Notifications - Read All | POST | `/admin/notifications/read-all` |

---

## Notes

1. All endpoints should return the standard response format: `{ success: true, data: {...} }`
2. Authentication: Include JWT Bearer token in Authorization header
3. Pagination: Use `page` and `limit` query parameters
4. Date formats: ISO 8601 strings (e.g., `"2025-10-30T14:23:00Z"`)
