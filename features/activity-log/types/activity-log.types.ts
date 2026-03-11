export interface ActivityLog {
  id: string;
  admin: string;
  adminName: string;
  action: string;
  affectedUser: string;
  timestamp: string;
}

export interface ActivityLogFilters {
  page: number;
  limit: number;
  search?: string;
}

export interface ActivityLogListResponse {
  logs: ActivityLog[];
  total: number;
  page: number;
  totalPages: number;
}
