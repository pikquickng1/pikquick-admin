"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { LoadingState } from "@/components/ui/loading-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { PageHeader } from "@/components/ui/page-header";
import { DisputeListFilters } from "./DisputeListFilters";
import { TicketDetailsSlideOver } from "./TicketDetailsSlideOver";
import { useTicketList, useTicketStats } from "../hooks/useTicketList";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  DEFAULT_DISPUTE_FILTERS,
  DEFAULT_DISPUTE_TAB,
  type DisputeTab,
  type DisputeTicket,
} from "../types/dispute.types";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import { cn } from "@/lib/utils";

export function DisputesList() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<DisputeTab>(DEFAULT_DISPUTE_TAB);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [pageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_DISPUTE_FILTERS);

  const { tickets, loading, total, totalPages } = useTicketList(
    filters,
    currentPage,
    pageSize,
  );
  const { stats } = useTicketStats();

  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: queryKeys.disputes.all });
  };

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === tickets.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(tickets.map((ticket) => ticket.id));
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedTicketId(id);
    setIsSlideOverOpen(true);
  };

  const handleActionComplete = () => {
    refresh();
  };

  const columns = [
    {
      key: "ticketId",
      header: "Ticket ID",
      render: (ticket: DisputeTicket) => (
        <span className="text-sm text-text-primary font-medium">
          {ticket.ticket_id}
        </span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (ticket: DisputeTicket) => (
        <div>
          <p className="text-sm font-medium text-text-primary">
            {ticket.user?.full_name ?? "—"}
          </p>
          <p className="text-xs text-text-secondary capitalize">
            {ticket.user?.role ?? "—"}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (ticket: DisputeTicket) => (
        <span className="text-sm text-text-primary">{ticket.category}</span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (ticket: DisputeTicket) => (
        <StatusBadge status={ticket.priority} />
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (ticket: DisputeTicket) => (
        <span className="text-sm text-text-primary">
          {ticket.assigned_agent?.full_name ?? "Unassigned"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (ticket: DisputeTicket) => (
        <StatusBadge status={ticket.status} />
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (ticket: DisputeTicket) => (
        <span className="text-sm text-text-primary">{ticket.created_at}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (ticket: DisputeTicket) => (
        <button
          onClick={() => handleViewDetails(ticket.id)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  if (loading) {
    return <LoadingState label="Loading tickets..." />;
  }

  const tabStats: Array<{ key: DisputeTab; label: string; count: number }> = [
    { key: "open", label: "Open Tickets", count: stats.openTickets },
    { key: "in-progress", label: "In Progress", count: stats.inProgress },
    { key: "resolved", label: "Resolved", count: stats.resolved },
  ];

  return (
    <>
      <div className="space-y-6">
        <PageHeader title="Disputes & Support" />

        <div className="bg-white rounded border border-light overflow-hidden">
          <div className="p-6 border-b border-neutral-200">
            <DisputeListFilters filters={filters} onFiltersChange={(next) => {
              setFilters(next);
              setCurrentPage(DEFAULT_PAGE);
            }} />
          </div>

          <div className="grid grid-cols-3 gap-3 bg-neutral-50 p-1 m-4">
            {tabStats.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(DEFAULT_PAGE);
                  setSelectedRows([]);
                }}
                className={cn(
                  "py-4 text-center text-base font-medium transition-colors rounded",
                  activeTab === tab.key
                    ? "bg-white text-text-primary shadow-sm"
                    : "bg-transparent text-text-primary hover:bg-white/50",
                )}
              >
                {tab.label}
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <DataTable
            columns={columns}
            data={tickets}
            keyExtractor={(ticket) => ticket.id}
            selectable
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            emptyMessage="No tickets found"
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

      <TicketDetailsSlideOver
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        ticketId={selectedTicketId}
        onActionComplete={handleActionComplete}
      />
    </>
  );
}
