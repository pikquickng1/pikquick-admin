import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
  minHeight?: string;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
  className,
  minHeight = "min-h-[400px]",
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center",
        minHeight,
        className,
      )}
    >
      <div className="text-center">
        <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <p className="text-sm text-neutral-600 mb-4 max-w-xs">{message}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );
}
