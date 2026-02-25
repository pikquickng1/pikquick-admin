import { RequesterTransaction } from "../requesters/types/requester.types";

interface RequesterTransactionsProps {
  transactions: RequesterTransaction[];
}

export function RequesterTransactions({ transactions }: RequesterTransactionsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
                  className={`text-sm font-semibold ${transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </p>
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1 ${transaction.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : transaction.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
