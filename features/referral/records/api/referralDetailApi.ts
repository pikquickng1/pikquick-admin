import { UserType, VerificationStatus } from "@/lib/types/enums";
import { USE_MOCKS } from "@/lib/config/feature-flags";
import type { ReferralDetails } from "../types/referral-detail.types";

const MOCK_DELAY_MS = 300;
const MOCK_ACTION_DELAY_MS = 500;

const MOCK_DETAILS: ReferralDetails = {
  referrer: {
    id: "RUN-2045",
    name: "Adebayo Samuel",
    role: UserType.RUNNER,
    email: "a.samuel@example.com",
    phone: "+234 812 345 6789",
    joinedDate: "2023-08-15",
    totalReferrals: 42,
  },
  referredUser: {
    id: "REQ-1522",
    name: "John Doe",
    role: UserType.CLIENT,
    email: "j.doe@example.com",
    phone: "+234 803 111 2233",
    joinedDate: "2024-03-12",
    status: VerificationStatus.VERIFIED,
  },
  timeline: [
    { id: "1", event: "Invite sent", timestamp: "2024-03-10 14:30", completed: true },
    { id: "2", event: "Signup via referral link", timestamp: "2024-03-12 09:15", completed: true },
    { id: "3", event: "First task requested", timestamp: "2024-03-12 11:45", completed: true },
    { id: "4", event: "First task completed", timestamp: "2024-03-14 16:20", completed: true },
  ],
  qualificationTask: {
    taskId: "TASK-4521",
    serviceType: "Grocery Shopping",
    totalPaid: 12500,
    completionDate: "March 14, 2024",
    status: "completed",
  },
  fraudIndicators: [
    { type: "device_similarity", label: "Device Similarity", level: "Low", value: "Low (0%)", status: "safe" },
    { type: "ip_match", label: "IP Match Warning", level: "Medium", value: "Medium (15%)", status: "warning" },
    { type: "rapid_referral", label: "Rapid Referral Flag", level: "Low", value: "Safe", status: "safe" },
  ],
  systemMetadata: {
    referralId: "REF-883921",
    trackingCode: "PIK-AD72",
    utmSource: "mobile_app",
    referrerIp: "192.168.1.45",
  },
  internalNotes: "",
};

export const referralDetailApi = {
  async getReferralDetails(_id: string): Promise<ReferralDetails> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));
      return MOCK_DETAILS;
    }
    throw new Error("Live referral-detail endpoint not yet wired in the admin UI");
  },

  async updateInternalNotes(_id: string, _notes: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live referral-notes endpoint not yet wired in the admin UI");
  },

  async approveReferral(_id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live approve-referral endpoint not yet wired in the admin UI");
  },

  async disqualifyReferral(_id: string): Promise<void> {
    if (USE_MOCKS) {
      await new Promise((r) => setTimeout(r, MOCK_ACTION_DELAY_MS));
      return;
    }
    throw new Error("Live disqualify-referral endpoint not yet wired in the admin UI");
  },
};
