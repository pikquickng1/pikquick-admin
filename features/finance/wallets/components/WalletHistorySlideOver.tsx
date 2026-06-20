"use client";

import { X, Download, Wallet } from "lucide-react";
import { WalletTxBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { formatDate, formatTime } from "@/lib/utils/date";
import { WalletTxType } from "@/lib/types/enums";
import { useTransactionHistory } from "../hooks/useTransactionHistory";

interface WalletHistorySlideOverProps {
  open: boolean;
  onClose: () => void;
  walletId: string | null;
}

const SLIDE_OVER_MAX_WIDTH = "w-full max-w-2xl" as const;
const BACKDROP_OPACITY = "bg-black/30" as const;

export function WalletHistorySlideOver({ open, onClose, walletId }: WalletHistorySlideOverProps) {
  const { history, loading } = useTransactionHistory(walletId);

  if (!open) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity ${BACKDROP_OPACITY}`}
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 right-0 ${SLIDE_OVER_MAX_WIDTH} bg-white shadow-xl z-50 overflow-hidden flex flex-col animate-slide-in-right`}
      >
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
                onClick={() => {
                  /* TODO: wire download endpoint once available */
                }}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Download history"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {history && (
          <div className="border-b border-neutral-200">
            <div className="mx-6 my-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 mb-1">Current Balance</p>
                  <p className="text-2xl font-semibold text-blue-700">
                    {formatNgn(history.currentBalance)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600 mb-1">Total Transactions</p>
                  <p className="text-2xl font-semibold text-blue-700">
                    {history.totalTransactions}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {history?.transactions.map((transaction) => (
                <div key={transaction.id} className="p-4 rounded-lg bg-neutral-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === WalletTxType.CREDIT
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <Wallet
                          className={`w-5 h-5 ${
                            transaction.type === WalletTxType.CREDIT
                              ? "text-green-600"
                              : "text-red-600"
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
                        className={`text-base font-semibold ${
                          transaction.type === WalletTxType.CREDIT
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === WalletTxType.CREDIT ? "+" : "-"}
                        {formatNgn(transaction.amount)}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        Balance: {formatNgn(transaction.balance)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <WalletTxBadge status={transaction.type} />
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
