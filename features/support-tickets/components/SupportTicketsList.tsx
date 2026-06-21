"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { LoadingState } from "@/components/ui/loading-state";
import { ErrorState } from "@/components/ui/error-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { SupportTicketListFilters } from "./SupportTicketListFilters";
import {
  DEFAULT_SUPPORT_TICKET_FILTERS,
  useSupportTicketsList,
} from "../hooks/useSupportTicketList";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { formatDateTime } from "@/lib/utils/date";
import type { SupportTicket } from "@/lib/types";

export function SupportTicketsList() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [filters, setFilters] = useState(DEFAULT_SUPPORT_TICKET_FILTERS);

  const { tickets, loading, error, total, totalPages, refetch } = useSupportTicketsList(
    filters,
    currentPage,
    pageSize,
  );

  const handleViewDetails = (id: string) => {
    router.push(`/dashboard/support/${id}`);
  };

  const columns = [
    {
      key: "id",
      header: "Ticket ID",
      render: (ticket: SupportTicket) => (
        <span className="text-sm text-text-primary font-medium">
          {ticket.id.slice(0, 8)}...
        </span>
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
        <StatusBadge status={ticket.status} />
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (ticket: SupportTicket) => (
        <StatusBadge status={ticket.priority} />
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
        <span className="text-sm text-text-secondary">
          {formatDateTime(ticket.created_at)}
        </span>
      ),
    },
    {
      key: "replies",
      header: "Replies",
      render: (ticket: SupportTicket) => (
        <span className="text-sm text-text-primary">{ticket.reply_count ?? 0}</span>
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

  if (loading) return <LoadingState label="Loading support tickets..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <PageHeader title="Support Tickets" />

      <div className="bg-white rounded border border-light overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <SupportTicketListFilters
            filters={filters}
            onFiltersChange={(next) => {
              setFilters(next);
              setCurrentPage(DEFAULT_PAGE);
            }}
          />
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
