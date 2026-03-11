"use client";

import { ArrowLeft, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRoles } from "../hooks/useRoles";
import { CreateRoleModal } from "./CreateRoleModal";
import { EditRolePermissionsModal } from "./EditRolePermissionsModal";
import { Role } from "../types/roles.types";

interface Permission {
  module: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
  configure: boolean;
}

export function ManageRoles() {
  const router = useRouter();
  const { roles, loading } = useRoles();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleCreateRole = (data: { name: string; permissions: Permission[] }) => {
    console.log("Creating role:", data);
    // TODO: Implement API call to create role
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEditModalOpen(true);
  };

  const handleSavePermissions = (permissions: Permission[]) => {
    console.log("Saving permissions for role:", selectedRole?.name, permissions);
    // TODO: Implement API call to update role permissions
  };

  const getRoleBadgeColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-700";
      case "green":
        return "bg-green-100 text-green-700";
      case "orange":
        return "bg-orange-100 text-orange-700";
      case "purple":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-2xl font-semibold text-text-primary">Manage Role Access</h1>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
        >
          Create New Role
        </button>
      </div>

      {/* Table */}
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
                    className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getRoleBadgeColor(
                      role.color
                    )}`}
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

      {/* Modals */}
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
