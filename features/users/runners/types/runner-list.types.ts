export interface RunnerListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  verification: "Verified" | "Pending" | "Failed";
  balance: number;
  dailyFee: number;
  rating: number;
  totalReviews: number;
  status: "Available" | "Unavailable" | "Suspended";
}

export interface RunnerListFilters {
  search: string;
  status: string;
  sortBy: string;
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
