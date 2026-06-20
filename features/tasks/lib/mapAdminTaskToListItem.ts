import type { AdminTask } from "@/lib/types";
import { TaskStatus } from "@/lib/types/enums";
import { formatDate } from "@/lib/utils/date";
import type { TaskListItem } from "../types/task.types";

const STATUS_MAP: Record<string, TaskListItem["status"]> = {
  [TaskStatus.TASK_ASSIGNED]: "In Progress",
  [TaskStatus.TASK_STARTED]: "In Progress",
  [TaskStatus.EN_ROUTE_TO_DROPOFF]: "In Progress",
  [TaskStatus.AWAITING_CLIENT_APPROVAL]: "In Progress",
  [TaskStatus.TASK_COMPLETED]: "Completed",
  [TaskStatus.PENDING]: "Pending",
  [TaskStatus.BIDDING]: "Pending",
  [TaskStatus.BID_ACCEPTED]: "Pending",
  [TaskStatus.CANCELLED]: "Cancelled",
};

export function mapAdminTaskToListItem(task: AdminTask): TaskListItem {
  const raw = (task.status as string | undefined)?.toLowerCase() ?? TaskStatus.PENDING;
  return {
    id: task.id,
    title: (task.description as string) ?? `Task ${task.id}`,
    requesterName: (task.client_name as string) ?? "—",
    runnerName: (task.runner_name as string) ?? null,
    budget: (task.budget as number) ?? 0,
    datePosted: formatDate(task.created_at as string | undefined),
    status: STATUS_MAP[raw] ?? "Pending",
  };
}
