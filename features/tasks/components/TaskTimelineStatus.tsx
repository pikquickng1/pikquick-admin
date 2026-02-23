"use client";

import { CheckCheck } from "lucide-react";

interface TimelineEvent {
  id: string;
  status: string;
  timestamp: string;
  completed: boolean;
}

interface TaskTimelineStatusProps {
  events: TimelineEvent[];
  progress: number;
}

export function TaskTimelineStatus({ events, progress }: TaskTimelineStatusProps) {
  return (
    <div className="bg-white rounded-2xl border border-light p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">
        Task Timeline & Status Updates
      </h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Complete</span>
          <span className="text-sm font-semibold text-primary-500">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline Events */}
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  event.completed ? "bg-green-500" : "bg-gray-200"
                }`}
              >
                <CheckCheck
                  className={`w-6 h-6 ${
                    event.completed ? "text-white" : "text-gray-400"
                  }`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pt-2">
                <p
                  className={`text-sm font-medium mb-1 ${
                    event.completed ? "text-text-primary" : "text-text-secondary"
                  }`}
                >
                  {event.status}
                </p>
                <p className="text-xs text-text-secondary">{event.timestamp}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-secondary text-center py-4">No timeline events</p>
        )}
      </div>
    </div>
  );
}
