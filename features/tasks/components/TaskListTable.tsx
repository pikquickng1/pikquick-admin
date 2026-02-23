import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { TaskListItem } from "../types/task.types";
import { TaskListFilters } from "./TaskListFilters";
import { TaskListFilters as Filters } from "../types/task.types";

interface TaskListTableProps {
  tasks: TaskListItem[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function TaskListTable({
  tasks,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onViewDetails,
  filters,
  onFiltersChange,
}: TaskListTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "id",
      header: "Task ID",
      render: (task: TaskListItem) => (
        <span className="text-sm text-text-primary">{task.id}</span>
      ),
    },
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
          {task.runnerName || "Unassigned"}
        </span>
      ),
    },
    {
      key: "budget",
      header: "Budget",
      render: (task: TaskListItem) => (
        <span className="text-sm text-text-primary">{formatCurrency(task.budget)}</span>
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
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
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
      filters={<TaskListFilters filters={filters} onFiltersChange={onFiltersChange} />}
    />
  );
}
