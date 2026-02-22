"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { RunnerDetails } from "@/features/users/runners";

export default function RunnerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const handleBack = () => {
    router.push("/dashboard/users/runners");
  };

  return <RunnerDetails runnerId={id} onBack={handleBack} />;
}
