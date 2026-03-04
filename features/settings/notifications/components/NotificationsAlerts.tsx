"use client";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { CreateNotificationModal } from "./CreateNotificationModal";

export function NotificationsAlerts() {
  const router = useRouter();
  const { notifications, loading, page, setPage, totalPages, total, limit } = useNotifications();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateNotification = (data: {
    audience: string;
    messageType: string;
    message: string;
    scheduleTime?: Date;
  }) => {
    console.log("Creating notification:", data);
    // TODO: Implement API call to create notification
  };

  const getAudienceBadgeColor = (audience: string) => {
    switch (audience) {
      case "All":
        return "bg-purple-100 text-purple-700";
      case "Runners":
        return "bg-blue-100 text-blue-700";
      case "Requesters":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "System":
        return "bg-gray-100 text-gray-700";
      case "Custom":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, total);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(page - 1, page, page + 1, page + 2, page + 3);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-2xl font-semibold text-text-primary">Notifications & Alerts</h1>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
        >
          Create Notification
        </button>
      </div>

      {/* All Notifications Log */}
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">All Notifications Log</h2>

        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                  Audience
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                  Type
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                  Message Preview
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                  Sent By
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {notifications.map((notification) => (
                <tr key={notification.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{notification.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getAudienceBadgeColor(
                        notification.audience
                      )}`}
                    >
                      {notification.audience}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getTypeBadgeColor(
                        notification.type
                      )}`}
                    >
                      {notification.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">
                      {notification.messagePreview}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">{notification.sentBy}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-text-secondary">
            Showing {startIndex}-{endIndex} from {total}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {renderPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => setPage(pageNum)}
                className={`w-8 h-8 rounded text-sm ${
                  page === pageNum
                    ? "bg-blue-600 text-white"
                    : "text-text-secondary hover:bg-neutral-100"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {totalPages > 5 && page < totalPages - 2 && (
              <span className="text-text-secondary">...</span>
            )}

            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Create Notification Modal */}
      <CreateNotificationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateNotification}
      />
    </div>
  );
}
