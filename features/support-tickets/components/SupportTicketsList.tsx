"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { SupportTicketListFilters } from "./SupportTicketListFilters";
import { useSupportTicketsList } from "../hooks/useSupportTicketList";
import type { SupportTicket, SupportTicketStatus, SupportTicketPriority } from "@/lib/types";

function getPriorityColor(priority: SupportTicketPriority): string {
  switch (priority) {
    case "urgent":
      return "bg-red-100 text-red-600";
    case "high":
      return "bg-orange-100 text-orange-600";
    case "medium":
      return "bg-yellow-100 text-yellow-600";
    case "low":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getStatusColor(status: SupportTicketStatus): string {
  switch (status) {
    case "open":
      return "bg-blue-100 text-blue-600";
    case "in_progress":
      return "bg-yellow-100 text-yellow-600";
    case "resolved":
      return "bg-green-100 text-green-600";
    case "closed":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function formatStatus(status: SupportTicketStatus): string {
  return status.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SupportTicketsList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [filters, setFilters] = useState<{
    search?: string;
    status?: SupportTicketStatus | "all";
    priority?: SupportTicketPriority | "all";
  }>({
    search: "",
    status: "all",
    priority: "all",
  });

  const { tickets, loading, total } = useSupportTicketsList(
    {
      search: filters.search,
      status: filters.status === "all" ? undefined : filters.status,
      priority: filters.priority === "all" ? undefined : filters.priority,
    },
    currentPage,
    pageSize
  );

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/support/${id}`);
  };

  const columns = [
    {
      key: "id",
      header: "Ticket ID",
      render: (ticket: SupportTicket) => (
        <span className="text-sm text-text-primary font-medium">{ticket.id.slice(0, 8)}...</span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (ticket: SupportTicket) => (
        <span className="text-sm text-text-primary max-w-[200px] truncate block">
          {ticket.subject}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (ticket: SupportTicket) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            ticket.status
          )}`}
        >
          {formatStatus(ticket.status)}
        </span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (ticket: SupportTicket) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
            ticket.priority
          )}`}
        >
          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
        </span>
      ),
    },
    {
      key: "assigned",
      header: "Assigned To",
      render: (ticket: SupportTicket) => (
        <span className="text-sm text-text-primary">
          {ticket.assigned_to_name || "Unassigned"}
        </span>
      ),
    },
    {
      key: "created",
      header: "Created",
      render: (ticket: SupportTicket) => (
        <span className="text-sm text-text-secondary">{formatDate(ticket.created_at)}</span>
      ),
    },
    {
      key: "replies",
      header: "Replies",
      render: (ticket: SupportTicket) => (
        <span className="text-sm text-text-primary">{ticket.reply_count || 0}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (ticket: SupportTicket) => (
        <button
          onClick={() => handleViewDetails(ticket.id)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  const totalPages = Math.ceil(total / pageSize);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Support Tickets</h1>

      <div className="bg-white rounded border border-light overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <SupportTicketListFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        <DataTable
          columns={columns}
          data={tickets}
          keyExtractor={(ticket) => ticket.id}
          emptyMessage="No support tickets found"
        />
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          showingFrom={(currentPage - 1) * pageSize + 1}
          showingTo={Math.min(currentPage * pageSize, total)}
          totalItems={total}
        />
      )}
    </div>
  );
}