import { ALL_FILTER, UserStatus } from "@/lib/types/enums";

export interface RequesterListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  tasksPosted: number;
  status: UserStatus;
}

export interface RequesterListFilters {
  search: string;
  status: UserStatus | typeof ALL_FILTER;
  sortBy: string;
  limit?: number;
}

export interface RequesterListResponse {
  data: RequesterListItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
