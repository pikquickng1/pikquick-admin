import type { AdminUser } from "@/lib/types";
import type { Runner } from "../types/runner.types";

function mapStatus(s: string): "Available" | "Unavailable" | "Suspended" {
  switch (s) {
    case "active":
      return "Available";
    case "suspended":
      return "Suspended";
    default:
      return "Unavailable";
  }
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

export function mapAdminUserToRunner(user: AdminUser): Runner {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    address: "—",
    joinedDate: formatDate(user.created_at as string | undefined),
    verification: "Verified",
    status: mapStatus(user.status),
    balance: 0,
    dailyFee: 0,
    rating: 0,
    totalReviews: 0,
    tasksCompleted: 0,
  };
}
