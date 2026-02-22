import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ActivateAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function ActivateAccountModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: ActivateAccountModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Activate Account
            </DialogTitle>
            <p className="text-sm text-gray-600">
              Are you sure you want to activate this account? The user will regain full access.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-2xl border border-light disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-2xl disabled:opacity-50"
            >
              {loading ? "Activating..." : "Activate"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
