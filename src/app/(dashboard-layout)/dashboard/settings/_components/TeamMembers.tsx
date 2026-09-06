"use client";

import React, { useState } from "react";
import { Plus, X, Edit2, Trash2, Power, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/usePermissions";
import { PermissionsModal } from "./PermissionsModal";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

interface TeamMembersProps {
  members: TeamMember[];
  onRefresh: () => void;
  isLoading?: boolean;
}

type AssignableRole = "ADMIN";

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  VIEW_ONLY: "View Only",
};

export const TeamMembers = ({
  members,
  onRefresh,
  isLoading,
}: TeamMembersProps) => {
  const { isSuperAdmin } = usePermissions();
  const canManage = isSuperAdmin;

  const [showModal, setShowModal] = useState(false);
  const [permissionsTarget, setPermissionsTarget] = useState<TeamMember | null>(null);
  const [editingUser, setEditingUser] = useState<TeamMember | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<AssignableRole>("ADMIN");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.register({ name, email, password, role });
      toast.success("Team member added successfully");
      resetForm();
      onRefresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add team member");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async () => {
    if (!editingUser || !name.trim() || !email.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.updateUser(editingUser.id, { name, email, role });
      toast.success("User updated successfully");
      resetForm();
      onRefresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete ${userName}?`)) return;

    try {
      await authService.deleteUser(id);
      toast.success("User deleted successfully");
      onRefresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await authService.toggleUserStatus(id);
      toast.success("User status updated");
      onRefresh();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingUser(member);
    setName(member.name);
    setEmail(member.email);
    setRole("ADMIN");
    setPassword("");
    setConfirmPassword("");
    setShowModal(true);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setRole("ADMIN");
    setShowModal(false);
    setEditingUser(null);
  };

  // Render Role Badge
  const renderRoleBadge = (memberRole: string) => (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap inline-block ${
        memberRole === "SUPER_ADMIN"
          ? "bg-indigo-50 text-[#283878] border border-indigo-100"
          : memberRole === "ADMIN"
          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
          : "bg-gray-100 text-gray-700 border border-gray-200"
      }`}
    >
      {ROLE_LABELS[memberRole] ?? memberRole}
    </span>
  );

  // Render Status Badge
  const renderStatusBadge = (isActive: boolean) => (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap flex items-center gap-1.5 ${
        isActive
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
          : "bg-rose-50 text-rose-700 border border-rose-200/60"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-rose-500"
        }`}
      />
      {isActive ? "Active" : "Inactive"}
    </span>
  );

  // Render Action Buttons
  const renderActionButtons = (member: TeamMember) => (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setPermissionsTarget(member)}
        className="w-7 h-7 flex items-center justify-center hover:bg-blue-100/70 text-[#283878] rounded-md transition-colors"
        title="Manage Permissions"
        aria-label="Manage Permissions"
      >
        <ShieldCheck size={15} />
      </button>
      <button
        type="button"
        onClick={() => handleToggleStatus(member.id)}
        className={`w-7 h-7 flex items-center justify-center rounded-md transition-colors ${
          member.isActive
            ? "text-gray-500 hover:bg-gray-200/70 hover:text-gray-700"
            : "text-emerald-600 hover:bg-emerald-100/70"
        }`}
        title={member.isActive ? "Deactivate Member" : "Activate Member"}
        aria-label={member.isActive ? "Deactivate" : "Activate"}
      >
        <Power size={15} />
      </button>
      <button
        type="button"
        onClick={() => openEditModal(member)}
        className="w-7 h-7 flex items-center justify-center hover:bg-blue-100/70 text-blue-600 rounded-md transition-colors"
        title="Edit Member"
        aria-label="Edit Member"
      >
        <Edit2 size={15} />
      </button>
      <button
        type="button"
        onClick={() => handleDelete(member.id, member.name)}
        className="w-7 h-7 flex items-center justify-center hover:bg-red-100/70 text-red-600 rounded-md transition-colors"
        title="Delete Member"
        aria-label="Delete Member"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#283878]" />
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 hidden sm:block">
            Manage your organization members, access roles, and permissions.
          </p>
        </div>
        {canManage && (
          <Button
            size="sm"
            onClick={openAddModal}
            className="bg-[#283878] hover:bg-[#1f2d5c] text-white text-xs font-semibold shrink-0 gap-1.5 shadow-xs"
          >
            <Plus size={15} />
            Add Member
          </Button>
        )}
      </div>

      {/* Role legend */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-xs text-gray-500 pb-3 border-b border-gray-100">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#283878] inline-block" />
          <strong className="text-gray-700">Super Admin:</strong> Full access
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
          <strong className="text-gray-700">Admin:</strong> Can edit &amp; manage
        </span>
      </div>

      {/* Member List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500 text-sm">Loading team members...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No team members found
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="p-3.5 sm:p-4 rounded-xl border border-gray-200/80 hover:border-gray-300 bg-white hover:bg-gray-50/40 transition-all overflow-hidden"
            >
              {/* Main Info Row */}
              <div className="flex items-center justify-between gap-3">
                {/* Avatar + Name + Email */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#283878] to-[#1a2550] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    {member.name?.charAt(0).toUpperCase() ||
                      member.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate" title={member.email}>
                      {member.email}
                    </p>
                  </div>
                </div>

                {/* Desktop View: Badges + Actions aligned horizontally */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  {renderRoleBadge(member.role)}
                  {renderStatusBadge(member.isActive)}

                  {canManage && member.role !== "SUPER_ADMIN" && (
                    <div className="flex items-center pl-2 border-l border-gray-200">
                      {renderActionButtons(member)}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile View (< sm): Clean dedicated bottom toolbar */}
              <div className="flex sm:hidden items-center justify-between gap-2 mt-3 pt-2.5 border-t border-gray-100">
                <div className="flex items-center gap-1.5 shrink-0">
                  {renderRoleBadge(member.role)}
                  {renderStatusBadge(member.isActive)}
                </div>

                {canManage && member.role !== "SUPER_ADMIN" && (
                  <div className="bg-gray-50 px-1 py-0.5 rounded-lg border border-gray-200/70 shrink-0">
                    {renderActionButtons(member)}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Permissions Modal */}
      {permissionsTarget && (
        <PermissionsModal
          userId={permissionsTarget.id}
          userName={permissionsTarget.name}
          onClose={() => setPermissionsTarget(null)}
        />
      )}

      {/* Add/Edit Member Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingUser ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button
                onClick={resetForm}
                aria-label="Close modal"
                className="p-1 hover:bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <Input
                  type="email"
                  placeholder="member@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {!editingUser && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password* (min 8 characters)
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password*
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="team-member-role"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role*
                </label>
                <select
                  id="team-member-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value as AssignableRole)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#283878] focus:border-transparent"
                >
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingUser ? handleEdit : handleAdd}
                  className="flex-1 bg-[#283878] hover:bg-[#1f2d5c] text-white font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? editingUser
                      ? "Updating..."
                      : "Adding..."
                    : editingUser
                      ? "Update"
                      : "Add Member"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
