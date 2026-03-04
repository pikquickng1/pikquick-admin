"use client";

import { useState, useEffect } from "react";
import { AdminUser } from "../types/user-access.types";
import { userAccessApi } from "../api/userAccessApi";

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userAccessApi.getAdminUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError("Failed to load admin users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await userAccessApi.deleteAdminUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    deleteUser,
    refetch: fetchUsers,
  };
}
