"use client";

import { X, Send } from "lucide-react";
import { useState } from "react";
import { LoadingState } from "@/components/ui/loading-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { useTicketDetail } from "../hooks/useTicketDetail";
import { disputeApi } from "../api/disputeApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import {
  DISPUTE_CATEGORY_OPTIONS,
  DISPUTE_PRIORITY_OPTIONS,
} from "@/lib/constants/filters";
import { formatDateTime } from "@/lib/utils/date";
import type { DisputeTicketDetail } from "../types/ticket-detail.types";
import { DisputeStatus, DisputePriority, DisputeCategory } from "@/lib/types/enums";

interface TicketDetailsSlideOverProps {
  open: boolean;
  onClose: () => void;
  ticketId: string | null;
  onActionComplete?: () => void;
}

export function TicketDetailsSlideOver({
  open,
  onClose,
  ticketId,
  onActionComplete,
}: TicketDetailsSlideOverProps) {
  const { ticket, loading } = useTicketDetail(ticketId);
  const queryClient = useQueryClient();
  const [resolutionNotes, setResolutionNotes] = useState("");

  const resolveMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      disputeApi.resolveTicket(id, status, resolutionNotes || undefined),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.disputes.all });
      onActionComplete?.();
      onClose();
    },
  });

  if (!open) return null;

  const handleMarkAsResolved = () => {
    if (!ticket) return;
    resolveMutation.mutate({ id: ticket.id, status: DisputeStatus.RESOLVED });
  };

  const isResolved = ticket?.status === DisputeStatus.RESOLVED;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl z-50 overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Ticket Details</h2>
              <p className="text-sm text-text-secondary mt-1">
                {ticket?.ticket_id ?? "View and manage dispute ticket"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={handleMarkAsResolved}
                disabled={resolveMutation.isPending || isResolved}
                className="bg-green-500 hover:bg-green-600"
              >
                {resolveMutation.isPending ? "Resolving..." : "Mark as Resolved"}
              </Button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <LoadingState label="Loading ticket..." minHeight="min-h-[200px]" />
          ) : ticket ? (
            <TicketDetailBody ticket={ticket} resolutionNotes={resolutionNotes} setResolutionNotes={setResolutionNotes} />
          ) : null}
        </div>

        <div className="px-6 py-4 border-t border-neutral-200 bg-white">
          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="default"
              onClick={handleMarkAsResolved}
              disabled={resolveMutation.isPending || isResolved}
              className="bg-green-500 hover:bg-green-600"
            >
              {resolveMutation.isPending ? "Resolving..." : "Mark as Resolved"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function TicketDetailBody({
  ticket,
  resolutionNotes,
  setResolutionNotes,
}: {
  ticket: DisputeTicketDetail;
  resolutionNotes: string;
  setResolutionNotes: (v: string) => void;
}) {
  const priorityOptions = (DISPUTE_PRIORITY_OPTIONS as unknown as Array<{ value: string; label: string }>).filter(
    (o) => o.value !== "__all__",
  );
  const categoryOptions = (DISPUTE_CATEGORY_OPTIONS as unknown as Array<{ value: string; label: string }>).filter(
    (o) => o.value !== "__all__",
  );

  return (
    <div className="space-y-6">
      <div className="bg-neutral-50 rounded-lg p-6">
        <h3 className="text-base font-semibold text-text-primary mb-4">User Information</h3>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Field label="Name">
            <span className="text-sm font-medium text-text-primary">
              {ticket.user?.full_name ?? "—"}
              <span className="ml-2 px-2 py-0.5 bg-neutral-200 text-text-secondary text-xs rounded capitalize">
                {ticket.user?.role ?? "—"}
              </span>
            </span>
          </Field>
          <Field label="Task Reference">
            <span className="text-sm font-medium text-blue-600">
              {ticket.task?.title ?? "—"}
            </span>
          </Field>
          <Field label="Current Status">
            <StatusBadge status={ticket.status} />
          </Field>
          <Field label="Created">
            <span className="text-sm font-medium text-text-primary">
              {formatDateTime(ticket.created_at)}
            </span>
          </Field>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-text-primary mb-4">Ticket Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-text-secondary mb-2">Category</p>
            <Select
              value={ticket.category ?? ""}
              options={categoryOptions}
              disabled
            />
          </div>
          <div>
            <p className="text-sm text-text-secondary mb-2">Priority</p>
            <Select
              value={ticket.priority ?? ""}
              options={priorityOptions}
              disabled
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-text-secondary">
          Editing category/priority is not supported via this UI yet.
        </p>
      </div>

      {ticket.description && (
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-3">Description</h3>
          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-sm text-text-primary leading-relaxed">{ticket.description}</p>
          </div>
        </div>
      )}

      {ticket.resolution_notes && (
        <div>
          <h3 className="text-base font-semibold text-text-primary mb-3">Resolution Notes</h3>
          <div className="bg-neutral-50 rounded-lg p-4">
            <p className="text-sm text-text-primary leading-relaxed">{ticket.resolution_notes}</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-base font-semibold text-text-primary mb-3">Resolution Notes</h3>
        <textarea
          value={resolutionNotes}
          onChange={(e) => setResolutionNotes(e.target.value)}
          rows={3}
          placeholder="Optional notes for the resolution..."
          className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm text-text-secondary mb-1">{label}</p>
      {children}
    </div>
  );
}
