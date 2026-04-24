"use client";

import React, { useState } from "react";
import { Plus, X, Edit2, Trash2, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

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

export const TeamMembers = ({
  members,
  onRefresh,
  isLoading,
}: TeamMembersProps) => {
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<TeamMember | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "USER">("ADMIN");
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
    setRole(member.role as "ADMIN" | "USER");
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
        {isSuperAdmin && (
          <button
            onClick={openAddModal}
            className="text-sm text-[#2d4a8f] hover:underline font-medium flex items-center gap-1"
          >
            <Plus size={16} />
            Add Member
          </button>
        )}
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : members.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No team members found
          </div>
        ) : (
          members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  {member.name?.charAt(0).toUpperCase() ||
                    member.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    member.role === "SUPER_ADMIN"
                      ? "text-[#2d4a8f]"
                      : "text-gray-700"
                  }`}
                >
                  {member.role === "SUPER_ADMIN"
                    ? "Super Admin"
                    : member.role === "ADMIN"
                      ? "Admin"
                      : "User"}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    member.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {member.isActive ? "Active" : "Inactive"}
                </span>
                {isSuperAdmin && member.role !== "SUPER_ADMIN" && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleToggleStatus(member.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title={member.isActive ? "Deactivate" : "Activate"}
                    >
                      <Power
                        size={16}
                        className={
                          member.isActive ? "text-gray-600" : "text-green-600"
                        }
                      />
                    </button>
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Edit"
                    >
                      <Edit2 size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Delete"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Member Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingUser ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button onClick={resetForm} aria-label="Close modal">
                <X size={20} className="text-gray-500" />
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
                  onChange={(e) => setRole(e.target.value as "ADMIN" | "USER")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="USER">User</option>
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
                  className="flex-1 bg-[#2d4a8f] hover:bg-[#243d75]"
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
