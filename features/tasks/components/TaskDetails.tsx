"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export function TaskDetails({ taskId, onBack }: TaskDetailsProps) {
  const { task, loading, error } = useTask(taskId);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isRefundLoading, setIsRefundLoading] = useState(false);

  console.log("TaskDetails - task data:", task);
  console.log("TaskDetails - chatMessages:", task?.chatMessages);
  console.log("TaskDetails - deliveryFiles:", task?.deliveryFiles);

  const handleIssueRefund = async (amount: number) => {
    setIsRefundLoading(true);
    try {
      // TODO: Implement actual refund API call
      console.log("Issuing refund:", amount);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setIsRefundModalOpen(false);
      // Show success message
    } catch (error) {
      console.error("Failed to issue refund:", error);
    } finally {
      setIsRefundLoading(false);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

        <Button 
          onClick={() => setIsRefundModalOpen(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white"
        >
          Issue Refund
        </Button>
      </div>

      {/* Task Info Card */}
      <div className="bg-white rounded-2xl border border-light p-6">
        <h2 className="text-xl font-semibold text-text-primary mb-4">{task.title}</h2>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm text-text-secondary">{task.id}</span>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        <div>
          <h3 className="text-base font-semibold text-text-primary mb-2">Task Description</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{task.description}</p>
        </div>
      </div>

      {/* Requester and Runner Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requester Information */}
        <div className="bg-white rounded-2xl border border-light p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Requester Information</h3>
          
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
              <p className="text-sm text-text-secondary mb-3">
                REQ001 • Total Tasks Posted: 24
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Mail className="w-4 h-4" />
                  {task.requesterEmail}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Phone className="w-4 h-4" />
                  +234 801 234 5678
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="w-4 h-4" />
                  Joined January 15, 2025
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Runner Information */}
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
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-600">
                    Verified
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-text-secondary">REQ0001</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-600">
                    🏍️ Motorcycle
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-text-primary">4.8 (145 tasks)</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <svg
                    className="w-4 h-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-text-primary">138 completed</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Mail className="w-4 h-4" />
                    {task.runnerEmail}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Phone className="w-4 h-4" />
                    +234 801 234 5678
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar className="w-4 h-4" />
                    Joined January 15, 2025
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

      {/* Task Location */}
      <div className="bg-white rounded-2xl border border-light p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Task Location</h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Pick Up Location</p>
              <p className="text-sm text-text-secondary">Lekki Lagos</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-text-primary mb-1">Drop-Off Location</p>
              <p className="text-sm text-text-secondary">Lekki Lagos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Budget & Bids Overview */}
      <TaskBudgetBids 
        budget={task.bids && task.bids.length > 0 ? task.budget : task.budget} 
        bids={task.bids || []} 
      />

      {/* Task Timeline & Status Updates */}
      <TaskTimelineStatus
        events={task.timelineEvents || []}
        progress={task.progress || 0}
      />

      {/* Chat Log */}
      <TaskChatLog messages={task.chatMessages || []} />

      {/* Uploaded Delivery Evidence */}
      <TaskDeliveryEvidence files={task.deliveryFiles || []} />

      {/* Issue Refund Modal */}
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
