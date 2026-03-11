import { use } from "react";
import { ReferralDetailsPage } from "@/features/referral/records/components/ReferralDetailsPage";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ReferralDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return <ReferralDetailsPage referralId={id} />;
}
