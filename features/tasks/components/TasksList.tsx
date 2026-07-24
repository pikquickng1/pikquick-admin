"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckSquare, DollarSign, UserCheck, ChevronDown, Plus } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatNgn } from "@/lib/utils/money";
import { DEFAULT_SEARCH_DEBOUNCE_MS } from "@/lib/config/pagination";
import { ALL_FILTER } from "@/lib/types/enums";
import { DATE_FILTER_OPTIONS } from "@/lib/constants/filters";
import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useTaskList } from "../hooks/useTaskList";
import { useTaskStats } from "../hooks/useTaskStats";
import { TaskListTable } from "./TaskListTable";
import { TaskListSkeleton } from "./TaskListSkeleton";
import { CreateTaskModal } from "./CreateTaskModal";
import type { TaskListFilters as Filters } from "../types/task.types";

const DEFAULT_DATE_FILTER = "today";

export function TasksList() {
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<string>(DEFAULT_DATE_FILTER);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: ALL_FILTER,
    sortBy: "highest_rating",
  });

  const debouncedSearch = useDebouncedValue(filters.search, DEFAULT_SEARCH_DEBOUNCE_MS);
  const apiFilters = { ...filters, search: debouncedSearch };

  const { stats } = useTaskStats();

  const { tasks, loading, pagination } = useTaskList(apiFilters, currentPage);

  const handleFiltersChange = (nextFilters: Filters) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
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

  const formatCurrency = (amount: number) =>
    amount === 0 ? "—" : formatNgn(amount);

  const dateFilterOptions = DATE_FILTER_OPTIONS;

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

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600"
          >
            <Plus className="w-4 h-4" />
            Create Task
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-6 py-3 bg-white border border-light rounded-lg text-sm text-text-primary hover:bg-gray-50">
              {dateFilterOptions.find((o) => o.value === dateFilter)?.label ?? dateFilter}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {dateFilterOptions.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => setDateFilter(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

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
        onFiltersChange={handleFiltersChange}
      />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        showingFrom={(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
        showingTo={Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
        totalItems={pagination.totalItems}
      />

      <CreateTaskModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          /* refresh handled by react-query invalidation in caller */
        }}
      />
    </div>
  );
}
