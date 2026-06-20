import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import {
  TASK_STATUS_OPTIONS,
  TASK_SORT_OPTIONS,
} from "@/lib/constants/filters";
import type { TaskListItem } from "../types/task.types";
import type { TaskListFilters as Filters } from "../types/task.types";
import { TaskListFilters } from "./TaskListFilters";

interface TaskListTableProps {
  tasks: TaskListItem[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const UNASSIGNED_LABEL = "Unassigned";

export function TaskListTable({
  tasks,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onViewDetails,
  filters,
  onFiltersChange,
}: TaskListTableProps) {
  const columns = [
    
    {
      key: "title",
      header: "Task Title",
      render: (task: TaskListItem) => (
        <span className="text-sm text-text-primary">{task.title}</span>
      ),
    },
    {
      key: "requester",
      header: "Requester",
      render: (task: TaskListItem) => (
        <span className="text-sm text-text-primary">{task.requesterName}</span>
      ),
    },
    {
      key: "runner",
      header: "Runner",
      render: (task: TaskListItem) => (
        <span className="text-sm text-text-secondary">
          {task.runnerName || UNASSIGNED_LABEL}
        </span>
      ),
    },
    {
      key: "budget",
      header: "Budget",
      render: (task: TaskListItem) => (
        <span className="text-sm text-text-primary">{formatNgn(task.budget)}</span>
      ),
    },
    {
      key: "datePosted",
      header: "Date Posted",
      render: (task: TaskListItem) => (
        <span className="text-sm text-text-primary">{task.datePosted}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (task: TaskListItem) => (
        <StatusBadge status={task.status === "In Progress" ? "task_assigned" : task.status.toLowerCase()} />
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (task: TaskListItem) => (
        <Button
          variant="link"
          className="text-primary-500 p-0 h-auto"
          onClick={() => onViewDetails(task.id)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tasks}
      keyExtractor={(task) => task.id}
      selectable
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
      emptyMessage="No tasks found"
      filters={
        <TaskListFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          statusOptions={TASK_STATUS_OPTIONS}
          sortOptions={TASK_SORT_OPTIONS}
        />
      }
    />
  );
}
