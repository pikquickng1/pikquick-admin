import type { AdminTask, AddressDto } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import type { Task, TaskDisplayStatus } from "../types/task.types";
import { mapTaskStatusToDisplay } from "./mapAdminTaskToListItem";

/** Rough completion percentage derived from the display status. */
const PROGRESS_BY_STATUS: Record<TaskDisplayStatus, number> = {
  Pending: 0,
  "In Progress": 50,
  Completed: 100,
  Cancelled: 0,
};

function formatLocation(task: AdminTask): string {
  const addr = (task.pickup_address ??
    task.dropoff_address ??
    (task as { address?: AddressDto }).address) as AddressDto | undefined;
  if (!addr) return "—";
  const parts = [addr.city, addr.state].filter(Boolean);
  return parts.length ? parts.join(", ") : addr.address ?? "—";
}

/**
 * Maps the backend task detail (GET /tasks/:id → TaskResponseDto) to the admin
 * detail view model.
 *
 * NOTE: bids, timeline, chat and delivery evidence come from separate backend
 * endpoints (/bids/task/:id/bid-history, /tasks/:id/history, chat, proof
 * submissions) and are left empty here until those are wired — no mock data.
 */
export function mapAdminTaskToDetail(task: AdminTask): Task {
  const status = mapTaskStatusToDisplay(task.status as string | undefined);
  const description = (task.description as string) ?? "";
  return {
    id: task.id,
    title: description || `Task ${task.id}`,
    description,
    requesterName: (task.client_name as string) ?? "—",
    requesterEmail: (task.client_email as string) ?? "—",
    runnerName: (task.runner_name as string) || null,
    runnerEmail: (task.runner_email as string) || null,
    budget: (task.budget as number) ?? 0,
    datePosted: formatDate(task.created_at as string | undefined),
    status,
    category:
      (task.category_name as string) ?? (task.task_type as string) ?? "—",
    location: formatLocation(task),
    bids: [],
    timelineEvents: [],
    progress: PROGRESS_BY_STATUS[status],
    chatMessages: [],
    deliveryFiles: [],
  };
}
