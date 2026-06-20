import type { AdminUser } from "@/lib/types";
import { UserStatus } from "@/lib/types/enums";
import type { Requester } from "../types/requester.types";
import { formatDate } from "@/lib/utils/date";

export function mapAdminUserToRequester(user: AdminUser): Requester {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    address: "—",
    joinedDate: formatDate(user.created_at),
    accountStatus: user.status,
    status: (user.status as UserStatus) ?? UserStatus.INACTIVE,
    balance: 0,
    tasksPosted: 0,
  };
}
