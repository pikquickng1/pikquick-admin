"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  User,
  MoreVertical,
  Play,
  XCircle,
  RefreshCw,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/ui/status-badge";
import { tasksService } from "@/lib/services";
import { useTask } from "../hooks/useTask";
import { TaskBudgetBids } from "./TaskBudgetBids";
import { TaskTimelineStatus } from "./TaskTimelineStatus";
import { TaskChatLog } from "./TaskChatLog";
import { TaskDeliveryEvidence } from "./TaskDeliveryEvidence";
import { IssueRefundModal } from "./IssueRefundModal";
import { TaskDetailsSkeleton } from "./TaskDetailsSkeleton";

interface TaskDetailsProps {
  taskId: string;
  onBack?: () => void;
}

const CANCEL_REASON_BY_ADMIN = "Cancelled by admin";
const REFUND_REASON_BY_ADMIN = "Refund issued by admin";

export function TaskDetails({ taskId, onBack }: TaskDetailsProps) {
  const { task, loading, error, refetch } = useTask(taskId);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isRefundLoading, setIsRefundLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const handleIssueRefund = async (amount: number) => {
    setIsRefundLoading(true);
    try {
      await tasksService.refund(taskId, amount, REFUND_REASON_BY_ADMIN);
      setIsRefundModalOpen(false);
      await refetch();
    } finally {
      setIsRefundLoading(false);
    }
  };

  const runAction = async (
    key: string,
    fn: () => Promise<unknown>,
  ) => {
    setActionLoading(key);
    try {
      await fn();
      await refetch();
      setShowActionsMenu(false);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return <TaskDetailsSkeleton />;
  }

  if (error || !task) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-red-500">{error || "Failed to load task details"}</p>
          <Button onClick={onBack} variant="outline" className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const isPending = task.status === "Pending";
  const isInProgress = task.status === "In Progress";
  const isCompleted = task.status === "Completed";
  const isCancelled = task.status === "Cancelled";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <h1 className="text-2xl font-semibold text-text-primary">Task Details</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Button
              onClick={() => setShowActionsMenu(!showActionsMenu)}
              className="bg-primary-500 hover:bg-primary-600 text-white flex items-center gap-2"
            >
              <MoreVertical className="w-4 h-4" />
              Actions
            </Button>

            {showActionsMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 z-10">
                <div className="py-1">
                  {isPending && (
                    <button
                      onClick={() => runAction("start", () => tasksService.startTask(taskId))}
                      disabled={actionLoading === "start"}
                      className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      {actionLoading === "start" ? "Starting..." : "Start Task"}
                    </button>
                  )}
                  {isInProgress && (
                    <button
                      onClick={() =>
                        runAction("complete", () => tasksService.completeTask(taskId))
                      }
                      disabled={actionLoading === "complete"}
                      className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {actionLoading === "complete" ? "Completing..." : "Mark as Completed"}
                    </button>
                  )}
                  {isCompleted && (
                    <button
                      onClick={() =>
                        runAction("approve", () => tasksService.approveCompletion(taskId))
                      }
                      disabled={actionLoading === "approve"}
                      className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {actionLoading === "approve" ? "Approving..." : "Approve Completion"}
                    </button>
                  )}
                  {!isCancelled && !isCompleted && (
                    <button
                      onClick={() =>
                        runAction("cancel", () =>
                          tasksService.cancelTask([taskId], { reason: CANCEL_REASON_BY_ADMIN }),
                        )
                      }
                      disabled={actionLoading === "cancel"}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      {actionLoading === "cancel" ? "Cancelling..." : "Cancel Task"}
                    </button>
                  )}
                  {(isCompleted || isCancelled) && (
                    <button
                      onClick={() => runAction("restart", () => tasksService.restartTask(taskId))}
                      disabled={actionLoading === "restart"}
                      className="w-full px-4 py-2 text-left text-sm text-text-primary hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      {actionLoading === "restart" ? "Restarting..." : "Restart Task"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <Button onClick={() => setIsRefundModalOpen(true)} variant="outline">
            Issue Refund
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">{task.title}</h2>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-text-secondary">{task.id}</span>
          <StatusBadge
            status={
              task.status === "In Progress"
                ? "task_assigned"
                : task.status.toLowerCase()
            }
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-text-primary mb-2">Task Description</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{task.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-light p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Requester Information
          </h3>
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary-500 text-white text-lg">
                {getInitials(task.requesterName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-text-primary mb-1">
                {task.requesterName}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Mail className="w-4 h-4" />
                  {task.requesterEmail}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-light p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Runner Information</h3>
          {task.runnerName ? (
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary-500 text-white text-lg">
                  {getInitials(task.runnerName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-lg font-semibold text-text-primary">
                    {task.runnerName}
                  </h4>
                  <StatusBadge status="verified" label="Verified" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Mail className="w-4 h-4" />
                    {task.runnerEmail}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 text-text-secondary">
              <User className="w-8 h-8 mr-2" />
              <span>No runner assigned yet</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-light p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Task Location</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Pick Up Location</p>
              <p className="text-sm text-text-secondary">{task.location || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Drop-Off Location</p>
              <p className="text-sm text-text-secondary">{task.location || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      <TaskBudgetBids budget={task.budget} bids={task.bids ?? []} />

      <TaskTimelineStatus
        events={task.timelineEvents ?? []}
        progress={task.progress ?? 0}
      />

      <TaskChatLog messages={task.chatMessages ?? []} />

      <TaskDeliveryEvidence files={task.deliveryFiles ?? []} />

      <IssueRefundModal
        open={isRefundModalOpen}
        onOpenChange={setIsRefundModalOpen}
        onConfirm={handleIssueRefund}
        loading={isRefundLoading}
        taskBudget={task.budget}
      />
    </div>
  );
}
