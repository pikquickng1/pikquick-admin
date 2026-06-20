import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";
import type { RequesterTaskHistory } from "../types/requester.types";

interface RequesterTaskHistoryTableProps {
  tasks: RequesterTaskHistory[];
}

export function RequesterTaskHistoryTable({ tasks }: RequesterTaskHistoryTableProps) {
  const columns = [
    {
      key: "id",
      header: "Task ID",
      render: (task: RequesterTaskHistory) => (
        <span className="text-sm text-text-primary">{task.id}</span>
      ),
    },
    {
      key: "title",
      header: "Title",
      render: (task: RequesterTaskHistory) => (
        <span className="text-sm text-text-primary">{task.title}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (task: RequesterTaskHistory) => <StatusBadge status={task.status} />,
    },
    {
      key: "date",
      header: "Date",
      render: (task: RequesterTaskHistory) => (
        <span className="text-sm text-text-primary">{formatDate(task.date)}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (task: RequesterTaskHistory) => (
        <span className="text-sm text-text-primary font-medium">{formatNgn(task.amount)}</span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tasks}
      keyExtractor={(task) => task.id}
      emptyMessage="No tasks found"
    />
  );
}
