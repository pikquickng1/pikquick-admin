"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckSquare, DollarSign, UserCheck, ChevronDown } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTaskList } from "../hooks/useTaskList";
import { TaskListFilters } from "./TaskListFilters";
import { TaskListTable } from "./TaskListTable";
import { TaskListSkeleton } from "./TaskListSkeleton";
import { TaskListFilters as Filters } from "../types/task.types";
import { taskApi } from "../api/taskApi";

export function TasksList() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("Today");
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: "All Status",
    sortBy: "Highest Rating",
  });
  const [stats, setStats] = useState({
    activeTasks: 0,
    approvedRefunds: 0,
    activeRunners: 0,
  });

  const { tasks, loading, pagination } = useTaskList(filters, currentPage);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await taskApi.getTaskStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === tasks.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tasks.map((t) => t.id));
    }
  };

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/tasks/${id}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const dateFilterOptions = ["Today", "This Week", "This Month", "All Time"];

  if (loading) {
    return <TaskListSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Task Management</h1>
          <p className="text-sm text-text-secondary mt-1">
            Monitor and manage all tasks and disputes
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-6 py-3 bg-white border border-light rounded-lg text-sm text-text-primary hover:bg-gray-50">
            {dateFilter}
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {dateFilterOptions.map((option) => (
              <DropdownMenuItem key={option} onClick={() => setDateFilter(option)}>
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
            <CheckSquare className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {stats.activeTasks.toLocaleString()}
          </p>
          <p className="text-sm text-text-secondary">Active Tasks</p>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {formatCurrency(stats.approvedRefunds)}
          </p>
          <p className="text-sm text-text-secondary">Approved Refunds</p>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
            <UserCheck className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-xl font-semibold text-text-primary mb-1">
            {stats.activeRunners.toLocaleString()}
          </p>
          <p className="text-sm text-text-secondary">Active Runners</p>
        </div>
      </div>

      <TaskListTable
        tasks={tasks}
        selectedRows={selectedRows}
        onRowSelect={toggleRow}
        onSelectAll={toggleAll}
        onViewDetails={handleViewDetails}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        showingFrom={(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
        showingTo={Math.min(
          pagination.currentPage * pagination.itemsPerPage,
          pagination.totalItems
        )}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}
