import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { RunnerWallet, RunnerTransaction } from "../types/runner.types";

interface RunnerWalletTabProps {
  wallet: RunnerWallet;
  recentTransactions?: RunnerTransaction[];
  onAdjustWallet?: () => void;
}

export function RunnerWalletTab({
  wallet,
  recentTransactions = [],
  onAdjustWallet,
}: RunnerWalletTabProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Map backend transactions to table rows
  const payments: RunnerTransaction[] = recentTransactions.map((tx) => ({
    ...tx,
    date: new Date(tx.date).toLocaleDateString(),
    amount: tx.amount,
    status:
      (tx.status ?? "").toString().toLowerCase() === "completed" ||
      (tx.status ?? "").toString().toLowerCase() === "paid"
        ? "completed"
        : "pending",
    type: tx.type ?? "credit",
    description: tx.description ?? "",
  }));

  const lastPaymentDate = payments.length > 0 ? payments[0].date : "-";

  const columns = [
    {
      key: "date",
      header: "Date",
      render: (payment: RunnerTransaction) => (
        <span className="text-sm text-text-primary">{payment.date}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (payment: RunnerTransaction) => (
        <span className="text-sm text-text-primary">₦{payment.amount}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (payment: RunnerTransaction) => {
        const displayStatus =
          payment.status === "completed"
            ? "Paid"
            : payment.status === "pending"
              ? "Pending"
              : "Failed";
        return (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${payment.status === "completed" ? "bg-green-100 text-green-700" : payment.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
            {displayStatus}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      {/* Wallet Summary Box */}
      <div className="bg-white rounded-2xl border border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            Wallet Summary
          </h2>
          <Button
            onClick={onAdjustWallet}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            Adjust Wallet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-[4px] border border-[#4A85E466] p-6">
            <p className="text-2xl font-semibold text-blue-600 mb-2">
              {formatCurrency(wallet.balance)}
            </p>
            <p className="text-sm text-blue-600">Current Balance</p>
          </div>

          <div className="bg-green-50 rounded-[4px] border border-[#40B86966] p-6">
            <p className="text-2xl font-semibold text-green-600 mb-2">
              {formatCurrency(wallet.totalEarnings)}
            </p>
            <p className="text-sm text-green-600">Total Earned</p>
          </div>

          <div className="bg-orange-50 rounded-[4px] border border-[#F5B54666] p-6">
            <p className="text-2xl font-semibold text-orange-500 mb-2">
              {formatCurrency(wallet.pendingAmount)}
            </p>
            <p className="text-sm text-orange-500">Pending Payouts</p>
          </div>
        </div>
      </div>

      {/* Daily Payment Summary */}
      <div className="bg-white rounded-2xl border border-light p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Daily Payment Summary
        </h3>

        <div className="bg-green-50 rounded-[4px] border border-[#40B86966] p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600 mb-1">
                Current Status
              </p>
              <p className="text-sm text-green-600">
                Last payment: {lastPaymentDate}
              </p>
            </div>
            <span className="px-2 py-1 rounded-[24px] text-[12px] font-small bg-green-500 text-white">
              Paid Today
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={payments}
          keyExtractor={(payment) => payment.id}
          emptyMessage="No payment records found"
        />
      </div>
    </div>
  );
}
