"use client";

import { X } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export function AddAdminModal({ isOpen, onClose, onSave }: AddAdminModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Support Admin",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: "", email: "", password: "", role: "Support Admin" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Add New Admin
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Create a new admin account with specific role and permissions
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-sm font-medium text-text-primary mb-2 block">
              Role
            </Label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded text-sm text-text-primary"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Finance Admin">Finance Admin</option>
              <option value="Support Admin">Support Admin</option>
              <option value="Operations Admin">Operations Admin</option>
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
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
