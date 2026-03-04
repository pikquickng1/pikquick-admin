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

interface Permission {
  module: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
  configure: boolean;
}

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; permissions: Permission[] }) => void;
}

const defaultPermissions: Permission[] = [
  { module: "Finance", view: true, edit: true, delete: false, configure: true },
  { module: "Compliance", view: true, edit: true, delete: true, configure: true },
  { module: "Support", view: true, edit: true, delete: false, configure: false },
  { module: "Operations", view: true, edit: true, delete: false, configure: false },
  { module: "Analytics", view: true, edit: false, delete: false, configure: false },
  { module: "Settings", view: true, edit: true, delete: true, configure: true },
  { module: "Notifications", view: true, edit: true, delete: false, configure: true },
  { module: "KYC", view: true, edit: true, delete: false, configure: false },
];

export function CreateRoleModal({ isOpen, onClose, onSave }: CreateRoleModalProps) {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>(defaultPermissions);

  const handleTogglePermission = (
    moduleIndex: number,
    permissionType: keyof Omit<Permission, "module">
  ) => {
    const newPermissions = [...permissions];
    newPermissions[moduleIndex][permissionType] = !newPermissions[moduleIndex][permissionType];
    setPermissions(newPermissions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name: roleName, permissions });
    setRoleName("");
    setPermissions(defaultPermissions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Create New Role
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Create new role with specific access and permissions
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

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <Label htmlFor="roleName" className="text-sm font-medium text-text-primary mb-2 block">
              Role Name
            </Label>
            <Input
              id="roleName"
              type="text"
              placeholder="Enter role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
              className="w-full"
            />
          </div>

          {/* Permissions Table */}
          <div className="border border-neutral-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                    Module
                  </th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">
                    View
                  </th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">
                    Edit
                  </th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">
                    Delete
                  </th>
                  <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">
                    Configure
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {permissions.map((permission, index) => (
                  <tr key={permission.module} className="hover:bg-neutral-50">
                    <td className="px-4 py-3 text-sm text-text-primary">
                      {permission.module}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={permission.view}
                        onChange={() => handleTogglePermission(index, "view")}
                        className="w-4 h-4 rounded border-neutral-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={permission.edit}
                        onChange={() => handleTogglePermission(index, "edit")}
                        className="w-4 h-4 rounded border-neutral-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={permission.delete}
                        onChange={() => handleTogglePermission(index, "delete")}
                        className="w-4 h-4 rounded border-neutral-300"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={permission.configure}
                        onChange={() => handleTogglePermission(index, "configure")}
                        className="w-4 h-4 rounded border-neutral-300"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
