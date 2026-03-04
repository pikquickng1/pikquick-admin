"use client";

import { X, Send, CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export function CreateNotificationModal({
  isOpen,
  onClose,
  onSave,
}: CreateNotificationModalProps) {
  const [audience, setAudience] = useState("All Users");
  const [messageType, setMessageType] = useState("Push Notification");
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState<Date>();
  const [hours, setHours] = useState("12");
  const [minutes, setMinutes] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("PM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine date and time if date is selected
    let finalDateTime: Date | undefined = undefined;
    if (scheduleDate) {
      finalDateTime = new Date(scheduleDate);
      let hour24 = parseInt(hours);
      if (period === "PM" && hour24 !== 12) hour24 += 12;
      if (period === "AM" && hour24 === 12) hour24 = 0;
      finalDateTime.setHours(hour24, parseInt(minutes));
    }
    
    onSave({ audience, messageType, message, scheduleTime: finalDateTime });
    setAudience("All Users");
    setMessageType("Push Notification");
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

  const hourOptions = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return hour.toString().padStart(2, "0");
  });

  const minuteOptions = Array.from({ length: 60 }, (_, i) => {
    return i.toString().padStart(2, "0");
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Create Notification
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Send a notification to users on the platform
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="audience" className="text-sm font-medium text-text-primary mb-2 block">
              Audience
            </Label>
            <select
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-text-primary appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value="All Users">All Users</option>
              <option value="Runners">Runners</option>
              <option value="Requesters">Requesters</option>
            </select>
          </div>

          <div>
            <Label htmlFor="messageType" className="text-sm font-medium text-text-primary mb-2 block">
              Message Type
            </Label>
            <select
              id="messageType"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-text-primary appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
              }}
            >
              <option value="Push Notification">Push Notification</option>
              <option value="Email">Email</option>
              <option value="SMS">SMS</option>
              <option value="In-App">In-App</option>
            </select>
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
                        <select
                          value={hours}
                          onChange={(e) => setHours(e.target.value)}
                          className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {hourOptions.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="text-lg font-semibold text-text-secondary mt-5">:</div>
                      <div className="flex-1">
                        <Label className="text-xs text-text-secondary mb-1 block">Minute</Label>
                        <select
                          value={minutes}
                          onChange={(e) => setMinutes(e.target.value)}
                          className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {minuteOptions.map((minute) => (
                            <option key={minute} value={minute}>
                              {minute}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <Label className="text-xs text-text-secondary mb-1 block">Period</Label>
                        <select
                          value={period}
                          onChange={(e) => setPeriod(e.target.value as "AM" | "PM")}
                          className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
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
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              <Send className="w-4 h-4" />
              Send Notification
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
