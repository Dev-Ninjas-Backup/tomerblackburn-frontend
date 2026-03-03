"use client";

import React, { useState } from "react";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";

interface AccountSecurityProps {
  currentUser: {
    id: string;
    name: string;
    email: string;
  };
  onUpdate: () => void;
}

export const AccountSecurity: React.FC<AccountSecurityProps> = ({
  currentUser,
  onUpdate,
}) => {
  const { updateUser } = useAuthStore();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUpdateProfile = async () => {
    try {
      await authService.updateUser(currentUser.id, profileData);
      updateUser(profileData); // Update authStore
      toast.success("Profile updated successfully");
      setIsEditingProfile(false);
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await authService.changePassword(currentUser.id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#2d4a8f]/10 rounded-lg">
          <Lock className="text-[#2d4a8f]" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Account Security
          </h2>
          <p className="text-sm text-gray-500">
            Manage your account credentials
          </p>
        </div>
      </div>

      {/* Profile Information */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <User size={20} />
            Profile Information
          </h3>
          {!isEditingProfile && (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="text-sm bg-[#2d4a8f] hover:bg-[#243d75] text-white font-medium px-4 py-2 rounded-lg"
            >
              Edit
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="profile-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              id="profile-name"
              type="text"
              value={profileData.name}
              onChange={(e) =>
                setProfileData({ ...profileData, name: e.target.value })
              }
              disabled={!isEditingProfile}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2d4a8f] disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="profile-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="profile-email"
              type="email"
              value={profileData.email}
              onChange={(e) =>
                setProfileData({ ...profileData, email: e.target.value })
              }
              disabled={!isEditingProfile}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2d4a8f] disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {isEditingProfile && (
            <div className="flex gap-2">
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#243d75]"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setProfileData({
                    name: currentUser?.name || "",
                    email: currentUser?.email || "",
                  });
                  setIsEditingProfile(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Change Password */}
      <div className="border-t pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Lock size={20} />
            Change Password
          </h3>
          {!isChangingPassword && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="text-sm text-[#2d4a8f] hover:text-[#243d75] font-medium"
            >
              Change
            </button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2d4a8f] pr-10"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      current: !showPasswords.current,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showPasswords.current
                      ? "Hide current password"
                      : "Show current password"
                  }
                  title={
                    showPasswords.current ? "Hide password" : "Show password"
                  }
                >
                  {showPasswords.current ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2d4a8f] pr-10"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showPasswords.new
                      ? "Hide new password"
                      : "Show new password"
                  }
                  title={showPasswords.new ? "Hide password" : "Show password"}
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#2d4a8f] pr-10"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      confirm: !showPasswords.confirm,
                    })
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={
                    showPasswords.confirm
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  title={
                    showPasswords.confirm ? "Hide password" : "Show password"
                  }
                >
                  {showPasswords.confirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 bg-[#2d4a8f] text-white rounded-lg hover:bg-[#243d75]"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setIsChangingPassword(false);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
