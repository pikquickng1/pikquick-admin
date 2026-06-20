import {
  ALL_FILTER,
  UserStatus,
  VerificationStatus,
} from "@/lib/types/enums";

export interface RunnerListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  verification: VerificationStatus;
  balance: number;
  rating: number;
  totalReviews: number;
  status: UserStatus;
}

export interface RunnerListFilters {
  search: string;
  status: UserStatus | typeof ALL_FILTER;
  sortBy: string;
  limit?: number;
  verification?: VerificationStatus | typeof ALL_FILTER;
}

export interface RunnerListResponse {
  data: RunnerListItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
