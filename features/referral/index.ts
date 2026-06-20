// Referral overview
export { ReferralOverview } from "./overview/components/ReferralOverview";

// Referral records
export { ReferralRecordsList } from "./records/components/ReferralRecordsList";
export { ReferralRecordTable } from "./records/components/ReferralRecordTable";
export { ReferralDetailsPage } from "./records/components/ReferralDetailsPage";

// Referral elite-rewards
export { EliteRewardsList } from "./elite-rewards/components/EliteRewardsList";
export { EliteRewardTable } from "./elite-rewards/components/EliteRewardTable";
export { EliteRewardDetailPage } from "./elite-rewards/components/EliteRewardDetailPage";

// Referral settings
export { ReferralSettings } from "./settings/components/ReferralSettings";

// Hooks
export { useReferralData } from "./overview/hooks/useReferralData";
export { useReferralRecordList } from "./records/hooks/useReferralRecordList";
export { useReferralDetails } from "./records/hooks/useReferralDetails";
export { useEliteRewardList } from "./elite-rewards/hooks/useEliteRewardList";
export { useEliteRewardStats } from "./elite-rewards/hooks/useEliteRewardStats";
export { useEliteRewardDetail } from "./elite-rewards/hooks/useEliteRewardDetail";
export { useReferralSettings } from "./settings/hooks/useReferralSettings";

// Types
export type {
  ReferralStats,
  DailyReferral,
  RewardStatus,
  TopReferrer,
  ReferralData,
} from "./overview/types/referral.types";

export type {
  ReferralRecord,
  ReferralRecordDetails,
  ReferralRecordFilters as ReferralRecordFiltersShape,
  ReferralRecordListResponse,
} from "./records/types/referral-record.types";

export type {
  ReferrerProfile,
  ReferredUserProfile,
  TimelineEvent,
  QualificationTask,
  FraudIndicator,
  FraudOutcome,
  FraudIndicatorType,
  SystemMetadata,
  ReferralDetails,
} from "./records/types/referral-detail.types";

export type {
  EliteReward,
  EliteRewardStats,
  EliteRewardFilters as EliteRewardFiltersShape,
  EliteRewardListResponse,
} from "./elite-rewards/types/elite-reward.types";

export type {
  EliteRewardUserProfile,
  EliteRewardMetrics,
  IntegrityCheck,
  IntegrityLevel,
  ReferralBreakdown,
  RewardDetails,
  EliteRewardDetail,
} from "./elite-rewards/types/elite-reward-detail.types";

export type {
  TierThreshold,
  ActiveReferralConfig,
  RecentChange,
  ReferralSettings as ReferralSettingsShape,
} from "./settings/types/referral-settings.types";

// APIs
export { referralApi } from "./overview/api/referralApi";
export { referralRecordApi } from "./records/api/referralRecordApi";
export { referralDetailApi } from "./records/api/referralDetailApi";
export { eliteRewardApi } from "./elite-rewards/api/eliteRewardApi";
export { eliteRewardDetailApi } from "./elite-rewards/api/eliteRewardDetailApi";
export { referralSettingsApi } from "./settings/api/referralSettingsApi";
