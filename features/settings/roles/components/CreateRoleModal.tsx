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
import { getDefaultPermissions } from "@/lib/permissions/defaults";
import type { DefaultPermission } from "@/lib/permissions/defaults";

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; permissions: DefaultPermission[] }) => void;
}

export function CreateRoleModal({ isOpen, onClose, onSave }: CreateRoleModalProps) {
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState<DefaultPermission[]>(() => getDefaultPermissions());

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
    onSave({ name: roleName, permissions });
    setRoleName("");
    setPermissions(getDefaultPermissions());
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-text-primary">
            Create New Role
          </DialogTitle>
          <p className="text-sm text-text-secondary mt-1">
            Create new role with specific access and permissions
          </p>
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
