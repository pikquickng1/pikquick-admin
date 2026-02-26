import type { AdminUser } from "@/lib/types";
import type { RunnerListItem } from "../types/runner-list.types";

function mapStatus(
  status: string
): "Available" | "Unavailable" | "Suspended" {
  switch (status) {
    case "active":
      return "Available";
    case "suspended":
      return "Suspended";
    case "inactive":
    case "deleted":
    default:
      return "Unavailable";
  }
}

/** Admin users list does not include verification, balance, rating; use defaults. */
export function mapAdminUserToRunner(user: AdminUser): RunnerListItem {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    verification: "Verified",
    balance: 0,
    dailyFee: 0,
    rating: 0,
    totalReviews: 0,
    status: mapStatus(user.status),
  };
}
