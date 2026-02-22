"use client";

import { useState } from "react";
import { requesterApi } from "../api/requesterApi";

export function useRequesterActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suspendAccount = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await requesterApi.suspendRequester(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to suspend account");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const activateAccount = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await requesterApi.activateRequester(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to activate account");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const adjustWallet = async (id: string, type: "debit" | "credit", amount: number) => {
    try {
      setLoading(true);
      setError(null);
      await requesterApi.adjustWallet(id, type, amount);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to adjust wallet");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await requesterApi.resetPassword(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (id: string, subject: string, message: string) => {
    try {
      setLoading(true);
      setError(null);
      await requesterApi.sendMessage(id, subject, message);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    suspendAccount,
    activateAccount,
    adjustWallet,
    resetPassword,
    sendMessage,
    loading,
    error,
  };
}
