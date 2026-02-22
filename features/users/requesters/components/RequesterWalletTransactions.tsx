import { DataTable } from "@/components/ui/data-table";
import { RequesterTransaction } from "../types/requester.types";

interface RequesterWalletTransactionsProps {
  transactions: RequesterTransaction[];
}

export function RequesterWalletTransactions({ transactions }: RequesterWalletTransactionsProps) {
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
      month: "2-digit",
      day: "2-digit",
    });
  };

  const columns = [
    {
      key: "date",
      header: "Date",
      render: (transaction: RequesterTransaction) => (
        <span className="text-sm text-text-primary">{formatDate(transaction.date)}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (transaction: RequesterTransaction) => (
        <span className="text-sm text-text-secondary">{transaction.description}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (transaction: RequesterTransaction) => (
        <span
          className={`text-sm font-medium ${
            transaction.type === "debit" ? "text-red-500" : "text-text-primary"
          }`}
        >
          {transaction.type === "debit" ? "-" : ""}
          {formatCurrency(transaction.amount)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (transaction: RequesterTransaction) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            transaction.status === "completed"
              ? "bg-green-100 text-green-700"
              : transaction.status === "pending"
              ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
      keyExtractor={(transaction) => transaction.id}
      emptyMessage="No transactions found"
    />
  );
}
