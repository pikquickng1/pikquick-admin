"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { TaskDetails } from "@/features/tasks";

export default function TaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const handleBack = () => {
    router.push("/dashboard/tasks");
  };

  return <TaskDetails taskId={id} onBack={handleBack} />;
}
