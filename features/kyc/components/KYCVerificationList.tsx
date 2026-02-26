"use client";

import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { useKYCList } from "../hooks/useKYCList";
import { useKYCStats } from "../hooks/useKYCStats";
import { KYCVerification, KYCListFilters } from "../types/kyc.types";
import { KYCDetailsSlideOver } from "./KYCDetailsSlideOver";

export function KYCVerificationList() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"pending" | "resubmission">("pending");
  const [filters, setFilters] = useState<KYCListFilters>({
    search: "",
  });
  const [selectedVerificationId, setSelectedVerificationId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { verifications, loading, pagination, refetch } = useKYCList(activeTab, filters, currentPage);
  const { stats, refetch: refetchStats } = useKYCStats();

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      key: "runnerName",
      header: "Runner Name",
      render: (verification: KYCVerification) => (
        <span className="text-sm font-medium text-text-primary">{verification.runnerName}</span>
      ),
    },
    {
      key: "idType",
      header: "ID Type",
      render: (verification: KYCVerification) => (
        <span className="text-sm text-text-primary">{verification.idType}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (verification: KYCVerification) => (
        <span className="text-sm text-text-primary">{verification.email}</span>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      render: (verification: KYCVerification) => (
        <span className="text-sm text-text-primary">{verification.phone}</span>
      ),
    },
    {
      key: "dateSubmitted",
      header: "Date Submitted",
      render: (verification: KYCVerification) => (
        <span className="text-sm text-text-primary">{formatDate(verification.dateSubmitted)}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (verification: KYCVerification) => (
        <button
          onClick={() => handleViewDetails(verification.id)}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium"
        >
          View Details
        </button>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading KYC verifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">KYC Verification</h1>

      {/* Tabs with Counts */}
      <div className="bg-white rounded border border-light overflow-hidden">
        <div className="grid grid-cols-2 gap-3 bg-neutral-200 p-1 m-4">
          <button
            onClick={() => {
              setActiveTab("pending");
              setCurrentPage(1);
              setSelectedRows([]);
            }}
            className={`py-4 text-center text-base font-medium transition-colors rounded ${activeTab === "pending"
              ? "bg-neutral-200 text-text-primary"
              : "bg-white text-text-primary hover:bg-neutral-50"
              }`}
          >
            Pending Verifications
            {stats.pendingVerifications > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
                {stats.pendingVerifications}
              </span>
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab("resubmission");
              setCurrentPage(1);
              setSelectedRows([]);
            }}
            className={`py-4 text-center text-base font-medium transition-colors rounded ${activeTab === "resubmission"
              ? "bg-neutral-200 text-text-primary"
              : "bg-white text-text-primary hover:bg-neutral-50"
              }`}
          >
            Resubmission Request
            {stats.resubmissionRequests > 0 && (
              <span className="ml-2 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                {stats.resubmissionRequests}
              </span>
            )}
          </button>
        </div>

        <div className="">
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
        showingTo={Math.min(
          pagination.currentPage * pagination.itemsPerPage,
          pagination.totalItems
        )}
        totalItems={pagination.totalItems}
      />

      {/* KYC Details Slide Over */}
      <KYCDetailsSlideOver
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        verificationId={selectedVerificationId}
        onActionComplete={handleActionComplete}
        isResubmission={activeTab === "resubmission"}
      />
    </div>
  );
}
