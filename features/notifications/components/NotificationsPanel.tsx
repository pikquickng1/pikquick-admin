"use client";

import { X, Search, Shield, Users, AlertCircle, DollarSign } from "lucide-react";
import { useState } from "react";
import { useNotifications } from "../hooks/useNotifications";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const { notifications, unreadCount, loading, markAsRead } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const getIcon = (iconType: string, color: string) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      red: "bg-red-100 text-red-600",
      purple: "bg-purple-100 text-purple-600",
    };

    const iconClass = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

    const icons = {
      shield: <Shield className="w-5 h-5" />,
      users: <Users className="w-5 h-5" />,
      alert: <AlertCircle className="w-5 h-5" />,
      dollar: <DollarSign className="w-5 h-5" />,
    };

    const icon = icons[iconType as keyof typeof icons] || icons.shield;

    return (
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconClass}`}>
        {icon}
      </div>
    );
  };

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-4 border-b border-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-xl font-semibold text-text-primary">
                  Notifications
                </SheetTitle>
                <p className="text-sm text-text-secondary mt-1">
                  {unreadCount} new notification{unreadCount !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </SheetHeader>

          {/* Search */}
          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search notifications.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-neutral-500">Loading...</p>
                </div>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-sm text-text-secondary">No notifications found</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-neutral-50 cursor-pointer transition-colors ${
                      notification.isNew ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      if (notification.isNew) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {getIcon(notification.icon, notification.iconColor)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-text-primary">
                            {notification.title}
                          </h4>
                          {notification.isNew && (
                            <span className="px-2 py-0.5 text-xs font-medium text-white bg-blue-600 rounded-full shrink-0">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mb-2">
                          {notification.description}
                        </p>
                        <p className="text-xs text-text-secondary">{notification.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
