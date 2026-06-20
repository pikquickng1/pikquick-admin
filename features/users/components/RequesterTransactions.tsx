import { RequesterTransaction } from "../requesters/types/requester.types";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { formatDate } from "@/lib/utils/date";

interface RequesterTransactionsProps {
  transactions: RequesterTransaction[];
}

export function RequesterTransactions({ transactions }: RequesterTransactionsProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Transactions</h3>

      {transactions.length === 0 ? (
        <p className="text-sm text-neutral-500 text-center py-8">No transactions yet</p>
      ) : (
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-neutral-100 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">{transaction.description}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{formatDate(transaction.date)}</p>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatNgn(transaction.amount)}
                </p>
                <div className="mt-1">
                  <StatusBadge status={transaction.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
