export type ReferralStatus = "Active" | "Pending" | "Disqualified";

export interface ReferralRecord {
  id: string;
  referrer: string;
  referrerRole: "Runner" | "Requester";
  referredUser: string;
  signupDate: string;
  firstTask: {
    completed: boolean;
    taskId?: string;
  };
  status: ReferralStatus;
  month: string;
}

export interface ReferralRecordDetails extends ReferralRecord {
  referrerEmail: string;
  referredUserEmail: string;
  totalReferrals: number;
  rewardsEarned: number;
}

export interface ReferralRecordFilters {
  search: string;
  dateFrom?: string;
  dateTo?: string;
  status?: ReferralStatus;
}

export interface ReferralRecordListResponse {
  data: ReferralRecord[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}
