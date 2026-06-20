"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { AdminUser } from "../types/user-access.types";

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
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            Remove Admin
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
