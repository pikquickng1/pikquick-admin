"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { AdminRole } from "@/lib/types/enums";
import { adminRoleLabel } from "@/lib/utils/status";
import { ADMIN_ROLE_OPTIONS } from "@/lib/constants/filters";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => void;
}

const ROLE_OPTIONS = ADMIN_ROLE_OPTIONS.map((o) => ({
  value: adminRoleLabel(o.value),
  label: adminRoleLabel(o.value),
}));

const DEFAULT_ROLE = adminRoleLabel(AdminRole.SUPPORT_ADMIN);

export function AddAdminModal({ isOpen, onClose, onSave }: AddAdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: DEFAULT_ROLE,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", email: "", password: "", role: DEFAULT_ROLE });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Add New Admin
          </DialogTitle>
          <p className="text-sm text-text-secondary mt-1">
            Create a new admin account with specific role and permissions
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-text-primary mb-2 block">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full text-black"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-text-primary mb-2 block">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@pikquick.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full text-black"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium text-text-primary mb-2 block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full text-black"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-sm font-medium text-text-primary mb-2 block">
              Role
            </Label>
            <Select
              id="role"
              value={formData.role}
              options={ROLE_OPTIONS}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
