"use client";

import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/ui/data-table";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatNgn } from "@/lib/utils/money";
import { UserType, ReferralRewardStatus } from "@/lib/types/enums";
import { referralRewardLabel } from "@/lib/utils/status";
import type {
  EliteReward,
  EliteRewardFilters as Filters,
} from "../types/elite-reward.types";
import { EliteRewardFilters } from "./EliteRewardFilters";

interface EliteRewardTableProps {
  rewards: EliteReward[];
  selectedRows: string[];
  onRowSelect: (id: string) => void;
  onSelectAll: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const ELITE_REWARDS_ROUTE = "/dashboard/referral/elite-rewards";

export function EliteRewardTable({
  rewards,
  onRowSelect,
  onSelectAll,
  filters,
  onFiltersChange,
}: EliteRewardTableProps) {
  const router = useRouter();

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
          className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-medium uppercase ${
            reward.role === UserType.RUNNER
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
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
          {formatNgn(reward.rewardAmount)}
        </span>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (reward: EliteReward) => (
        <StatusBadge
          status={reward.status}
          label={referralRewardLabel(reward.status)}
        />
      ),
    },
    {
      key: "action",
      header: "ACTIONS",
      render: (reward: EliteReward) => (
        <button
          onClick={() => router.push(`${ELITE_REWARDS_ROUTE}/${reward.id}`)}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          aria-label={`View details for ${reward.user}`}
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
        selectedRows={selectedRows}
        onRowSelect={onRowSelect}
        onSelectAll={onSelectAll}
        emptyMessage="No elite rewards found"
        filters={
          <EliteRewardFilters
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
        }
      />
    </div>
  );
}

export const __referralRewardStatus = ReferralRewardStatus;
