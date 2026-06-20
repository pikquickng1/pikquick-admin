import * as React from "react";

import { cn } from "@/lib/utils";

const SPINNER_CLASSES =
  "w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4";

interface LoadingStateProps {
  label?: string;
  className?: string;
  minHeight?: string;
}

export function LoadingState({
  label = "Loading...",
  className,
  minHeight = "min-h-[400px]",
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        minHeight,
        className,
      )}
    >
      <div className="text-center">
        <div className={SPINNER_CLASSES} />
        <p className="text-sm text-neutral-500">{label}</p>
      </div>
    </div>
  );
}
