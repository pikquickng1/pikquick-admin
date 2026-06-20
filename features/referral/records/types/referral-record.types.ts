import { ALL_FILTER, ReferralStatus, UserType } from "@/lib/types/enums";

export interface ReferralRecord {
  id: string;
  referrer: string;
  referrerRole: UserType;
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
  status?: ReferralStatus | typeof ALL_FILTER;
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
