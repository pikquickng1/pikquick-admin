import { ReferralStatus, UserType, VerificationStatus } from "@/lib/types/enums";

export interface ReferrerProfile {
  id: string;
  name: string;
  role: UserType;
  email: string;
  phone: string;
  joinedDate: string;
  totalReferrals: number;
}

export interface ReferredUserProfile {
  id: string;
  name: string;
  role: UserType;
  email: string;
  phone: string;
  joinedDate: string;
  status: VerificationStatus;
}

export interface TimelineEvent {
  id: string;
  event: string;
  timestamp: string;
  completed: boolean;
}

export interface QualificationTask {
  taskId: string;
  serviceType: string;
  totalPaid: number;
  completionDate: string;
  status: "completed" | "pending" | "failed";
}

export type FraudIndicatorType = "device_similarity" | "ip_match" | "rapid_referral";
export type FraudOutcome = "safe" | "warning" | "danger";

export interface FraudIndicator {
  type: FraudIndicatorType;
  label: string;
  level: "Low" | "Medium" | "High";
  value: string;
  status: FraudOutcome;
}

export interface SystemMetadata {
  referralId: string;
  trackingCode: string;
  utmSource: string;
  referrerIp: string;
}

export interface ReferralDetails {
  referrer: ReferrerProfile;
  referredUser: ReferredUserProfile;
  timeline: TimelineEvent[];
  qualificationTask: QualificationTask | null;
  fraudIndicators: FraudIndicator[];
  systemMetadata: SystemMetadata;
  internalNotes: string;
}
