"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Phone, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRequester } from "../hooks/useRequester";
import { RequesterPersonalInfo } from "./RequesterPersonalInfo";
import { RequesterAdminActions } from "./RequesterAdminActions";
import { RequesterWalletTab } from "./RequesterWalletTab";
import { RequesterTaskHistoryTab } from "./RequesterTaskHistoryTab";
import { RequesterPaymentsTab } from "./RequesterPaymentsTab";
import { RequesterDetailsSkeleton } from "./RequesterDetailsSkeleton";
import { AdjustWalletModal } from "./AdjustWalletModal";
import { useRequesterActions } from "../hooks/useRequesterActions";

interface RequesterDetailsProps {
  requesterId: string;
  onBack?: () => void;
}

type TabType = "overview" | "wallet" | "taskHistory" | "payments";

export function RequesterDetails({ requesterId, onBack }: RequesterDetailsProps) {
  const { requester, wallet, transactions, taskHistory, payments, loading, error, refetch } =
    useRequester(requesterId);
  const { adjustWallet, loading: actionLoading } = useRequesterActions();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showAdjustWalletModal, setShowAdjustWalletModal] = useState(false);

  const handleAdjustWallet = () => {
    setShowAdjustWalletModal(true);
  };

  const handleAdjustWalletConfirm = async (type: "debit" | "credit", amount: number) => {
    const success = await adjustWallet(requesterId, type, amount);
    if (success) {
      setShowAdjustWalletModal(false);
      refetch();
    }
  };

  if (loading) {
    return <RequesterDetailsSkeleton />;
  }

  if (error || !requester || !wallet) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-red-500">{error || "Failed to load requester details"}</p>
          <Button onClick={onBack} variant="outline" className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-neutral-600 hover:text-text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-light p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="bg-primary-500 text-white text-xl">
                {getInitials(requester.name)}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl font-semibold text-text-primary">{requester.name}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-text-primary">{requester.id}</span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${requester.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {requester.status}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {requester.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  {requester.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  Joined{" "}
                  {new Date(requester.joinedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-light p-2 text-text-primary">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${activeTab === "overview" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
              }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${activeTab === "wallet" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
              }`}
          >
            Wallet
          </button>
          <button
            onClick={() => setActiveTab("taskHistory")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${activeTab === "taskHistory" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
              }`}
          >
            Task History
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${activeTab === "payments" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
              }`}
          >
            Payments
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column - Personal Info (takes 2 columns) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-light p-6">
            <RequesterPersonalInfo requester={requester} />
          </div>

          {/* Right Column - Admin Actions (takes 1 column) */}
          <div className="bg-white rounded-2xl border border-light p-6">
            <RequesterAdminActions
              requesterId={requesterId}
              accountStatus={requester.status}
              userName={requester.name}
              userEmail={requester.email}
              onActionComplete={refetch}
            />
          </div>
        </div>
      )}

      {activeTab === "wallet" && (
        <RequesterWalletTab
          wallet={wallet}
          transactions={transactions}
          onAdjustWallet={handleAdjustWallet}
        />
      )}

      {activeTab === "taskHistory" && <RequesterTaskHistoryTab tasks={taskHistory} />}

      {activeTab === "payments" && <RequesterPaymentsTab payments={payments} />}

      <AdjustWalletModal
        open={showAdjustWalletModal}
        onOpenChange={setShowAdjustWalletModal}
        onConfirm={handleAdjustWalletConfirm}
        loading={actionLoading}
      />
    </div>
  );
}
