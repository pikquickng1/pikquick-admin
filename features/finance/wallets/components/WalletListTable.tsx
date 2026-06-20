"use client";

import { DataTable } from "@/components/ui/data-table";
import { formatNgn } from "@/lib/utils/money";
import { formatDate, formatTime } from "@/lib/utils/date";
import { UserType } from "@/lib/types/enums";
import { statusLabel } from "@/lib/utils/status";
import type { Wallet, WalletListFilters as Filters } from "../types/wallet.types";
import { WalletListFilters } from "./WalletListFilters";

interface WalletListTableProps {
  wallets: Wallet[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewHistory: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  activeTab: UserType;
  onTabChange: (tab: UserType) => void;
}

export function WalletListTable({
  wallets,
  selectedRows,
  onRowSelect,
  onSelectAll,
  onViewHistory,
  filters,
  onFiltersChange,
  activeTab,
  onTabChange,
}: WalletListTableProps) {
  const columns = [
    {
      key: "userId",
      header: "User ID",
      render: (wallet: Wallet) => (
        <span className="text-sm text-text-primary font-medium">{wallet.userId}</span>
      ),
    },
    {
      key: "userName",
      header: "User",
      render: (wallet: Wallet) => (
        <span className="text-sm font-medium text-text-primary">{wallet.userName}</span>
      ),
    },
    {
      key: "currentBalance",
      header: "Current Balance",
      render: (wallet: Wallet) => (
        <span className="text-sm font-medium text-text-primary">
          {formatNgn(wallet.currentBalance)}
        </span>
      ),
    },
    {
      key: "lastTransaction",
      header: "Last Transaction",
      render: (wallet: Wallet) => (
        <div>
          <p className="text-sm text-text-primary">{formatDate(wallet.lastTransaction)}</p>
          <p className="text-xs text-text-secondary">{formatTime(wallet.lastTransaction)}</p>
        </div>
      ),
    },
    {
      key: "totalTransactions",
      header: "Total Transactions",
      render: (wallet: Wallet) => (
        <span className="text-sm text-text-primary">{wallet.totalTransactions}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (wallet: Wallet) => (
        <button
          onClick={() => onViewHistory(wallet.id)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View History
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white rounded border border-light overflow-hidden">
      <div className="grid grid-cols-2 gap-3 bg-neutral-200 p-1 m-4">
        <button
          onClick={() => onTabChange(UserType.CLIENT)}
          className={`py-4 text-center text-base font-medium transition-colors rounded ${
            activeTab === UserType.CLIENT
              ? "bg-neutral-200 text-text-primary"
              : "bg-white text-text-primary hover:bg-neutral-50"
          }`}
        >
          {statusLabel(UserType.CLIENT)} Wallets
        </button>
        <button
          onClick={() => onTabChange(UserType.RUNNER)}
          className={`py-4 text-center text-base font-medium transition-colors rounded ${
            activeTab === UserType.RUNNER
              ? "bg-neutral-200 text-text-primary"
              : "bg-white text-text-primary hover:bg-neutral-50"
          }`}
        >
          {statusLabel(UserType.RUNNER)} Wallets
        </button>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={wallets}
          keyExtractor={(wallet) => wallet.id}
          selectable
          selectedRows={selectedRows}
          onRowSelect={onRowSelect}
          onSelectAll={onSelectAll}
          emptyMessage="No wallets found"
          filters={
            <WalletListFilters filters={filters} onFiltersChange={onFiltersChange} />
          }
        />
      </div>
    </div>
  );
}
