import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { RequesterListItem } from "../types/requester-list.types";
import { RequesterListFilters } from "./RequesterListFilters";
import { RequesterListFilters as Filters } from "../types/requester-list.types";

interface RequesterListTableProps {
  requesters: RequesterListItem[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function RequesterListTable({
  requesters,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onViewDetails,
  filters,
  onFiltersChange,
}: RequesterListTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const columns = [
    {
      key: "id",
      header: "User ID",
      render: (requester: RequesterListItem) => (
        <span className="text-sm text-text-primary">{requester.id}</span>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (requester: RequesterListItem) => (
        <span className="text-sm text-text-primary">{requester.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (requester: RequesterListItem) => (
        <span className="text-sm text-text-secondary">{requester.email}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (requester: RequesterListItem) => (
        <span className="text-sm text-text-secondary">{requester.phone}</span>
      ),
    },
    {
      key: "balance",
      header: "Balance",
      render: (requester: RequesterListItem) => (
        <span className="text-sm text-text-primary">{formatCurrency(requester.balance)}</span>
      ),
    },
    {
      key: "tasksPosted",
      header: "Tasks Posted",
      render: (requester: RequesterListItem) => (
        <span className="text-sm text-text-primary">{requester.tasksPosted}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (requester: RequesterListItem) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${requester.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          {requester.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (requester: RequesterListItem) => (
        <Button
          variant="link"
          className="text-primary-500 p-0 h-auto"
          onClick={() => onViewDetails(requester.id)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={requesters}
      keyExtractor={(requester) => requester.id}
      selectable
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
      emptyMessage="No requesters found"
      filters={<RequesterListFilters filters={filters} onFiltersChange={onFiltersChange} />}
    />
  );
}
