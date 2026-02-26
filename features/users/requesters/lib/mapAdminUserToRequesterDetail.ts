import type { AdminUser } from "@/lib/types";
import type { Requester } from "../types/requester.types";

function mapStatus(s: string): "Active" | "Suspended" | "Inactive" {
  switch (s) {
    case "active":
      return "Active";
    case "suspended":
      return "Suspended";
    default:
      return "Inactive";
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

export function mapAdminUserToRequester(user: AdminUser): Requester {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    address: "—",
    joinedDate: formatDate(user.created_at as string | undefined),
    status: mapStatus(user.status),
    balance: 0,
    tasksPosted: 0,
  };
}
