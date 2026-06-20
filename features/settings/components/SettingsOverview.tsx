"use client";

import { Settings, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

interface SettingsCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

const SETTINGS_CARDS: SettingsCard[] = [
  {
    id: "user-access",
    title: "User & Access Control",
    description: "Manage roles and permissions",
    icon: "users",
    path: "/dashboard/settings/user-access",
  },
  {
    id: "platform-settings",
    title: "Platform Settings",
    description: "Configure your platform's basic information",
    icon: "settings",
    path: "/dashboard/settings/platform",
  },
  {
    id: "notifications",
    title: "Notifications & Alerts",
    description: "Configure notification preferences and channels",
    icon: "bell",
    path: "/dashboard/settings/notifications",
  },
];

export function SettingsOverview() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings & Roles" />

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SETTINGS_CARDS.map((card) => (
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
