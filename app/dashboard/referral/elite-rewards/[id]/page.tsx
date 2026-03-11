import { EliteRewardDetailPage } from "@/features/referral/elite-rewards/components/EliteRewardDetailPage";
import { use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EliteRewardDetailPageRoute({ params }: PageProps) {
  const { id } = use(params);
  return <EliteRewardDetailPage rewardId={id} />;
}
