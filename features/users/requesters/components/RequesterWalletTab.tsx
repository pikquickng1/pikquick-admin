import { Button } from "@/components/ui/button";
import { RequesterWallet, RequesterTransaction } from "../types/requester.types";
import { RequesterWalletSummaryCards } from "./RequesterWalletSummaryCards";
import { RequesterWalletTransactions } from "./RequesterWalletTransactions";

interface RequesterWalletTabProps {
  wallet: RequesterWallet;
  transactions: RequesterTransaction[];
  onAdjustWallet?: () => void;
}

export function RequesterWalletTab({
  wallet,
  transactions,
  onAdjustWallet,
}: RequesterWalletTabProps) {
  return (
    <div className="space-y-6">
      {/* Wallet Summary Box */}
      <div className="bg-white rounded-2xl border border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Wallet Summary</h2>
          <Button onClick={onAdjustWallet} className="bg-primary-500 hover:bg-primary-600 text-white">
            Adjust Wallet
          </Button>
        </div>
        <RequesterWalletSummaryCards wallet={wallet} />
      </div>

      {/* Recent Transactions Box */}
      <div className="bg-white rounded-2xl border border-light p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Transactions</h3>
        <RequesterWalletTransactions transactions={transactions} />
      </div>
    </div>
  );
}
