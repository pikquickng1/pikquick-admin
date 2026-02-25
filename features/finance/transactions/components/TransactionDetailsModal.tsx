"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Download, Loader2 } from "lucide-react";
import { Transaction, TransactionDetails } from "../types/transaction.types";
import { useTransaction } from "../hooks/useTransaction";

interface TransactionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
}

export function TransactionDetailsModal({
  open,
  onOpenChange,
  transaction: basicTransaction,
}: TransactionDetailsModalProps) {
  const { transaction, loading, downloadReceipt } = useTransaction(
    basicTransaction?.id || null
  );

  if (!basicTransaction) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Use detailed transaction data if available, otherwise use basic data
  const displayTransaction = transaction || basicTransaction;
  const hasDetailedData = !!transaction;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-6 [&>button]:hidden">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Transaction Details
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Complete information about this transaction
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
          ) : (
            <>
              {/* Transaction ID with Status Badge */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                  <p className="text-base font-semibold text-gray-900">
                    {displayTransaction.id}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    displayTransaction.status
                  )}`}
                >
                  {displayTransaction.status}
                </span>
              </div>

              {/* User Information */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  User Information
                </h3>
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Name</p>
                    <p className="text-sm font-medium text-gray-900">
                      {displayTransaction.userName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">User Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {displayTransaction.userType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Details */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Transaction Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {displayTransaction.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Amount</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(displayTransaction.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date & Time</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDateTime(displayTransaction.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Payment Gateway</p>
                    <p className="text-sm font-medium text-gray-900">
                      {hasDetailedData && transaction?.paymentGateway
                        ? transaction.paymentGateway
                        : "Paystack"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Gateway Response */}
              {hasDetailedData && transaction && (
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    Gateway Response
                  </h3>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Reference</p>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.gatewayResponse.reference}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Gateway Status</p>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.gatewayResponse.gatewayStatus}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Processing Fee</p>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.gatewayResponse.processingFee}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => onOpenChange(false)}
                  className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-2xl border border-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={downloadReceipt}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-2xl"
                >
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
