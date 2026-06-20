import * as React from "react";

import { cn } from "@/lib/utils";
import {
  STATUS_BADGE_CLASS,
  statusBadgeClass,
  statusLabel,
  StatusTone,
  walletStatusClass,
  walletStatusLabel,
  walletTxClass,
  walletTxLabel,
} from "@/lib/utils/status";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Raw backend or UI status string. */
  status?: string | null;
  /** Override the displayed label. Defaults to statusLabel(status). */
  label?: string;
  /** Override the tone key — bypasses statusTone(). */
  tone?: StatusTone;
  /** Explicit Tailwind class string (overrides tone). */
  className?: string;
}

export function StatusBadge({
  status,
  label,
  tone,
  className,
  ...rest
}: StatusBadgeProps) {
  const toneClass = tone
    ? STATUS_BADGE_CLASS[tone]
    : status
      ? statusBadgeClass(status)
      : STATUS_BADGE_CLASS.neutral;
  const text = label ?? (status ? statusLabel(status) : "—");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClass,
        className,
      )}
      {...rest}
    >
      {text}
    </span>
  );
}

interface WalletStatusBadgeProps extends Omit<StatusBadgeProps, "tone" | "label"> {
  label?: string;
}

export function WalletStatusBadge({
  status,
  label,
  className,
  ...rest
}: WalletStatusBadgeProps) {
  const text = label ?? (status ? walletStatusLabel(status) : "—");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status ? walletStatusClass(status) : STATUS_BADGE_CLASS.neutral,
        className,
      )}
      {...rest}
    >
      {text}
    </span>
  );
}

interface WalletTxBadgeProps extends Omit<StatusBadgeProps, "tone" | "label"> {
  label?: string;
}

export function WalletTxBadge({
  status,
  label,
  className,
  ...rest
}: WalletTxBadgeProps) {
  const text = label ?? (status ? walletTxLabel(status) : "—");
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        status ? walletTxClass(status) : STATUS_BADGE_CLASS.neutral,
        className,
      )}
      {...rest}
    >
      {text}
    </span>
  );
}
