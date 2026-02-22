import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Star } from "lucide-react";
import { RunnerListItem } from "../types/runner-list.types";
import { RunnerListFilters } from "./RunnerListFilters";
import { RunnerListFilters as Filters } from "../types/runner-list.types";

interface RunnerListTableProps {
  runners: RunnerListItem[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewDetails: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function RunnerListTable({
  runners,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onViewDetails,
  filters,
  onFiltersChange,
}: RunnerListTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getVerificationColor = (verification: string) => {
    switch (verification) {
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "Unavailable":
        return "bg-yellow-100 text-yellow-700";
      case "Suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "id",
      header: "Runner ID",
      render: (runner: RunnerListItem) => (
        <span className="text-sm text-text-primary">{runner.id}</span>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (runner: RunnerListItem) => (
        <span className="text-sm text-text-primary font-medium">{runner.name}</span>
      ),
    },
    {
      key: "verification",
      header: "Verification",
      render: (runner: RunnerListItem) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getVerificationColor(
            runner.verification
          )}`}
        >
          {runner.verification}
        </span>
      ),
    },
    {
      key: "balance",
      header: "Balance",
      render: (runner: RunnerListItem) => (
        <span className="text-sm text-text-primary">{formatCurrency(runner.balance)}</span>
      ),
    },
    {
      key: "dailyFee",
      header: "Daily Fee",
      render: (runner: RunnerListItem) => (
        <span className="text-sm text-text-primary">{formatCurrency(runner.dailyFee)}</span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      render: (runner: RunnerListItem) => (
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-text-primary">
            {runner.rating} ({runner.totalReviews})
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (runner: RunnerListItem) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            runner.status
          )}`}
        >
          {runner.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (runner: RunnerListItem) => (
        <Button
          variant="link"
          className="text-primary-500 p-0 h-auto"
          onClick={() => onViewDetails(runner.id)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={runners}
      keyExtractor={(runner) => runner.id}
      selectable
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      onSelectAll={onSelectAll}
      emptyMessage="No runners found"
      filters={<RunnerListFilters filters={filters} onFiltersChange={onFiltersChange} />}
    />
  );
}
