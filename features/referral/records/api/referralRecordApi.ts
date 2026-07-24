import { ReferralStatus, UserType, ALL_FILTER } from "@/lib/types/enums";
import { referralService } from "@/lib/services";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { formatDate } from "@/lib/utils/date";
import type { ReferralRecord as ApiReferralRecord } from "@/lib/types";
import type {
  ReferralRecord,
  ReferralRecordFilters,
  ReferralRecordListResponse,
} from "../types/referral-record.types";

const ITEMS_PER_PAGE = DEFAULT_PAGE_SIZE;

function mapRecord(r: ApiReferralRecord): ReferralRecord {
  return {
    id: r.id,
    referrer: r.referrer_name ?? r.referrer_id,
    referrerRole: (r.referrer_role as UserType) ?? UserType.CLIENT,
    referredUser: r.referred_name ?? r.referred_user_id,
    signupDate: formatDate(r.created_at),
    firstTask: {
      completed: Boolean(r.qualified_at || r.first_task_id),
      taskId: r.first_task_id ?? undefined,
    },
    status: (r.status as ReferralStatus) ?? ReferralStatus.PENDING,
    month: r.month,
  };
}

export const referralRecordApi = {
  async getReferralRecords(
    filters: ReferralRecordFilters,
    page: number = 1,
  ): Promise<ReferralRecordListResponse> {
    const status =
      filters.status && filters.status !== ALL_FILTER
        ? filters.status
        : undefined;

    const res = await referralService.getRecords({
      page,
      limit: ITEMS_PER_PAGE,
      status,
    });

    const total = res.meta?.total ?? 0;
    return {
      data: (res.data ?? []).map(mapRecord),
      pagination: {
        currentPage: res.meta?.page ?? page,
        totalPages: Math.max(1, Math.ceil(total / ITEMS_PER_PAGE)),
        totalItems: total,
        itemsPerPage: res.meta?.limit ?? ITEMS_PER_PAGE,
      },
    };
  },
};
