"use client";

import { Settings, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function SettingsOverview() {
  const settingsCards = [
    {
      id: "user-access",
      title: "User & Access Control",
      description: "Manage roles and permissions",
      path: "/dashboard/settings/user-access",
    },
    {
      id: "platform-settings",
      title: "Platform Settings",
      description: "Configure your platform's basic information",
      path: "/dashboard/settings/platform",
    },
    {
      id: "notifications",
      title: "Notifications & Alerts",
      description: "Configure notification preferences and channels",
      path: "/dashboard/settings/notifications",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-text-primary">Settings & Roles</h1>

      {/* Header Card */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-1">
              Settings & Roles Management
            </h2>
            <p className="text-sm text-text-secondary">
              Configure platform settings and manage admin access
            </p>
          </div>
        </div>
      </div>

      {/* Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsCards.map((card) => (
          <Link
            key={card.id}
            href={card.path}
            className="bg-neutral-200 rounded-lg p-6 hover:border transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-text-primary mb-2 group-hover:text-blue-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-text-secondary">{card.description}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-text-secondary group-hover:text-blue-600 transition-colors shrink-0 ml-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
