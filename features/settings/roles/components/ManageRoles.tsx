"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { useRoles } from "../hooks/useRoles";
import { CreateRoleModal } from "./CreateRoleModal";
import { EditRolePermissionsModal } from "./EditRolePermissionsModal";
import type { DefaultPermission } from "@/lib/permissions/defaults";
import type { Role } from "../types/roles.types";
import { cn } from "@/lib/utils";

const ROLE_COLOR_CLASS: Record<Role["color"], string> = {
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  orange: "bg-orange-100 text-orange-700",
  purple: "bg-purple-100 text-purple-700",
  gray: "bg-gray-100 text-gray-700",
};

export function ManageRoles() {
  const { roles, loading, createRole, updateRolePermissions } = useRoles();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleCreateRole = async (data: {
    name: string;
    permissions: DefaultPermission[];
  }) => {
    await createRole(data);
    setIsCreateModalOpen(false);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleSavePermissions = async (permissions: DefaultPermission[]) => {
    if (!selectedRole) return;
    await updateRolePermissions(selectedRole.id, permissions);
    setIsEditModalOpen(false);
    setSelectedRole(null);
  };

  if (loading) return <LoadingState label="Loading roles..." />;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Role Access"
        actions={
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create New Role
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary w-1/5">
                Role Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary w-2/5">
                Description
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary w-2/5">
                Permissions Summary
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex px-3 py-1 text-sm font-medium rounded-full",
                      ROLE_COLOR_CLASS[role.color] ?? ROLE_COLOR_CLASS.gray,
                    )}
                  >
                    {role.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text-secondary">{role.description}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-text-secondary">{role.permissionsSummary}</p>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEditRole(role)}
                    className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CreateRoleModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateRole}
      />

      <EditRolePermissionsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSavePermissions}
        role={selectedRole}
      />
    </div>
  );
}
