"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { formatDateTime } from "@/lib/utils/date";
import { useNotificationsLog, useCreateNotification } from "../hooks/useNotifications";
import { CreateNotificationModal } from "./CreateNotificationModal";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/config/pagination";
import type {
  AdminNotificationLogItem,
  CreateNotificationPayload,
  NotificationAudienceLabel,
} from "../types/notifications.types";

export function NotificationsAlerts() {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [limit] = useState<number>(DEFAULT_PAGE_SIZE);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { notifications, loading, total, totalPages } = useNotificationsLog({
    page,
    limit,
  });
  const { mutateAsync: createNotification } = useCreateNotification();

  const handleCreateNotification = async (data: {
    audience: string;
    messageType: string;
    message: string;
    scheduleTime?: Date;
  }) => {
    await createNotification(data as unknown as CreateNotificationPayload);
    setIsCreateModalOpen(false);
  };

  if (loading) return <LoadingState label="Loading notifications..." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications & Alerts"
        actions={
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create Notification
          </Button>
        }
      />

      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-4">All Notifications Log</h2>

        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Audience</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Message Preview</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Sent By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-text-secondary">
                    No notifications yet.
                  </td>
                </tr>
              ) : (
                notifications.map((notification: AdminNotificationLogItem) => (
                  <tr key={notification.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {formatDateTime(notification.date)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <AudienceBadge audience={notification.audience} />
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={notification.type.toLowerCase()} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {notification.messagePreview}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-text-secondary">
                        {notification.sentBy}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            showingFrom={(page - 1) * limit + 1}
            showingTo={Math.min(page * limit, total)}
            totalItems={total}
          />
        )}
      </div>

      <CreateNotificationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateNotification}
      />
    </div>
  );
}

function AudienceBadge({ audience }: { audience: NotificationAudienceLabel }) {
  const map: Record<NotificationAudienceLabel, string> = {
    "All Users": "bg-purple-100 text-purple-700",
    "Runners": "bg-blue-100 text-blue-700",
    "Requesters": "bg-green-100 text-green-700",
  };
  return (
    <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${map[audience] ?? "bg-gray-100 text-gray-700"}`}>
      {audience}
    </span>
  );
}
