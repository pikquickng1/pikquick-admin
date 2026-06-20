"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { adminRoleLabel } from "@/lib/utils/status";
import { ADMIN_ROLE_OPTIONS } from "@/lib/constants/filters";
import type {
  AdminUser,
  AdminUserRoleLabel,
  AdminUserStatusLabel,
} from "../types/user-access.types";

interface EditAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (data: { role: string; status: string }) => void;
  admin: AdminUser | null;
}

const ROLE_OPTIONS = ADMIN_ROLE_OPTIONS.map((o) => ({
  value: adminRoleLabel(o.value),
  label: adminRoleLabel(o.value),
}));

const STATUS_OPTIONS: Array<{ value: AdminUserStatusLabel; label: AdminUserStatusLabel }> = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export function EditAdminModal({
  isOpen,
  onClose,
  onUpdate,
  admin,
}: EditAdminModalProps) {
  if (!admin) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Edit Admin Account
          </DialogTitle>
          <p className="text-sm text-text-secondary mt-1">
            Update role or status for {admin.name}
          </p>
        </DialogHeader>

        <EditAdminForm
          key={admin.id}
          admin={admin}
          onSubmit={(data) => {
            onUpdate(data);
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

interface EditAdminFormProps {
  admin: AdminUser;
  onSubmit: (data: { role: AdminUserRoleLabel; status: AdminUserStatusLabel }) => void;
  onCancel: () => void;
}

function EditAdminForm({ admin, onSubmit, onCancel }: EditAdminFormProps) {
  const [formData, setFormData] = useState<{
    role: AdminUserRoleLabel;
    status: AdminUserStatusLabel;
  }>({
    role: admin.role,
    status: admin.status as AdminUserStatusLabel,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <div>
        <Label htmlFor="role" className="text-sm font-medium text-text-primary mb-2 block">
          Role
        </Label>
        <Select
          id="role"
          value={formData.role}
          options={ROLE_OPTIONS}
          onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminUserRoleLabel })}
        />
      </div>

      <div>
        <Label htmlFor="status" className="text-sm font-medium text-text-primary mb-2 block">
          Status
        </Label>
        <Select
          id="status"
          value={formData.status}
          options={STATUS_OPTIONS}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as AdminUserStatusLabel })}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Update Admin</Button>
      </div>
    </form>
  );
}
