"use client";

import { X, Search, Shield, Users, AlertCircle, DollarSign, Check } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LoadingState } from "@/components/ui/loading-state";
import { Button } from "@/components/ui/button";
import { formatRelative } from "@/lib/utils/date";
import { useNotifications } from "../hooks/useNotifications";
import type { AdminNotification } from "../types/notifications.types";

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ICON_CLASS: Record<AdminNotification["iconColor"], string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  purple: "bg-purple-100 text-purple-600",
};

const ICON_MAP: Record<AdminNotification["icon"], React.ReactNode> = {
  shield: <Shield className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  alert: <AlertCircle className="w-5 h-5" />,
  dollar: <DollarSign className="w-5 h-5" />,
};

export function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead } =
    useNotifications();
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = notifications.filter((n) => {
    const q = searchQuery.toLowerCase();
    return n.title.toLowerCase().includes(q) || n.description.toLowerCase().includes(q);
  });

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <div className="flex flex-col h-full">
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
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    <Check className="w-4 h-4" />
                    Mark all
                  </Button>
                )}
                <button
                  onClick={onClose}
                  className="text-text-secondary hover:text-text-primary"
                  aria-label="Close notifications"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </SheetHeader>

          <div className="px-6 py-4 border-b border-neutral-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search notifications.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-200 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <LoadingState label="Loading notifications..." minHeight="min-h-[200px]" />
            ) : filtered.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-sm text-text-secondary">No notifications found</p>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100">
                {filtered.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-6 py-4 hover:bg-neutral-50 cursor-pointer transition-colors ${
                      notification.isNew ? "bg-blue-50" : ""
                    }`}
                    onClick={() => {
                      if (notification.isNew) markAsRead(notification.id);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                          ICON_CLASS[notification.iconColor] ?? ICON_CLASS.blue
                        }`}
                      >
                        {ICON_MAP[notification.icon] ?? ICON_MAP.shield}
                      </div>
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
                        <p className="text-xs text-text-secondary">
                          {formatRelative(notification.timestamp)}
                        </p>
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
