"use client";

import { ActivityLog } from "../types/activity-log.types";

interface ActivityLogTableProps {
  logs: ActivityLog[];
  loading: boolean;
}

export function ActivityLogTable({ logs, loading }: ActivityLogTableProps) {
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
    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
              Admin
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
              Admin Name
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
              Action
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
              Affected User
            </th>
            <th className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-neutral-50">
              <td className="px-6 py-6">
                <span className="text-sm text-text-secondary">{log.admin}</span>
              </td>
              <td className="px-6 py-6">
                <span className="text-sm text-text-secondary">{log.adminName}</span>
              </td>
              <td className="px-6 py-6">
                <span className="text-sm text-text-secondary">{log.action}</span>
              </td>
              <td className="px-6 py-6">
                <span className="text-sm text-text-secondary">{log.affectedUser}</span>
              </td>
              <td className="px-6 py-6">
                <span className="text-sm text-text-secondary">{log.timestamp}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
