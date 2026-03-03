"use client";

import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion } from "framer-motion";
import { CompanyProfile } from "./_components/CompanyProfile";
import { EmailNotifications } from "./_components/EmailNotifications";
import { TeamMembers } from "./_components/TeamMembers";
import { SocialMediaLinks } from "./_components/SocialMediaLinks";
import { AccountSecurity } from "./_components/AccountSecurity";
import {
  useSiteSettings,
  useUpdateSiteSettings,
} from "@/hooks/useSiteSettings";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateMutation = useUpdateSiteSettings();
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const { user: currentUser } = useAuthStore();

  console.log("Current User:", currentUser);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await authService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateCompany = async (data: any) => {
    try {
      await updateMutation.mutateAsync(data);
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  const handleUpdateSocial = async (data: any) => {
    try {
      await updateMutation.mutateAsync(data);
      toast.success("Social links updated successfully");
    } catch (error) {
      toast.error("Failed to update social links");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Notifications"
        >
          <Bell size={24} className="text-gray-700" />
        </button>
      </div>

      {/* Blue Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="h-1 bg-[#2d4a8f] rounded-full origin-left"
      />

      {/* Company Profile */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <CompanyProfile
          settings={settings}
          onUpdate={handleUpdateCompany}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Email Notifications */}
      {/* <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <EmailNotifications
          notifications={{
            newSubmission: true,
            confirmationEmail: true,
            dailySummary: true
          }}
          onUpdate={() => {}}
        />
      </motion.div> */}

      {/* Account Security */}
      {currentUser && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AccountSecurity
            currentUser={currentUser}
            onUpdate={() => {
              // Refresh auth state if needed
            }}
          />
        </motion.div>
      )}

      {/* Team Members */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <TeamMembers
          members={users}
          onRefresh={fetchUsers}
          isLoading={usersLoading}
        />
      </motion.div>

      {/* Social Media Links */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <SocialMediaLinks
          settings={settings}
          onUpdate={handleUpdateSocial}
          isLoading={isLoading}
        />
      </motion.div>
    </motion.div>
  );
}
