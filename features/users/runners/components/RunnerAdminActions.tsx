"use client";

import { useState } from "react";
import { Ban, Send, KeyRound, CheckCircle } from "lucide-react";
import { useRunnerActions } from "../hooks/useRunnerActions";
import {
  SuspendAccountModal,
  ActivateAccountModal,
  SendNotificationModal,
  ResetPasswordModal,
} from "@/features/users/requesters";

interface RunnerAdminActionsProps {
  runnerId: string;
  accountStatus: "Available" | "Unavailable" | "Suspended";
  userName: string;
  userEmail: string;
  onActionComplete?: () => void;
}

export function RunnerAdminActions({
  runnerId,
  accountStatus,
  userName,
  userEmail,
  onActionComplete,
}: RunnerAdminActionsProps) {
  const { suspendAccount, activateAccount, resetPassword, sendMessage, loading } =
    useRunnerActions();
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showActivateModal, setShowActivateModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const handleSuspendClick = () => {
    setShowSuspendModal(true);
  };

  const handleActivateClick = () => {
    setShowActivateModal(true);
  };

  const handleSuspendConfirm = async () => {
    const success = await suspendAccount(runnerId);
    if (success) {
      setShowSuspendModal(false);
      if (onActionComplete) {
        onActionComplete();
      }
    }
  };

  const handleActivateConfirm = async () => {
    const success = await activateAccount(runnerId);
    if (success) {
      setShowActivateModal(false);
      if (onActionComplete) {
        onActionComplete();
      }
    }
  };

  const handleResetPasswordClick = () => {
    setShowResetPasswordModal(true);
  };

  const handleResetPasswordConfirm = async () => {
    const success = await resetPassword(runnerId);
    if (success) {
      setShowResetPasswordModal(false);
      if (onActionComplete) {
        onActionComplete();
      }
    }
  };

  const handleSendMessage = () => {
    setShowNotificationModal(true);
  };

  const handleSendMessageConfirm = async (subject: string, message: string) => {
    const success = await sendMessage(runnerId, subject, message);
    if (success) {
      setShowNotificationModal(false);
      if (onActionComplete) {
        onActionComplete();
      }
    }
  };

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-6">Admin Actions</h3>

        <div className="space-y-3">
          {accountStatus === "Suspended" ? (
            <button
              onClick={handleActivateClick}
              disabled={loading}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-50 text-left"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-green-500">Activate Account</span>
            </button>
          ) : (
            <button
              onClick={handleSuspendClick}
              disabled={loading}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-50 text-left"
            >
              <Ban className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-500">Suspend Account</span>
            </button>
          )}

          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-50 text-left"
          >
            <Send className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-medium text-neutral-600">Send Message</span>
          </button>

          <button
            onClick={handleResetPasswordClick}
            disabled={loading}
            className="w-full flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-50 text-left"
          >
            <KeyRound className="w-5 h-5 text-neutral-600" />
            <span className="text-sm font-medium text-neutral-600">Reset Password</span>
          </button>
        </div>
      </div>

      <SuspendAccountModal
        open={showSuspendModal}
        onOpenChange={setShowSuspendModal}
        onConfirm={handleSuspendConfirm}
        loading={loading}
      />

      <ActivateAccountModal
        open={showActivateModal}
        onOpenChange={setShowActivateModal}
        onConfirm={handleActivateConfirm}
        loading={loading}
      />

      <SendNotificationModal
        open={showNotificationModal}
        onOpenChange={setShowNotificationModal}
        onConfirm={handleSendMessageConfirm}
        userName={userName}
        loading={loading}
      />

      <ResetPasswordModal
        open={showResetPasswordModal}
        onOpenChange={setShowResetPasswordModal}
        onConfirm={handleResetPasswordConfirm}
        userEmail={userEmail}
        loading={loading}
      />
    </>
  );
}
