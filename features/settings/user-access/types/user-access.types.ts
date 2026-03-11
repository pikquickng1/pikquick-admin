export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Finance Admin" | "Support Admin" | "Operations Admin";
  status: "Active" | "Inactive";
  lastLogin: string;
  avatar?: string;
}

export interface UserAccessFilters {
  search: string;
  role: string;
  status: string;
}
