"use client";

import { UserPlus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState } from "@/components/ui/loading-state";
import { StatusBadge } from "@/components/ui/status-badge";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { AddAdminModal } from "./AddAdminModal";
import { EditAdminModal } from "./EditAdminModal";
import { RemoveAdminModal } from "./RemoveAdminModal";
import type { AdminUser } from "../types/user-access.types";
import { AdminRole } from "@/lib/types/enums";
import { cn } from "@/lib/utils";
import { formatRelative } from "@/lib/utils/date";

const ADMIN_ROLE_COLOR: Record<AdminRole, string> = {
  super_admin: "bg-blue-100 text-blue-700",
  finance_admin: "bg-green-100 text-green-700",
  support_admin: "bg-orange-100 text-orange-700",
  operations_admin: "bg-purple-100 text-purple-700",
};

const ROLE_LABEL_TO_ENUM: Record<string, AdminRole> = {
  "Super Admin": AdminRole.SUPER_ADMIN,
  "Finance Admin": AdminRole.FINANCE_ADMIN,
  "Support Admin": AdminRole.SUPPORT_ADMIN,
  "Operations Admin": AdminRole.OPERATIONS_ADMIN,
};

export function UserAccessControl() {
  const { users, loading, deleteUser } = useAdminUsers();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const handleSelectAll = (checked: boolean) => {
    setSelectedUsers(checked ? users.map((u) => u.id) : []);
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    setSelectedUsers((prev) =>
      checked ? [...prev, userId] : prev.filter((id) => id !== userId),
    );
  };

  const handleDelete = (userId: string) => {
    const admin = users.find((u) => u.id === userId);
    if (admin) {
      setSelectedAdmin(admin);
      setShowRemoveModal(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedAdmin) {
      deleteUser(selectedAdmin.id);
      setShowRemoveModal(false);
    }
  };

  const handleEdit = (userId: string) => {
    const admin = users.find((u) => u.id === userId);
    if (admin) {
      setSelectedAdmin(admin);
      setShowEditModal(true);
    }
  };

  const handleUpdateAdmin = (data: { role: string; status: string }) => {
    console.log("Update admin:", selectedAdmin?.id, data);
  };

  const handleAddAdmin = (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    console.log("Add new admin:", data);
  };

  if (loading) return <LoadingState label="Loading admins..." />;

  const initialsOf = (name: string) =>
    name.split(" ").map((n) => n[0] ?? "").join("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="User & Access Control"
        actions={
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/settings/roles"
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-neutral-200 rounded"
            >
              Manage Roles & Permissions
            </Link>
            <Button onClick={() => setShowAddModal(true)}>
              <UserPlus className="w-4 h-4" />
              Add New Admin
            </Button>
          </div>
        }
      />

      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th className="w-12 px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === users.length && users.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300"
                  aria-label="Select all admins"
                />
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                Role
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                Status
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                Last Login
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {users.map((user) => {
              const roleEnum = ROLE_LABEL_TO_ENUM[user.role];
              const roleClass = roleEnum
                ? ADMIN_ROLE_COLOR[roleEnum]
                : "bg-gray-100 text-gray-700";
              return (
                <tr key={user.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-300"
                      aria-label={`Select ${user.name}`}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-neutral-900 text-white">
                          {initialsOf(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex px-3 py-1 text-xs font-medium rounded-full",
                        roleClass,
                      )}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={String(user.status).toLowerCase()} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-text-secondary">
                      {formatRelative(user.lastLogin)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AddAdminModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddAdmin}
      />

      <EditAdminModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onUpdate={handleUpdateAdmin}
        admin={selectedAdmin}
      />

      <RemoveAdminModal
        isOpen={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={handleConfirmDelete}
        admin={selectedAdmin}
      />
    </div>
  );
}
