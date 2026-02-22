import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ResetPasswordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    userEmail: string;
    loading?: boolean;
}

export function ResetPasswordModal({
    open,
    onOpenChange,
    onConfirm,
    userEmail,
    loading = false,
}: ResetPasswordModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-8">
                <div className="space-y-6">
                    <div className="space-y-3">
                        <DialogTitle className="text-xl font-semibold text-gray-900">
                            Reset Password
                        </DialogTitle>
                        <p className="text-sm text-gray-600">
                            Send a password reset link to {userEmail}?
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
                            className="px-6 py-2.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-2xl disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send reset link"}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
