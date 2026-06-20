"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getDefaultPermissions } from "@/lib/permissions/defaults";
import type { DefaultPermission } from "@/lib/permissions/defaults";
import type { Role } from "../types/roles.types";

interface EditRolePermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (permissions: DefaultPermission[]) => void;
  role: Role | null;
}

export function EditRolePermissionsModal({
  isOpen,
  onClose,
  onSave,
  role,
}: EditRolePermissionsModalProps) {
  if (!role) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Edit Role Permissions - {role.name}
          </DialogTitle>
          <p className="text-sm text-text-secondary mt-1">
            Configure granular permissions for this role
          </p>
        </DialogHeader>

        <PermissionsForm
          key={role.id}
          onSubmit={(permissions) => {
            onSave(permissions);
            onClose();
          }}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}

interface PermissionsFormProps {
  onSubmit: (permissions: DefaultPermission[]) => void;
  onCancel: () => void;
}

function PermissionsForm({ onSubmit, onCancel }: PermissionsFormProps) {
  const [permissions, setPermissions] = useState<DefaultPermission[]>(() =>
    getDefaultPermissions(),
  );

  const handleTogglePermission = (
    moduleIndex: number,
    permissionType: keyof Omit<DefaultPermission, "module">,
  ) => {
    const newPermissions = [...permissions];
    newPermissions[moduleIndex] = {
      ...newPermissions[moduleIndex],
      [permissionType]: !newPermissions[moduleIndex][permissionType],
    };
    setPermissions(newPermissions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(permissions);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-text-primary">
                Module
              </th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">View</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">Edit</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">Delete</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-text-primary">Configure</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {permissions.map((permission, index) => (
              <tr key={permission.module} className="hover:bg-neutral-50">
                <td className="px-4 py-3 text-sm text-text-primary">{permission.module}</td>
                {(["view", "edit", "delete", "configure"] as const).map((key) => (
                  <td key={key} className="px-4 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={permission[key]}
                      onChange={() => handleTogglePermission(index, key)}
                      className="w-4 h-4 rounded border-neutral-300"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Close
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4" />
          Save Permissions
        </Button>
      </div>
    </form>
  );
}
