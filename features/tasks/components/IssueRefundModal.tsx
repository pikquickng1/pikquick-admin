"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { CURRENCY_SYMBOL } from "@/lib/config/feature-flags";

const DEFAULT_REFUND_PLACEHOLDER = "2500";
const AMOUNT_STEP = 0.01;
const MIN_AMOUNT = 0;

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

  const numericAmount = parseFloat(amount);
  const isValid =
    !Number.isNaN(numericAmount) &&
    numericAmount > MIN_AMOUNT &&
    numericAmount <= taskBudget;

  const handleSubmit = () => {
    if (isValid) {
      onConfirm(numericAmount);
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
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Refund Amount ({CURRENCY_SYMBOL})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={DEFAULT_REFUND_PLACEHOLDER}
                min={MIN_AMOUNT}
                max={taskBudget}
                step={AMOUNT_STEP}
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
              disabled={loading || !isValid}
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
