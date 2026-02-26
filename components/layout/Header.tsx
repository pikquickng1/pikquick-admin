"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils";

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (parts[0]?.length) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return "AD";
}

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const displayName = user?.full_name ?? "Admin";
  const initials = getInitials(displayName);

  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border-[#E1E1E1] rounded-[48px] text-sm focus-visible:ring-primary-500"
            style={{ borderColor: "#E1E1E1" }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          type="button"
          className="relative flex items-center justify-center hover:opacity-80 transition-opacity"
          aria-label="Notifications"
        >
          <svg
            className="w-7 h-7 text-primary-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span className="absolute top-0 right-0 w-3 h-3 bg-[#FF5C5C] text-white text-xs font-medium rounded-full flex items-center justify-center">
            4
          </span>
        </button>

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                "hover:opacity-90 transition-opacity"
              )}
              aria-label="Open user menu"
            >
              <Avatar className="h-10 w-10 rounded-full bg-primary-500 border-2 border-white">
                <AvatarFallback className="rounded-full bg-primary-500 text-white text-sm font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-3 py-2 border-b border-neutral-100">
              <p className="text-sm font-medium text-text-primary truncate">
                {displayName}
              </p>
              {user?.email && (
                <p className="text-xs text-text-secondary truncate mt-0.5">
                  {user.email}
                </p>
              )}
            </div>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
              onSelect={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
