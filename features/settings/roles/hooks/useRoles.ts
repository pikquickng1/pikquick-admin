"use client";

import { useState, useEffect } from "react";
import { Role } from "../types/roles.types";
import { rolesApi } from "../api/rolesApi";

export function useRoles() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await rolesApi.getRoles();
      setRoles(data);
      setError(null);
    } catch (err) {
      setError("Failed to load roles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    roles,
    loading,
    error,
    refetch: fetchRoles,
  };
}
