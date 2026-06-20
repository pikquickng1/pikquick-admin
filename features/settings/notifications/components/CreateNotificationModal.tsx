"use client";

import { Send, CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  NOTIFICATION_AUDIENCE_OPTIONS,
  NOTIFICATION_CHANNEL_OPTIONS,
} from "@/lib/constants/filters";
import {
  notificationAudienceLabel,
  notificationChannelLabel,
} from "@/lib/utils/status";
import { NotificationAudience, NotificationChannel } from "@/lib/types/enums";

interface CreateNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    audience: string;
    messageType: string;
    message: string;
    scheduleTime?: Date;
  }) => void;
}

const AUDIENCE_OPTIONS = NOTIFICATION_AUDIENCE_OPTIONS.map((o) => ({
  value: o.value,
  label: notificationAudienceLabel(o.value),
}));

const CHANNEL_OPTIONS = NOTIFICATION_CHANNEL_OPTIONS.map((o) => ({
  value: o.value,
  label: notificationChannelLabel(o.value),
}));

const DEFAULT_AUDIENCE = notificationAudienceLabel(NotificationAudience.ALL);
const DEFAULT_CHANNEL = notificationChannelLabel(NotificationChannel.PUSH);

export function CreateNotificationModal({
  isOpen,
  onClose,
  onSave,
}: CreateNotificationModalProps) {
  const [audience, setAudience] = useState<string>(DEFAULT_AUDIENCE);
  const [messageType, setMessageType] = useState<string>(DEFAULT_CHANNEL);
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let finalDateTime: Date | undefined;
    if (scheduleDate) {
      finalDateTime = new Date(scheduleDate);
      let hour24 = parseInt(hours, 10);
      if (period === "PM" && hour24 !== 12) hour24 += 12;
      if (period === "AM" && hour24 === 12) hour24 = 0;
      finalDateTime.setHours(hour24, parseInt(minutes, 10));
    }

    onSave({ audience, messageType, message, scheduleTime: finalDateTime });
    setAudience(DEFAULT_AUDIENCE);
    setMessageType(DEFAULT_CHANNEL);
    setMessage("");
    setScheduleDate(undefined);
    setHours("12");
    setMinutes("00");
    setPeriod("PM");
    onClose();
  };

  const formatDateTime = () => {
    if (!scheduleDate) return "Select date and time";
    const dateStr = format(scheduleDate, "PPP");
    return `${dateStr} at ${hours}:${minutes} ${period}`;
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );
  const minuteOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Create Notification
          </DialogTitle>
          <p className="text-sm text-text-secondary mt-1">
            Send a notification to users on the platform
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="audience" className="text-sm font-medium text-text-primary mb-2 block">
              Audience
            </Label>
            <Select
              id="audience"
              value={audience}
              options={AUDIENCE_OPTIONS}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="messageType" className="text-sm font-medium text-text-primary mb-2 block">
              Channel
            </Label>
            <Select
              id="messageType"
              value={messageType}
              options={CHANNEL_OPTIONS}
              onChange={(e) => setMessageType(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="message" className="text-sm font-medium text-text-primary mb-2 block">
              Message Content
            </Label>
            <textarea
              id="message"
              placeholder="Enter notification message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none placeholder:text-neutral-400"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-text-primary mb-2 block">
              Schedule Time (Optional)
            </Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="flex-1 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-left flex items-center justify-between"
                  >
                    <span className={scheduleDate ? "text-text-primary" : "text-neutral-400"}>
                      {scheduleDate ? format(scheduleDate, "PPP") : "Select date"}
                    </span>
                    <CalendarIcon className="w-4 h-4 text-neutral-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduleDate}
                    onSelect={setScheduleDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-32 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-left flex items-center justify-between"
                  >
                    <span className="text-text-primary">
                      {hours}:{minutes} {period}
                    </span>
                    <Clock className="w-4 h-4 text-neutral-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-4" align="end">
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-text-primary mb-3">Select Time</div>
                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <Label className="text-xs text-text-secondary mb-1 block">Hour</Label>
                        <Select
                          value={hours}
                          options={hourOptions.map((h) => ({ value: h, label: h }))}
                          onChange={(e) => setHours(e.target.value)}
                        />
                      </div>
                      <div className="text-lg font-semibold text-text-secondary mt-5">:</div>
                      <div className="flex-1">
                        <Label className="text-xs text-text-secondary mb-1 block">Minute</Label>
                        <Select
                          value={minutes}
                          options={minuteOptions.map((m) => ({ value: m, label: m }))}
                          onChange={(e) => setMinutes(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs text-text-secondary mb-1 block">Period</Label>
                        <Select
                          value={period}
                          options={[
                            { value: "AM", label: "AM" },
                            { value: "PM", label: "PM" },
                          ]}
                          onChange={(e) => setPeriod(e.target.value as "AM" | "PM")}
                        />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            {scheduleDate && (
              <p className="text-xs text-text-secondary mt-2">
                Scheduled for: {formatDateTime()}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Send className="w-4 h-4" />
              Send Notification
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
