export interface ReferrerProfile {
  id: string;
  name: string;
  role: "Runner" | "Requester";
  email: string;
  phone: string;
  joinedDate: string;
  totalReferrals: number;
}

export interface ReferredUserProfile {
  id: string;
  name: string;
  role: "Runner" | "Requester";
  email: string;
  phone: string;
  joinedDate: string;
  status: "Verified" | "Pending" | "Unverified";
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
  status: "Completed" | "Pending" | "Failed";
}

export interface FraudIndicator {
  type: "device_similarity" | "ip_match" | "rapid_referral";
  label: string;
  level: "Low" | "Medium" | "High";
  value: string;
  status: "safe" | "warning" | "danger";
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
