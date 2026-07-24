import { UserType, VerificationStatus } from "@/lib/types/enums";
import { referralService } from "@/lib/services";
import { formatDate } from "@/lib/utils/date";
import type { ReferralRecordDetail } from "@/lib/types";
import type {
  ReferralDetails,
  TimelineEvent,
} from "../types/referral-detail.types";

const PLACEHOLDER = "—";

function buildTimeline(r: ReferralRecordDetail): TimelineEvent[] {
  const events: TimelineEvent[] = [
    {
      id: "signup",
      event: "Signup via referral link",
      timestamp: formatDate(r.created_at),
      completed: true,
    },
  ];
  events.push({
    id: "first-task",
    event: "First task completed",
    timestamp: r.qualified_at ? formatDate(r.qualified_at) : PLACEHOLDER,
    completed: Boolean(r.qualified_at),
  });
  return events;
}

function mapDetails(r: ReferralRecordDetail): ReferralDetails {
  return {
    referrer: {
      id: r.referrer_id,
      name: r.referrer_name ?? r.referrer_id,
      role: (r.referrer_role as UserType) ?? UserType.CLIENT,
      email: r.referrer_email ?? PLACEHOLDER,
      phone: r.referrer_phone ?? PLACEHOLDER,
      joinedDate: r.referrer_joined_at ? formatDate(r.referrer_joined_at) : PLACEHOLDER,
      // Referrer's lifetime referral count is not returned by this endpoint.
      totalReferrals: 0,
    },
    referredUser: {
      id: r.referred_user_id,
      name: r.referred_name ?? r.referred_user_id,
      role: (r.referred_role as UserType) ?? UserType.CLIENT,
      email: r.referred_email ?? PLACEHOLDER,
      phone: r.referred_phone ?? PLACEHOLDER,
      joinedDate: r.referred_joined_at ? formatDate(r.referred_joined_at) : PLACEHOLDER,
      status: VerificationStatus.PENDING,
    },
    timeline: buildTimeline(r),
    qualificationTask: r.first_task_id
      ? {
          taskId: r.first_task_id,
          serviceType: PLACEHOLDER,
          totalPaid: 0,
          completionDate: r.qualified_at ? formatDate(r.qualified_at) : PLACEHOLDER,
          status: r.qualified_at ? "completed" : "pending",
        }
      : null,
    // Fraud scoring is not implemented on the backend.
    fraudIndicators: [],
    systemMetadata: {
      referralId: r.id,
      trackingCode: r.id,
      utmSource: r.utm_source ?? PLACEHOLDER,
      referrerIp: r.referrer_ip ?? PLACEHOLDER,
    },
    internalNotes:
      ((r.metadata as { admin_notes?: string } | null)?.admin_notes) ?? "",
  };
}

export const referralDetailApi = {
  async getReferralDetails(id: string): Promise<ReferralDetails> {
    const res = await referralService.getRecordById(id);
    return mapDetails(res.referral);
  },

  async updateInternalNotes(id: string, notes: string): Promise<void> {
    await referralService.updateRecordNotes(id, notes);
  },

  async approveReferral(id: string): Promise<void> {
    await referralService.approveRecord(id);
  },

  async disqualifyReferral(id: string): Promise<void> {
    await referralService.disqualifyRecord(id);
  },
};
