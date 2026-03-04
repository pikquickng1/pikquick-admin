"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { DisputeListFilters } from "./DisputeListFilters";
import { TicketDetailsSlideOver } from "./TicketDetailsSlideOver";
import { useTicketList } from "../hooks/useTicketList";
import { useTicketStats } from "../hooks/useTicketStats";
import { Ticket, TicketListFilters } from "../types/dispute.types";

export function DisputesList() {
  const [activeTab, setActiveTab] = useState<"open" | "in-progress" | "resolved">("open");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const pageSize = 8;

  const [filters, setFilters] = useState<TicketListFilters>({
    search: "",
    priority: "All Priority",
    category: "All Categories",
  });

  const { tickets, loading, total } = useTicketList(filters, currentPage, pageSize);
  const { stats } = useTicketStats();

  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
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
    // Refresh ticket list after action
    // This would trigger a re-fetch in a real implementation
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-600";
      case "In Progress":
        return "bg-yellow-100 text-yellow-600";
      case "Resolved":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const columns = [
    {
      key: "ticketId",
      header: "Ticket ID",
      render: (ticket: Ticket) => (
        <span className="text-sm text-text-primary font-medium">{ticket.ticketId}</span>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (ticket: Ticket) => (
        <div>
          <p className="text-sm font-medium text-text-primary">{ticket.user.name}</p>
          <p className="text-xs text-text-secondary">{ticket.user.role}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (ticket: Ticket) => (
        <span className="text-sm text-text-primary">{ticket.category}</span>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (ticket: Ticket) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
            ticket.priority
          )}`}
        >
          {ticket.priority}
        </span>
      ),
    },
    {
      key: "assignedAgent",
      header: "Assigned Agent",
      render: (ticket: Ticket) => (
        <span className="text-sm text-text-primary">{ticket.assignedAgent}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (ticket: Ticket) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (ticket: Ticket) => (
        <span className="text-sm text-text-primary">{ticket.date}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (ticket: Ticket) => (
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
    <>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-text-primary">Disputes & Support</h1>

        {/* Table wrapper with filters and tabs inside */}
        <div className="bg-white rounded border border-light overflow-hidden">
          {/* Filters inside table */}
          <div className="p-6 border-b border-neutral-200">
            <DisputeListFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Tabs inside table */}
          <div className="grid grid-cols-3 gap-3 bg-neutral-50 p-1 m-4">
            <button
              onClick={() => {
                setActiveTab("open");
                setCurrentPage(1);
                setSelectedRows([]);
              }}
              className={`py-4 text-center text-base font-medium transition-colors rounded ${
                activeTab === "open"
                  ? "bg-white text-text-primary shadow-sm"
                  : "bg-transparent text-text-primary hover:bg-white/50"
              }`}
            >
              Open Tickets
              {stats && (
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {stats.openTickets}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("in-progress");
                setCurrentPage(1);
                setSelectedRows([]);
              }}
              className={`py-4 text-center text-base font-medium transition-colors rounded ${
                activeTab === "in-progress"
                  ? "bg-white text-text-primary shadow-sm"
                  : "bg-transparent text-text-primary hover:bg-white/50"
              }`}
            >
              In Progress
              {stats && (
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                  {stats.inProgress}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab("resolved");
                setCurrentPage(1);
                setSelectedRows([]);
              }}
              className={`py-4 text-center text-base font-medium transition-colors rounded ${
                activeTab === "resolved"
                  ? "bg-white text-text-primary shadow-sm"
                  : "bg-transparent text-text-primary hover:bg-white/50"
              }`}
            >
              Resolved
              {stats && (
                <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                  {stats.resolved}
                </span>
              )}
            </button>
          </div>

          <div className="">
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
        </div>

        {/* Pagination */}
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

      {/* Ticket Details Slide Over */}
      <TicketDetailsSlideOver
        open={isSlideOverOpen}
        onClose={() => setIsSlideOverOpen(false)}
        ticketId={selectedTicketId}
        onActionComplete={handleActionComplete}
      />
    </>
  );
}
