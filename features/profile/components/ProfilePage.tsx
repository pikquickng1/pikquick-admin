"use client";

import { User, Edit, Key, Calendar, Clock, Monitor, MapPin, LogOut, Check, Download } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { profileApi } from "../api/profileApi";
import { EditProfileModal } from "./EditProfileModal";
import { ChangePasswordModal } from "./ChangePasswordModal";

export function ProfilePage() {
  const { profile, activityLogs, loading } = useProfile();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleLogoutAllDevices = async () => {
    await profileApi.logoutAllDevices();
    // TODO: Implement actual logout logic
  };

  const handleEditProfile = (data: { fullName: string; email: string; phoneNumber: string }) => {
    console.log("Updating profile:", data);
    // TODO: Implement API call to update profile
  };

  const handleChangePassword = (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    console.log("Changing password");
    // TODO: Implement API call to change password
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">Loading...</p>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getActivityIcon = (icon: string) => {
    switch (icon) {
      case "check":
        return <Check className="w-5 h-5" />;
      case "edit":
        return <Edit className="w-5 h-5" />;
      case "download":
        return <Download className="w-5 h-5" />;
      case "login":
        return <User className="w-5 h-5" />;
      default:
        return <Check className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-text-primary">Profile</h1>

      {/* Admin Profile Card */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">Admin Profile</h2>
              <p className="text-sm text-text-secondary">Manage your account settings and preferences</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-text-primary">Profile Overview</h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsEditProfileOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-neutral-200 rounded-md"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button 
                  onClick={() => setIsChangePasswordOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-neutral-200 rounded-md"
                >
                  <Key className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>

            <div className="flex items-start gap-6 mb-6">
              <Avatar className="w-20 h-20 shrink-0">
                <AvatarFallback className="bg-blue-100 text-blue-600 text-2xl font-semibold">
                  {getInitials(profile.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-semibold text-text-primary mb-1">{profile.fullName}</h4>
                <span className="inline-flex px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full mb-2">
                  {profile.role}
                </span>
                <p className="text-sm text-text-secondary">Member since {profile.memberSince}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Full Name</p>
                  <p className="text-sm font-medium text-text-primary">{profile.fullName}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Email Address</p>
                  <p className="text-sm font-medium text-text-primary">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Phone Number</p>
                  <p className="text-sm font-medium text-text-primary">{profile.phoneNumber}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-text-secondary mb-1">Role</p>
                  <span className="inline-flex px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                    {profile.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Logs */}
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Activity Logs</h3>
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 text-blue-600">
                    {getActivityIcon(log.icon)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-text-primary mb-1">{log.action}</h4>
                    <p className="text-xs text-text-secondary mb-1">{log.description}</p>
                    <p className="text-xs text-text-secondary flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logout from all devices */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-600" />
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">Logout from all devices</h4>
                  <p className="text-xs text-text-secondary">This will end all active sessions</p>
                </div>
              </div>
              <button
                onClick={handleLogoutAllDevices}
                className="px-4 py-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Security & Activity */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Security & Activity</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-text-primary mb-3">Last Login</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">{profile.lastLogin.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">{profile.lastLogin.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">{profile.lastLogin.device}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <h4 className="text-sm font-semibold text-text-primary mb-3">Location</h4>
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-secondary">{profile.lastLogin.location}</span>
                </div>
                <p className="text-xs text-text-secondary">IP Address: {profile.lastLogin.ipAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {profile && (
        <>
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            onSave={handleEditProfile}
            currentData={{
              fullName: profile.fullName,
              email: profile.email,
              phoneNumber: profile.phoneNumber,
            }}
          />

          <ChangePasswordModal
            isOpen={isChangePasswordOpen}
            onClose={() => setIsChangePasswordOpen(false)}
            onSave={handleChangePassword}
          />
        </>
      )}
    </div>
  );
}
