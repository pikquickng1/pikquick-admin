import { ReferralRewardStatus, UserType } from "@/lib/types/enums";
import { referralService } from "@/lib/services";
import { DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import type { EliteReward as ApiEliteReward } from "@/lib/types";
import type {
  EliteReward,
  EliteRewardFilters,
  EliteRewardListResponse,
  EliteRewardStats,
} from "../types/elite-reward.types";

const ITEMS_PER_PAGE = DEFAULT_PAGE_SIZE;

/** Formats a backend YYYY-MM month into e.g. "February 2024". */
function formatMonthAchieved(month: string): string {
  const [year, m] = (month ?? "").split("-");
  const idx = Number(m) - 1;
  const names = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return names[idx] ? `${names[idx]} ${year}` : month;
}

function mapReward(r: ApiEliteReward): EliteReward {
  return {
    id: r.id,
    user: r.referrer_name ?? r.referrer_id,
    role: (r.referrer_role as UserType) ?? UserType.RUNNER,
    // The reward row does not carry the referrer's referral count.
    referralsCount: 0,
    monthAchieved: formatMonthAchieved(r.month),
    rewardAmount: r.amount_ngn,
    status:
      (r.status as ReferralRewardStatus) ?? ReferralRewardStatus.UNDER_REVIEW,
  };
}

export const eliteRewardApi = {
  async getEliteRewards(
    _filters: EliteRewardFilters,
    page: number = 1,
  ): Promise<EliteRewardListResponse> {
    const res = await referralService.getEliteReview({
      page,
      limit: ITEMS_PER_PAGE,
    });
    const total = res.meta?.total ?? 0;
    return {
      data: (res.data ?? []).map(mapReward),
      pagination: {
        currentPage: res.meta?.page ?? page,
        totalPages: Math.max(1, Math.ceil(total / ITEMS_PER_PAGE)),
        totalItems: total,
        itemsPerPage: res.meta?.limit ?? ITEMS_PER_PAGE,
      },
    };
  },

  async getEliteRewardStats(): Promise<EliteRewardStats> {
    // Awaiting-review count = size of the elite review queue. Approved-MTD and
    // total elite payouts are not exposed by a dedicated endpoint yet.
    const res = await referralService.getEliteReview({ page: 1, limit: 1 });
    return {
      awaitingReview: res.meta?.total ?? 0,
      approvedMTD: 0,
      totalElitePayouts: 0,
    };
  },
};
