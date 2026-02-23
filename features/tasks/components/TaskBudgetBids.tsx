"use client";

import { Star, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Bid {
  id: string;
  runnerName: string;
  rating: number;
  amount: number;
  status: "Accepted" | "Declined" | "Pending";
}

interface TaskBudgetBidsProps {
  budget: number;
  bids: Bid[];
}

export function TaskBudgetBids({ budget, bids }: TaskBudgetBidsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Declined":
        return "bg-gray-100 text-gray-500";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-light p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Budget & Bids Overview</h3>

      {/* Task Budget */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <span className="text-base text-text-secondary">Task Budget</span>
        <span className="text-2xl font-bold text-text-primary">{formatCurrency(budget)}</span>
      </div>

      {/* Bids List */}
      <div className="space-y-4">
        {bids.length > 0 ? (
          bids.map((bid) => (
            <div key={bid.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary-500 text-white">
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-text-primary">{bid.runnerName}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-text-secondary">{bid.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-text-primary">
                  {formatCurrency(bid.amount)}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    bid.status
                  )}`}
                >
                  {bid.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-text-secondary text-center py-4">No bids yet</p>
        )}
      </div>
    </div>
  );
}
