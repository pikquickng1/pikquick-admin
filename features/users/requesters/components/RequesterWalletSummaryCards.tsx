import { RequesterWallet } from "../types/requester.types";

interface RequesterWalletSummaryCardsProps {
  wallet: RequesterWallet;
}

export function RequesterWalletSummaryCards({ wallet }: RequesterWalletSummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Current Balance */}
      <div className="bg-blue-50 rounded-[4px] border border-[#4A85E466] p-6">
        <p className="text-2xl font-semibold text-blue-600 mb-2">
          {formatCurrency(wallet.balance)}
        </p>
        <p className="text-sm text-blue-600">Current Balance</p>
      </div>

      {/* Total Spent */}
      <div className="bg-green-50 rounded-[4px] border border-[#40B86966] p-6">
        <p className="text-2xl font-semibold text-green-600 mb-2">
          {formatCurrency(wallet.totalWithdrawals)}
        </p>
        <p className="text-sm text-green-600">Total Spent</p>
      </div>

      {/* Total Refunds */}
      <div className="bg-purple-50 rounded-[4px] border border-[#7679EC66] p-6">
        <p className="text-2xl font-semibold text-purple-600 mb-2">
          {formatCurrency(wallet.totalDeposits)}
        </p>
        <p className="text-sm text-purple-600">Total Refunds</p>
      </div>
    </div>
  );
}
