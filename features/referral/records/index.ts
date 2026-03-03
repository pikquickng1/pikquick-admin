// Components
export { ReferralRecordsList } from "./components/ReferralRecordsList";
export { ReferralRecordTable } from "./components/ReferralRecordTable";
export { ReferralDetailsPage } from "./components/ReferralDetailsPage";
// ReferralRecordFilters is internal to ReferralRecordTable, not exported

// Hooks
export { useReferralRecordList } from "./hooks/useReferralRecordList";
export { useReferralDetails } from "./hooks/useReferralDetails";

// Types
export type {
  ReferralRecord,
  ReferralRecordDetails,
  ReferralRecordFilters,
  ReferralRecordListResponse,
  ReferralStatus,
} from "./types/referral-record.types";

export type {
  ReferrerProfile,
  ReferredUserProfile,
  TimelineEvent,
  QualificationTask,
  FraudIndicator,
  SystemMetadata,
  ReferralDetails,
} from "./types/referral-detail.types";

// API
export { referralRecordApi } from "./api/referralRecordApi";
export { referralDetailApi } from "./api/referralDetailApi";
