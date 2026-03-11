"use client";

import { X, FileText, Send } from "lucide-react";
import { useState } from "react";
import { useTicketDetail } from "../hooks/useTicketDetail";
import { ticketDetailApi } from "../api/ticketDetailApi";

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
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [assignedAdmin, setAssignedAdmin] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");

  if (!open) return null;

  const handleSendMessage = async () => {
    if (!ticket || !message.trim()) return;
    try {
      setSending(true);
      await ticketDetailApi.sendMessage(ticket.id, message);
      setMessage("");
      // Optionally refresh ticket data here
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleMarkAsResolved = async () => {
    if (!ticket) return;
    try {
      setResolving(true);
      await ticketDetailApi.markAsResolved(ticket.id);
      setCurrentStatus("Resolved");
      onActionComplete?.();
      onClose();
    } catch (error) {
      console.error("Failed to mark as resolved:", error);
    } finally {
      setResolving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-yellow-100 text-yellow-600";
      case "Open":
        return "bg-blue-100 text-blue-600";
      case "Resolved":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Ticket Details</h2>
              <p className="text-sm text-text-secondary mt-1">
                View and manage support ticket
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMarkAsResolved}
                disabled={resolving || (currentStatus || ticket?.currentStatus) === "Resolved"}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resolving ? "Resolving..." : "Mark as Resolved"}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : ticket ? (
            <div className="space-y-6">
              {/* User Information */}
              <div className="bg-neutral-50 rounded-lg p-6">
                <h3 className="text-base font-semibold text-text-primary mb-4">
                  User Information
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Name</p>
                    <p className="text-sm font-medium text-text-primary">
                      {ticket.user.name}
                      <span className="ml-2 px-2 py-0.5 bg-neutral-200 text-text-secondary text-xs rounded">
                        {ticket.user.role}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Email</p>
                    <p className="text-sm font-medium text-text-primary">{ticket.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Phone</p>
                    <p className="text-sm font-medium text-text-primary">{ticket.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Task Reference</p>
                    <p className="text-sm font-medium text-blue-600">{ticket.taskReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Current Status</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        currentStatus || ticket.currentStatus
                      )}`}
                    >
                      {currentStatus || ticket.currentStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-1">Created</p>
                    <p className="text-sm font-medium text-text-primary">{ticket.created}</p>
                  </div>
                </div>
              </div>

              {/* Ticket Details */}
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-4">Ticket Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-text-secondary mb-2">Category</p>
                    <select
                      value={category || ticket.category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                      }}
                    >
                      <option>Task Dispute</option>
                      <option>Payment Issue</option>
                      <option>Account Issue</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-2">Priority</p>
                    <select
                      value={priority || ticket.priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                      }}
                    >
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary mb-2">Assign Admin</p>
                    <select
                      value={assignedAdmin || ticket.assignedAdmin}
                      onChange={(e) => setAssignedAdmin(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 rounded text-sm text-text-primary appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                      }}
                    >
                      <option>Select Admin</option>
                      <option>Admin Mike</option>
                      <option>Admin Sarah</option>
                      <option>Admin John</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-3">Description</h3>
                <div className="bg-neutral-50 rounded-lg p-4">
                  <p className="text-sm text-text-primary leading-relaxed">{ticket.description}</p>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-4">Attachments</h3>
                <div className="grid grid-cols-2 gap-4">
                  {ticket.attachments.map((attachment, index) => (
                    <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
                      <div className="p-3 bg-neutral-50 border-b border-neutral-200">
                        <p className="text-xs text-text-secondary truncate">{attachment.filename}</p>
                      </div>
                      <div className="bg-white h-32 flex items-center justify-center">
                        <FileText className="w-12 h-12 text-neutral-300" />
                      </div>
                      <div className="p-3 bg-white border-t border-neutral-200">
                        <button className="flex items-center justify-center gap-2 w-full text-sm text-text-secondary hover:text-text-primary">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Thread */}
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-4">Chat Thread</h3>
                <div className="bg-neutral-50 rounded-lg p-4 space-y-4">
                  {ticket.chatThread.map((chat, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-text-primary">{chat.sender}</p>
                        <p className="text-xs text-text-secondary">{chat.timestamp}</p>
                      </div>
                      <p className="text-sm text-text-primary">{chat.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer - Message Input */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your comment..."
              className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg text-sm text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={sending || !message.trim()}
              className="px-6 py-3 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg border border-gray-300"
            >
              Close
            </button>
            <button
              onClick={handleMarkAsResolved}
              disabled={resolving || (currentStatus || ticket?.currentStatus) === "Resolved"}
              className="px-6 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resolving ? "Resolving..." : "Mark as Resolved"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
