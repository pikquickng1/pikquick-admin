"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { LoadingState } from "@/components/ui/loading-state";
import { DEFAULT_PAGE } from "@/lib/config/pagination";
import { useKYCList } from "../hooks/useKYCList";
import { useKYCStats } from "../hooks/useKYCStats";
import { KYCDetailsSlideOver } from "./KYCDetailsSlideOver";
import type { KYCListFilters, KYCVerification, KycTab } from "../types/kyc.types";

const TAB_PENDING: KycTab = "pending";
const TAB_RESUBMISSION: KycTab = "resubmission";

const TAB_COUNT_BADGE_CLASS = {
  pending: "text-yellow-800 bg-yellow-100",
  resubmission: "text-red-800 bg-red-100",
} as const;

export function KYCVerificationList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [activeTab, setActiveTab] = useState<KycTab>(TAB_PENDING);
  const [filters] = useState<KYCListFilters>({ search: "" });
  const [selectedVerificationId, setSelectedVerificationId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { verifications, loading, pagination, refetch } = useKYCList(
    activeTab,
    filters,
    currentPage,
  );
  const { stats, refetch: refetchStats } = useKYCStats();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedRows.length === verifications.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(verifications.map((v) => v.id));
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedVerificationId(id);
    setIsDetailsOpen(true);
  };

  const handleActionComplete = () => {
    refetch();
    refetchStats();
  };

  const handleTabChange = (tab: KycTab) => {
    setActiveTab(tab);
    setCurrentPage(DEFAULT_PAGE);
    setSelectedRows([]);
  };

  const columns = [
    {
      key: "runnerName",
      header: "Runner Name",
      render: (v: KYCVerification) => (
        <span className="text-sm font-medium text-text-primary">{v.runnerName}</span>
      ),
    },
    {
      key: "idType",
      header: "ID Type",
      render: (v: KYCVerification) => (
        <span className="text-sm text-text-primary">{v.idType}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (v: KYCVerification) => (
        <span className="text-sm text-text-primary">{v.email}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (v: KYCVerification) => (
        <span className="text-sm text-text-primary">{v.phone}</span>
      ),
    },
    {
      key: "dateSubmitted",
      header: "Date Submitted",
      render: (v: KYCVerification) => (
        <span className="text-sm text-text-primary">
          {new Date(v.dateSubmitted).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (v: KYCVerification) => (
        <button
          onClick={() => handleViewDetails(v.id)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  if (loading) {
    return <LoadingState label="Loading KYC verifications..." />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">KYC Verification</h1>

      <div className="bg-white rounded border border-light overflow-hidden">
        <div className="grid grid-cols-2 gap-3 bg-neutral-200 p-1 m-4">
          <TabButton
            label="Pending Verifications"
            count={stats.pendingVerifications}
            countClass={TAB_COUNT_BADGE_CLASS.pending}
            active={activeTab === TAB_PENDING}
            onClick={() => handleTabChange(TAB_PENDING)}
          />
          <TabButton
            label="Resubmission Request"
            count={stats.resubmissionRequests}
            countClass={TAB_COUNT_BADGE_CLASS.resubmission}
            active={activeTab === TAB_RESUBMISSION}
            onClick={() => handleTabChange(TAB_RESUBMISSION)}
          />
        </div>

        <div>
          <DataTable
            columns={columns}
            data={verifications}
            keyExtractor={(verification) => verification.id}
            selectable
            selectedRows={selectedRows}
            onRowSelect={toggleRow}
            onSelectAll={toggleAll}
            emptyMessage="No KYC verifications found"
          />
        </div>
      </div>

      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={setCurrentPage}
        showingFrom={(pagination.currentPage - 1) * pagination.itemsPerPage + 1}
        showingTo={Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
        totalItems={pagination.totalItems}
      />

      <KYCDetailsSlideOver
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        verificationId={selectedVerificationId}
        onActionComplete={handleActionComplete}
        isResubmission={activeTab === TAB_RESUBMISSION}
      />
    </div>
  );
}

function TabButton({
  label,
  count,
  countClass,
  active,
  onClick,
}: {
  label: string;
  count: number;
  countClass: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-4 text-center text-base font-medium transition-colors rounded ${
        active
          ? "bg-neutral-200 text-text-primary"
          : "bg-white text-text-primary hover:bg-neutral-50"
      }`}
    >
      {label}
      {count > 0 && (
        <span
          className={`ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold rounded-full ${countClass}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
