"use client";

import React, { useState, useEffect } from "react";
import { X, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { UserPermissions } from "@/lib/auth";

interface PermissionsModalProps {
  userId: string;
  userName: string;
  onClose: () => void;
}

interface PermissionModule {
  key: string;
  label: string;
  actions: { field: keyof UserPermissions; label: string }[];
}

const MODULES: PermissionModule[] = [
  {
    key: "submissions",
    label: "Submissions",
    actions: [
      { field: "submissionsView", label: "View" },
      { field: "submissionsEdit", label: "Edit" },
      { field: "submissionsDelete", label: "Delete" },
    ],
  },
  {
    key: "contacts",
    label: "Contacts",
    actions: [
      { field: "contactsView", label: "View" },
      { field: "contactsEdit", label: "Edit" },
      { field: "contactsDelete", label: "Delete" },
    ],
  },
  {
    key: "costManagement",
    label: "Cost Management",
    actions: [
      { field: "costManagementView", label: "View" },
      { field: "costManagementEdit", label: "Edit" },
      { field: "costManagementDelete", label: "Delete" },
    ],
  },
  {
    key: "projectManagement",
    label: "Project Management",
    actions: [
      { field: "projectManagementView", label: "View" },
      { field: "projectManagementEdit", label: "Edit" },
      { field: "projectManagementDelete", label: "Delete" },
    ],
  },
  {
    key: "web",
    label: "Web Content",
    actions: [
      { field: "webView", label: "View" },
      { field: "webEdit", label: "Edit" },
    ],
  },
  {
    key: "settings",
    label: "Settings",
    actions: [{ field: "settingsView", label: "View" }],
  },
  {
    key: "dataBackup",
    label: "Data Backup",
    actions: [{ field: "dataBackupAccess", label: "Access" }],
  },
];

const ACTION_COLORS: Record<string, string> = {
  View: "text-blue-600",
  Edit: "text-amber-600",
  Delete: "text-red-600",
  Access: "text-purple-600",
};

export const PermissionsModal = ({
  userId,
  userName,
  onClose,
}: PermissionsModalProps) => {
  const [permissions, setPermissions] = useState<Partial<UserPermissions>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await authService.getUserPermissions(userId);
        setPermissions(res.data);
      } catch {
        toast.error("Failed to load permissions");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [userId]);

  const toggle = (field: keyof UserPermissions) => {
    setPermissions((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { id, userId: _uid, createdAt, updatedAt, ...payload } = permissions as any;
      await authService.updateUserPermissions(userId, payload);
      toast.success("Permissions updated successfully");
      onClose();
    } catch {
      toast.error("Failed to update permissions");
    } finally {
      setIsSaving(false);
    }
  };

  const setAll = (value: boolean) => {
    const allFields: (keyof UserPermissions)[] = [
      "submissionsView", "submissionsEdit", "submissionsDelete",
      "contactsView", "contactsEdit", "contactsDelete",
      "costManagementView", "costManagementEdit", "costManagementDelete",
      "projectManagementView", "projectManagementEdit", "projectManagementDelete",
      "webView", "webEdit",
      "settingsView",
      "dataBackupAccess",
    ];
    const update: Partial<UserPermissions> = {};
    allFields.forEach((f) => (update[f] = value as any));
    setPermissions((prev) => ({ ...prev, ...update }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-[#2d4a8f]" />
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Manage Permissions
              </h3>
              <p className="text-xs text-gray-500">{userName}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close">
            <X size={20} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 px-5 pt-3">
          <button
            onClick={() => setAll(true)}
            className="text-xs text-[#2d4a8f] hover:underline"
          >
            Grant all
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={() => setAll(false)}
            className="text-xs text-red-500 hover:underline"
          >
            Revoke all
          </button>
        </div>

        {/* Permission table */}
        <div className="overflow-y-auto flex-1 px-5 pb-2 mt-3">
          {isLoading ? (
            <div className="text-center py-10 text-gray-500 text-sm">
              Loading permissions...
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium text-xs w-1/2">
                    Module
                  </th>
                  <th className="text-center py-2 text-blue-600 font-medium text-xs">
                    View
                  </th>
                  <th className="text-center py-2 text-amber-600 font-medium text-xs">
                    Edit
                  </th>
                  <th className="text-center py-2 text-red-600 font-medium text-xs">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {MODULES.map((mod) => {
                  const actionMap: Record<string, keyof UserPermissions | null> = {
                    View: mod.actions.find((a) => a.label === "View")?.field ?? null,
                    Edit: mod.actions.find((a) => a.label === "Edit" || a.label === "Access")?.field ?? null,
                    Delete: mod.actions.find((a) => a.label === "Delete")?.field ?? null,
                  };
                  return (
                    <tr
                      key={mod.key}
                      className="border-b border-gray-50 hover:bg-gray-50"
                    >
                      <td className="py-3 text-gray-800 font-medium">
                        {mod.label}
                      </td>
                      {["View", "Edit", "Delete"].map((actionLabel) => {
                        const field = actionMap[actionLabel];
                        if (mod.key === "settings" && actionLabel === "Delete") {
                          return <td key={actionLabel} />;
                        }
                        if (mod.key === "settings" && actionLabel === "Edit") {
                          return <td key={actionLabel} />;
                        }
                        if (mod.key === "web" && actionLabel === "Delete") {
                          return <td key={actionLabel} />;
                        }
                        if (mod.key === "dataBackup") {
                          if (actionLabel === "View") {
                            return (
                              <td key={actionLabel} className="text-center py-3" colSpan={3}>
                                <label className="inline-flex items-center gap-1 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={!!permissions[actionMap.Edit ?? "dataBackupAccess" as keyof UserPermissions]}
                                    onChange={() => {
                                      const f = actionMap.Edit ?? "dataBackupAccess" as keyof UserPermissions;
                                      if (f) toggle(f);
                                    }}
                                    className="w-4 h-4 accent-purple-600"
                                  />
                                  <span className="text-xs text-purple-600">Access</span>
                                </label>
                              </td>
                            );
                          }
                          return null;
                        }
                        return (
                          <td key={actionLabel} className="text-center py-3">
                            {field ? (
                              <input
                                type="checkbox"
                                checked={!!permissions[field]}
                                onChange={() => toggle(field)}
                                className="w-4 h-4 cursor-pointer"
                                style={{
                                  accentColor:
                                    actionLabel === "View"
                                      ? "#2563eb"
                                      : actionLabel === "Edit"
                                      ? "#d97706"
                                      : "#dc2626",
                                }}
                              />
                            ) : (
                              <span className="text-gray-200">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="flex-1 bg-[#2d4a8f] hover:bg-[#243d75] gap-2"
            disabled={isSaving || isLoading}
          >
            <Save size={14} />
            {isSaving ? "Saving..." : "Save Permissions"}
          </Button>
        </div>
      </div>
    </div>
  );
};
