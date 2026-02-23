"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface IssueRefundModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (amount: number) => void;
  loading?: boolean;
  taskBudget?: number;
}

export function IssueRefundModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
  taskBudget = 0,
}: IssueRefundModalProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0 && numAmount <= taskBudget) {
      onConfirm(numAmount);
      setAmount("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Approve Refund
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Enter the refund amount for this task
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
                Refund Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="2500"
                min="0"
                max={taskBudget}
                step="0.01"
                className="w-full px-4 py-2.5 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={handleClose}
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-2xl border border-light disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !amount || parseFloat(amount) <= 0 || parseFloat(amount) > taskBudget}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Approve Refund"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
