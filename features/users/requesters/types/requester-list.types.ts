export interface RequesterListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  tasksPosted: number;
  status: "Active" | "Suspended" | "Inactive";
}

export interface RequesterListFilters {
  search: string;
  status: "All Status" | "Active" | "Suspended" | "Inactive";
  sortBy: "Most Recent" | "Most tasks";
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
