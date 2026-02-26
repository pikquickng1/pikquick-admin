import type { AdminUser } from "@/lib/types";
import type { RequesterListItem } from "../types/requester-list.types";

function mapStatus(status: string): "Active" | "Suspended" | "Inactive" {
  switch (status) {
    case "active":
      return "Active";
    case "suspended":
      return "Suspended";
    case "inactive":
    case "deleted":
    default:
      return "Inactive";
  }
}

export function mapAdminUserToRequester(user: AdminUser): RequesterListItem {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    balance: 0,
    tasksPosted: 0,
    status: mapStatus(user.status),
  };
}
