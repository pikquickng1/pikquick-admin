"use client";

import { DataTable } from "@/components/ui/data-table";
import { Wallet, WalletListFilters as Filters } from "../types/wallet.types";
import { WalletListFilters } from "./WalletListFilters";

interface WalletListTableProps {
  wallets: Wallet[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  onViewHistory: (id: string) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  activeTab: "requester" | "runner";
  onTabChange: (tab: "requester" | "runner") => void;
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
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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
          {formatCurrency(wallet.currentBalance)}
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
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-3 bg-neutral-200 p-1 m-4">
        <button
          onClick={() => onTabChange("requester")}
          className={`py-4 text-center text-base font-medium transition-colors rounded ${
            activeTab === "requester"
              ? "bg-neutral-200 text-text-primary"
              : "bg-white text-text-primary hover:bg-neutral-50"
          }`}
        >
          Requester Wallets
        </button>
        <button
          onClick={() => onTabChange("runner")}
          className={`py-4 text-center text-base font-medium transition-colors rounded ${
            activeTab === "runner"
              ? "bg-neutral-200 text-text-primary"
              : "bg-white text-text-primary hover:bg-neutral-50"
          }`}
        >
          Runner Wallets
        </button>
      </div>

      <div className="">
        <DataTable
          columns={columns}
          data={wallets}
          keyExtractor={(wallet) => wallet.id}
          selectable
          selectedRows={selectedRows}
          onRowSelect={onRowSelect}
          onSelectAll={onSelectAll}
          emptyMessage="No wallets found"
          filters={<WalletListFilters filters={filters} onFiltersChange={onFiltersChange} />}
        />
      </div>
    </div>
  );
}
