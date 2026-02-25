import { DataTable } from "@/components/ui/data-table";
import { RequesterTaskHistory } from "../types/requester.types";

interface RequesterTaskHistoryTableProps {
  tasks: RequesterTaskHistory[];
}

export function RequesterTaskHistoryTable({ tasks }: RequesterTaskHistoryTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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
      render: (task: RequesterTaskHistory) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${task.status === "completed"
              ? "bg-green-100 text-green-700"
              : task.status === "active"
                ? "bg-blue-100 text-blue-700"
                : "bg-red-100 text-red-700"
            }`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      ),
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
        <span className="text-sm text-text-primary font-medium">
          {formatCurrency(task.amount)}
        </span>
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
