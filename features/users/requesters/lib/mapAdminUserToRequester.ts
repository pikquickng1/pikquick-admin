import type { AdminUser } from "@/lib/types";
import { UserStatus } from "@/lib/types/enums";
import type { RequesterListItem } from "../types/requester-list.types";

export function mapAdminUserToRequester(user: AdminUser): RequesterListItem {
  return {
    id: user.id,
    name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    balance: 0,
    tasksPosted: 0,
    status: (user.status as UserStatus) ?? UserStatus.INACTIVE,
  };
}
