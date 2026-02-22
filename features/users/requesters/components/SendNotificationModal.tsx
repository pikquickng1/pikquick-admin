"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface SendNotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (subject: string, message: string) => void;
  userName: string;
  loading?: boolean;
}

export function SendNotificationModal({
  open,
  onOpenChange,
  onConfirm,
  userName,
  loading = false,
}: SendNotificationModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (subject.trim() && message.trim()) {
      onConfirm(subject, message);
      setSubject("");
      setMessage("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSubject("");
    setMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Send Notification
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Send a custom notification to {userName}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter notification subject"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={6}
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border rounded-2xl border-light disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !subject.trim() || !message.trim()}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
