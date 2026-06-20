import type { AdminUser } from "@/lib/types";
import { UserStatus } from "@/lib/types/enums";
import type { RunnerListItem } from "../types/runner-list.types";

export function mapAdminUserToRunner(user: AdminUser): RunnerListItem {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    verification: "unverified",
    balance: 0,
    rating: 0,
    totalReviews: 0,
    status: (user.status as UserStatus) ?? UserStatus.INACTIVE,
  };
}
