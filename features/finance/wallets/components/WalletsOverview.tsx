"use client";

import { useState } from "react";
import { Wallet as WalletIcon, Users } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useWalletList } from "../hooks/useWalletList";
import { useWalletStats } from "../hooks/useWalletStats";
import { WalletListTable } from "./WalletListTable";
import { WalletHistorySlideOver } from "./WalletHistorySlideOver";
import { WalletListFilters as Filters } from "../types/wallet.types";

export function WalletsOverview() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"requester" | "runner">("requester");
  const [filters, setFilters] = useState<Filters>({
    search: "",
  });
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const { wallets, loading, pagination } = useWalletList(activeTab, filters, currentPage);
  const { stats } = useWalletStats();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === wallets.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(wallets.map((w) => w.id));
    }
  };

  const handleViewHistory = (id: string) => {
    setSelectedWalletId(id);
    setIsHistoryOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading wallets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Wallets Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">
                {formatCurrency(stats.totalRequesterBalance)}
              </p>
              <p className="text-sm text-text-secondary">Total Requester Balance</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">
                {formatCurrency(stats.totalRunnerBalance)}
              </p>
              <p className="text-sm text-text-secondary">Total Runner Balance</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <WalletIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded border border-neutral-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold text-text-primary mb-1">{stats.totalWallets}</p>
              <p className="text-sm text-text-secondary">Total Wallets</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Wallets Table with Tabs */}
      <WalletListTable
        wallets={wallets}
        selectedRows={selectedRows}
        onRowSelect={toggleRow}
        onSelectAll={toggleAll}
        onViewHistory={handleViewHistory}
        filters={filters}
        onFiltersChange={setFilters}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setCurrentPage(1);
          setSelectedRows([]);
        }}
      />

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        showingFrom={(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
        showingTo={Math.min(
          pagination.currentPage * pagination.itemsPerPage,
          pagination.totalItems
        )}
        totalItems={pagination.totalItems}
      />

      {/* Transaction History Slide Over */}
      <WalletHistorySlideOver
        open={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        walletId={selectedWalletId}
      />
    </div>
  );
}
