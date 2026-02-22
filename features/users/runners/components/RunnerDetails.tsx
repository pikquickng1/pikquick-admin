"use client";

import { useState } from "react";
import { ArrowLeft, Mail, Phone, Calendar, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRunner } from "../hooks/useRunner";
import { RunnerPersonalInfo } from "./RunnerPersonalInfo";
import { RunnerAvailabilityPerformance } from "./RunnerAvailabilityPerformance";
import { RunnerAdminActions } from "./RunnerAdminActions";
import { RunnerKYCTab } from "./RunnerKYCTab";
import { RunnerWalletTab } from "./RunnerWalletTab";
import { RunnerRatingTab } from "./RunnerRatingTab";
import { RunnerTaskRecordsTab } from "./RunnerTaskRecordsTab";
import { AdjustWalletModal } from "@/features/users/requesters";
import { useRunnerActions } from "../hooks/useRunnerActions";

interface RunnerDetailsProps {
  runnerId: string;
  onBack?: () => void;
}

type TabType = "profile" | "kyc" | "wallet" | "rating" | "taskRecords";

export function RunnerDetails({ runnerId, onBack }: RunnerDetailsProps) {
  const { runner, wallet, transactions, taskHistory, loading, error, refetch } = useRunner(runnerId);
  const { adjustWallet, loading: actionLoading } = useRunnerActions();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [showAdjustWalletModal, setShowAdjustWalletModal] = useState(false);

  const handleAdjustWallet = () => {
    setShowAdjustWalletModal(true);
  };

  const handleAdjustWalletConfirm = async (type: "debit" | "credit", amount: number) => {
    const success = await adjustWallet(runnerId, type, amount);
    if (success) {
      setShowAdjustWalletModal(false);
      refetch();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading runner details...</p>
        </div>
      </div>
    );
  }

  if (error || !runner || !wallet) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-sm text-red-500">{error || "Failed to load runner details"}</p>
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
        <div className="flex items-start gap-4">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="bg-primary-500 text-white text-2xl">
              {getInitials(runner.name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-semibold text-text-primary">{runner.name}</h1>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-600">
                Verified
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </span>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700">
                {runner.id}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-600">
                🏍️ Motorcycle
              </span>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-text-primary">
                {runner.rating}({runner.totalReviews} tasks)
              </span>
              <span className="mx-2 text-gray-300">•</span>
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-text-primary">{runner.tasksCompleted} completed</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {runner.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {runner.phone}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Joined{" "}
                {new Date(runner.joinedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl border border-light p-2 text-text-primary">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${
              activeTab === "profile" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab("kyc")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${
              activeTab === "kyc" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
            }`}
          >
            KYC Verification
          </button>
          <button
            onClick={() => setActiveTab("wallet")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${
              activeTab === "wallet" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
            }`}
          >
            Wallet
          </button>
          <button
            onClick={() => setActiveTab("rating")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${
              activeTab === "rating" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
            }`}
          >
            Rating & Review
          </button>
          <button
            onClick={() => setActiveTab("taskRecords")}
            className={`px-4 py-2 text-sm font-medium rounded-[4px] ${
              activeTab === "taskRecords" ? "bg-primary-50 text-primary-500" : "hover:bg-neutral-50"
            }`}
          >
            Task Records
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-light p-6">
            <RunnerPersonalInfo runner={runner} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-light p-6">
              <RunnerAvailabilityPerformance runner={runner} />
            </div>

            <div className="bg-white rounded-2xl border border-light p-6">
              <RunnerAdminActions
                runnerId={runnerId}
                accountStatus={runner.status}
                userName={runner.name}
                userEmail={runner.email}
                onActionComplete={refetch}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "wallet" && (
        <RunnerWalletTab wallet={wallet} onAdjustWallet={handleAdjustWallet} />
      )}

      {activeTab === "kyc" && <RunnerKYCTab />}

      {activeTab === "rating" && <RunnerRatingTab />}

      {activeTab === "taskRecords" && <RunnerTaskRecordsTab tasks={taskHistory} />}

      <AdjustWalletModal
        open={showAdjustWalletModal}
        onOpenChange={setShowAdjustWalletModal}
        onConfirm={handleAdjustWalletConfirm}
        loading={actionLoading}
      />
    </div>
  );
}
