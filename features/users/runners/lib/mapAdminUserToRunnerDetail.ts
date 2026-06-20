import type { AdminUser } from "@/lib/types";
import { UserStatus } from "@/lib/types/enums";
import type { Runner } from "../types/runner.types";
import { formatDate } from "@/lib/utils/date";

export function mapAdminUserToRunner(user: AdminUser): Runner {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    address: "—",
    joinedDate: formatDate(user.created_at),
    accountStatus: user.status,
    verification: "unverified",
    transportMode: "—",
    status: (user.status as UserStatus) ?? UserStatus.INACTIVE,
    balance: 0,
    rating: 0,
    totalReviews: 0,
    totalTasks: 0,
    tasksCompleted: 0,
  };
}
