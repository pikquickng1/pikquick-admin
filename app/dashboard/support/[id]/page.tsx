"use client";

import { use, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useSupportTicketDetail } from "@/features/support-tickets/hooks/useSupportTicketDetail";
import { supportTicketsService } from "@/lib/services";
import type { SupportTicketStatus, SupportTicketPriority } from "@/lib/types";

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

interface SupportTicketDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SupportTicketDetailPage({ params }: SupportTicketDetailPageProps) {
  const resolvedParams = use(params);
  const ticketId = resolvedParams.id;
  
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  
  const { ticket, loading, error } = useSupportTicketDetail(ticketId);

  const handleStatusChange = async (newStatus: string) => {
    if (!ticketId || !ticket) return;
    try {
      await supportTicketsService.updateStatus(ticketId, { status: newStatus as SupportTicketStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    if (!ticketId || !ticket) return;
    try {
      await supportTicketsService.updatePriority(ticketId, { priority: newPriority as SupportTicketPriority });
    } catch (err) {
      console.error("Failed to update priority:", err);
    }
  };

  const handleReply = async () => {
    if (!ticketId || !replyMessage.trim()) return;
    setIsReplying(true);
    try {
      await supportTicketsService.replyToTicket(ticketId, { message: replyMessage });
      setReplyMessage("");
    } catch (err) {
      console.error("Failed to send reply:", err);
    } finally {
      setIsReplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load ticket details</p>
        <Link href="/dashboard/support" className="text-primary-500 hover:underline mt-2 inline-block">
          Back to tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/support"
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <h1 className="text-2xl font-semibold text-text-primary">Support Ticket Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded border border-light p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">{ticket.subject}</h2>
                <p className="text-sm text-text-secondary mt-1">
                  Created {formatDate(ticket.created_at)}
                </p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  ticket.status
                )}`}
              >
                {formatStatus(ticket.status)}
              </span>
            </div>

            <div className="prose max-w-none mb-6">
              <p className="text-text-primary whitespace-pre-wrap">{ticket.description}</p>
            </div>
          </div>

          <div className="bg-white rounded border border-light p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Replies</h3>
            <div className="space-y-4">
              {ticket.replies?.map((reply) => (
                <div
                  key={reply.id}
                  className={`p-4 rounded-lg ${
                    reply.is_admin_reply ? "bg-primary-50" : "bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-text-primary">
                      {reply.user_full_name || (reply.is_admin_reply ? "Admin" : "User")}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {formatDate(reply.created_at)}
                    </span>
                    {reply.is_admin_reply && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-text-primary whitespace-pre-wrap">{reply.message}</p>
                </div>
              ))}
              {(!ticket.replies || ticket.replies.length === 0) && (
                <p className="text-text-secondary text-center py-4">No replies yet</p>
              )}
            </div>
          </div>

          {ticket.status !== "closed" && (
            <div className="bg-white rounded border border-light p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Reply to Ticket</h3>
              <div className="space-y-4">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply..."
                  rows={4}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <button
                  onClick={handleReply}
                  disabled={isReplying || !replyMessage.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isReplying ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Send Reply
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded border border-light p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Ticket Info</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-text-secondary">Ticket ID</label>
                <p className="text-text-primary font-mono text-sm">{ticket.id}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Status</label>
                <select
                  value={ticket.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-neutral-200 rounded text-text-primary text-sm"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Priority</label>
                <select
                  value={ticket.priority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-neutral-200 rounded text-text-primary text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Assigned To</label>
                <p className="text-text-primary">{ticket.assigned_to_name || "Unassigned"}</p>
              </div>
              <div>
                <label className="text-sm text-text-secondary">Created</label>
                <p className="text-text-primary">{formatDate(ticket.created_at)}</p>
              </div>
              {ticket.updated_at && (
                <div>
                  <label className="text-sm text-text-secondary">Last Updated</label>
                  <p className="text-text-primary">{formatDate(ticket.updated_at)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}