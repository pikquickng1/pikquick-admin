"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronDown } from "lucide-react";

interface AdjustWalletModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (type: "debit" | "credit", amount: number) => void;
  loading?: boolean;
}

export function AdjustWalletModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: AdjustWalletModalProps) {
  const [transactionType, setTransactionType] = useState<"debit" | "credit">("debit");
  const [amount, setAmount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const transactionOptions = [
    { value: "debit" as const, label: "Debit (Deduct Money)" },
    { value: "credit" as const, label: "Credit (Add Money)" },
  ];

  const selectedOption = transactionOptions.find((opt) => opt.value === transactionType);

  const handleSubmit = () => {
    const numAmount = parseFloat(amount);
    if (numAmount > 0) {
      onConfirm(transactionType, numAmount);
      setTransactionType("debit");
      setAmount("");
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setTransactionType("debit");
    setAmount("");
    setIsDropdownOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Adjust Wallet Balance
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Add or deduct amount from the requester's wallet
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
            <div className="relative">
              <button
                type="button"
                onClick={() => !loading && setIsDropdownOpen(!isDropdownOpen)}
                disabled={loading}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer text-left flex items-center justify-between"
              >
                <span>{selectedOption?.label}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-600 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                  {transactionOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setTransactionType(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${transactionType === option.value
                        ? "bg-gray-50 text-gray-900 font-medium"
                        : "text-gray-700"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Amount (₦)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                min="0"
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
              disabled={loading || !amount || parseFloat(amount) <= 0}
              className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Confirm Adjustment"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
