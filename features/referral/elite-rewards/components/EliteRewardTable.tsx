"use client";

import { Eye } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { EliteReward, EliteRewardFilters as Filters } from "../types/elite-reward.types";
import { EliteRewardFilters } from "./EliteRewardFilters";

interface EliteRewardTableProps {
  rewards: EliteReward[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function EliteRewardTable({
  rewards,
  selectedRows,
  onRowSelect,
  onSelectAll,
  filters,
  onFiltersChange,
}: EliteRewardTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      Pending: "bg-yellow-100 text-yellow-700",
      Approved: "bg-green-100 text-green-700",
      Rejected: "bg-red-100 text-red-700",
    };
    return styles[status as keyof typeof styles] || styles.Pending;
  };

  const getRoleBadge = (role: string) => {
    return role === "Runner" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700";
  };

  const columns = [
    {
      key: "user",
      header: "USER",
      render: (reward: EliteReward) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
              {reward.user.charAt(0)}
            </span>
          </div>
          <span className="text-sm font-medium text-text-primary">{reward.user}</span>
        </div>
      ),
    },
    {
      key: "role",
      header: "ROLE",
      render: (reward: EliteReward) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium uppercase ${getRoleBadge(
            reward.role
          )}`}
        >
          {reward.role}
        </span>
      ),
    },
    {
      key: "referralsCount",
      header: "REFERRALS COUNT",
      render: (reward: EliteReward) => (
        <span className="text-sm text-text-primary">{reward.referralsCount}</span>
      ),
    },
    {
      key: "monthAchieved",
      header: "MONTH ACHIEVED",
      render: (reward: EliteReward) => (
        <span className="text-sm text-text-primary">{reward.monthAchieved}</span>
      ),
    },
    {
      key: "rewardAmount",
      header: "REWARD AMOUNT",
      render: (reward: EliteReward) => (
        <span className="text-sm font-medium text-text-primary">
          {formatCurrency(reward.rewardAmount)}
        </span>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (reward: EliteReward) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
            reward.status
          )}`}
        >
          {reward.status}
        </span>
      ),
    },
    {
      key: "action",
      header: "ACTIONS",
      render: (reward: EliteReward) => (
        <button
          onClick={() => {
            window.location.href = `/dashboard/referral/elite-rewards/${reward.id}`;
          }}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4 text-text-secondary" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <DataTable
        columns={columns}
        data={rewards}
        keyExtractor={(reward) => reward.id}
        
        onRowSelect={onRowSelect}
        onSelectAll={onSelectAll}
        emptyMessage="No elite rewards found"
        filters={<EliteRewardFilters filters={filters} onFiltersChange={onFiltersChange} />}
      />
    </div>
  );
}
