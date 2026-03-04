"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AdminUser } from "../types/user-access.types";

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: { role: string; status: string }) => void;
  admin: AdminUser | null;
}

export function EditAdminModal({
  isOpen,
  onClose,
  onUpdate,
  admin,
}: EditAdminModalProps) {
  const [formData, setFormData] = useState<{
    role: "Super Admin" | "Finance Admin" | "Support Admin" | "Operations Admin";
    status: "Active" | "Inactive";
  }>({
    role: admin?.role || "Super Admin",
    status: admin?.status || "Active",
  });

  useEffect(() => {
    if (admin) {
      setFormData({
        role: admin.role,
        status: admin.status,
      });
    }
  }, [admin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  if (!admin) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Edit Admin Account
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Update role or status for {admin.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="role" className="text-sm font-medium text-text-primary mb-2 block">
              Role
            </Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value as
                    | "Super Admin"
                    | "Finance Admin"
                    | "Support Admin"
                    | "Operations Admin",
                })
              }
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Finance Admin">Finance Admin</option>
              <option value="Support Admin">Support Admin</option>
              <option value="Operations Admin">Operations Admin</option>
            </select>
          </div>

          <div>
            <Label htmlFor="status" className="text-sm font-medium text-text-primary mb-2 block">
              Status
            </Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "Active" | "Inactive",
                })
              }
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              Update Admin
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
