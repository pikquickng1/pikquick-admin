"use client";

import { X, Save } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Role } from "../types/roles.types";

interface Permission {
  module: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
  configure: boolean;
}

interface EditRolePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: Permission[]) => void;
  role: Role | null;
}

const getDefaultPermissions = (): Permission[] => {
  // Different default permissions based on role
  const basePermissions = [
    { module: "Finance", view: true, edit: true, delete: false, configure: true },
    { module: "Compliance", view: true, edit: true, delete: true, configure: true },
    { module: "Support", view: true, edit: true, delete: false, configure: false },
    { module: "Operations", view: true, edit: true, delete: false, configure: false },
    { module: "Analytics", view: true, edit: false, delete: false, configure: false },
    { module: "Settings", view: true, edit: true, delete: true, configure: true },
    { module: "Notifications", view: true, edit: true, delete: false, configure: true },
    { module: "KYC", view: true, edit: true, delete: false, configure: false },
  ];

  return basePermissions;
};

export function EditRolePermissionsModal({
  isOpen,
  onClose,
  onSave,
  role,
}: EditRolePermissionsModalProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    if (role) {
      setPermissions(getDefaultPermissions());
    }
  }, [role]);

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
    onSave(permissions);
    onClose();
  };

  if (!role) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-text-primary">
                Edit Role Permissions - {role.name}
              </DialogTitle>
              <p className="text-sm text-text-secondary mt-1">
                Configure granular permissions for this role
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
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              <Save className="w-4 h-4" />
              Save Permissions
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
