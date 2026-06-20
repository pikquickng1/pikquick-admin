import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import type { RequesterListItem } from "../types/requester-list.types";
import { RequesterListFilters } from "./RequesterListFilters";
import type { RequesterListFilters as Filters } from "../types/requester-list.types";

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
  const columns = [
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
        <span className="text-sm text-text-primary">{formatNgn(requester.balance)}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (requester: RequesterListItem) => (
        <StatusBadge status={requester.status} />
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
      filters={
        <RequesterListFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
        />
      }
    />
  );
}
