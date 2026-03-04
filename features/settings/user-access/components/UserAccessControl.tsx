"use client";

import { ArrowLeft, UserPlus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useAdminUsers } from "../hooks/useAdminUsers";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddAdminModal } from "./AddAdminModal";
import { EditAdminModal } from "./EditAdminModal";
import { RemoveAdminModal } from "./RemoveAdminModal";
import { AdminUser } from "../types/user-access.types";

export function UserAccessControl() {
  const router = useRouter();
  const { users, loading, deleteUser } = useAdminUsers();
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<AdminUser | null>(null);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-blue-100 text-blue-700";
      case "Finance Admin":
        return "bg-green-100 text-green-700";
      case "Support Admin":
        return "bg-orange-100 text-orange-700";
      case "Operations Admin":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleDelete = async (userId: string) => {
    const admin = users.find((u) => u.id === userId);
    if (admin) {
      setSelectedAdmin(admin);
      setShowRemoveModal(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedAdmin) {
      try {
        await deleteUser(selectedAdmin.id);
      } catch (error) {
        alert("Failed to remove admin");
      }
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
    // API call would go here
  };

  const handleAddAdmin = (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    console.log("Add new admin:", data);
    // API call would go here
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
          <h1 className="text-2xl font-semibold text-text-primary">User & Access Control</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/settings/roles"
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-neutral-200 rounded"
          >
            Manage Roles & Permissions
          </Link>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded"
          >
            <UserPlus className="w-4 h-4" />
            Add New Admin
          </button>
        </div>
      </div>

      {/* Table */}
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
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-neutral-900 text-white">
                        {user.name.split(" ").map((n) => n[0]).join("")}
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
                    className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-text-secondary">{user.lastLogin}</span>
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
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
