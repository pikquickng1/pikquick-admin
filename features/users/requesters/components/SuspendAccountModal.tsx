import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SuspendAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function SuspendAccountModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: SuspendAccountModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Suspend Account
            </DialogTitle>
            <p className="text-sm text-gray-600">
              Are you sure you want to suspend this account? The user will not be able to access their account or post tasks.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="px-6 py-2 text-sm border border-light font-medium rounded-2xl text-gray-700 hover:text-gray-900 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-2xl disabled:opacity-50"
            >
              {loading ? "Suspending..." : "Suspend"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
