"use client";

import { X, Download, Wallet } from "lucide-react";
import { useTransactionHistory } from "../hooks/useTransactionHistory";

interface WalletHistorySlideOverProps {
  open: boolean;
  onClose: () => void;
  walletId: string | null;
}

export function WalletHistorySlideOver({ open, onClose, walletId }: WalletHistorySlideOverProps) {
  const { history, loading } = useTransactionHistory(walletId);

  if (!open) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <>
      {/* Backdrop with opacity */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide Over Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-xl z-50 overflow-hidden flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Wallet Transaction History
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Transaction history for {history?.userName || "User"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => console.log("Download history")}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Balance Summary with top and bottom borders */}
        {history && (
          <div className="border-b border-neutral-200">
            <div className="mx-6 my-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 mb-1">Current Balance</p>
                  <p className="text-2xl font-semibold text-blue-700">
                    {formatCurrency(history.currentBalance)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600 mb-1">Total Transactions</p>
                  <p className="text-2xl font-semibold text-blue-700">{history.totalTransactions}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {history?.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="p-4 rounded-lg bg-neutral-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                          }`}
                      >
                        <Wallet
                          className={`w-5 h-5 ${transaction.type === "credit" ? "text-green-600" : "text-red-600"
                            }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-text-secondary mt-1">
                          {formatDate(transaction.date)} {formatTime(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-base font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        Balance: {formatCurrency(transaction.balance)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="inline-block px-3 py-1 text-xs text-text-secondary bg-white rounded-lg border border-[#0000001A]">
                      {transaction.type === "credit" ? "Credit" : "Debit"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
