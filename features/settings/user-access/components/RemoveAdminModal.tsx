"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminUser } from "../types/user-access.types";

interface RemoveAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  admin: AdminUser | null;
}

export function RemoveAdminModal({
  isOpen,
  onClose,
  onConfirm,
  admin,
}: RemoveAdminModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!admin) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Remove Admin Account
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <p className="text-sm text-text-secondary">
            Are you sure you want to remove {admin.name}? This action cannot be undone.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded"
          >
            Remove Admin
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
