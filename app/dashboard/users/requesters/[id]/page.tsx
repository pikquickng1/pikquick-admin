"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { RequesterDetails } from "@/features/users";

export default function RequesterDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <RequesterDetails
      requesterId={id}
      onBack={() => router.push("/dashboard/users/requesters")}
    />
  );
}
