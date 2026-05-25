"use client";

import { useState } from "react";
import { useRunnerTaskRecords } from "../hooks/useRunnerTaskRecords";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { RunnerTaskHistory } from "../types/runner.types";

interface RunnerTaskRecordsTabProps {
  runnerId: string;
}

export function RunnerTaskRecordsTab({ runnerId }: RunnerTaskRecordsTabProps) {
  const { data: tasks, pagination, loading, error, setPage } = useRunnerTaskRecords(runnerId);
  // Optionally, you can fetch completed/total tasks from another endpoint if needed
  // For now, just sum from tasks
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const totalTasks = tasks.length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "active":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const columns = [
    {
      key: "id",
      header: "Task ID",
      render: (task: RunnerTaskHistory) => (
        <span className="text-sm text-text-primary">{task.id}</span>
      ),
    },
    {
      key: "title",
      header: "Task Type",
      render: (task: RunnerTaskHistory) => (
        <span className="text-sm text-text-primary">{task.title}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (task: RunnerTaskHistory) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (task: RunnerTaskHistory) => (
        <span className="text-sm text-text-primary">{task.date}</span>
      ),
    },
    {
      key: "amount",
      header: "Payment Earned",
      render: (task: RunnerTaskHistory) => (
        <span className="text-sm text-text-primary">{formatCurrency(task.amount)}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded border border-neutral-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-2">Task Records</h2>
          <p className="text-sm text-text-secondary">
            {completedTasks} completed out of {totalTasks} total tasks
          </p>
        </div>

        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading...</div>
        ) : error ? (
          <div className="py-8 text-center text-red-500">{error}</div>
        ) : (
          <DataTable
            columns={columns}
            data={tasks}
            keyExtractor={(task) => task.id}
            emptyMessage="No task records found"
          />
        )}
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
        showingFrom={(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
        showingTo={Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
        totalItems={pagination.totalItems}
      />
    </div>
  );
}
