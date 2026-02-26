import type { AdminTask } from "@/lib/types";
import type { TaskListItem } from "../types/task.types";

function mapStatus(
  status: string
): "In Progress" | "Completed" | "Pending" | "Cancelled" {
  const s = status?.toLowerCase();
  switch (s) {
    case "task_assigned":
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "pending":
      return "Pending";
    case "cancelled":
    case "canceled":
      return "Cancelled";
    default:
      return "Pending";
  }
}

function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

export function mapAdminTaskToListItem(task: AdminTask): TaskListItem {
  return {
    id: task.id,
    title: (task.description as string) ?? `Task ${task.id}`,
    requesterName: (task.client_name as string) ?? "—",
    runnerName: (task.runner_name as string) ?? null,
    budget: (task.budget as number) ?? 0,
    datePosted: formatDate(task.created_at as string | undefined),
    status: mapStatus((task.status as string) ?? "pending"),
  };
}
