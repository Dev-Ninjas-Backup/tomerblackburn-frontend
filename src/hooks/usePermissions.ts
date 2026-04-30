import { useAuthStore } from '@/store/authStore';
import { UserPermissions } from '@/lib/auth';

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'VIEW_ONLY';

export type { UserPermissions };

const SUPER_ADMIN_PERMISSIONS: UserPermissions = {
  id: '',
  userId: '',
  submissionsView: true,
  submissionsEdit: true,
  submissionsDelete: true,
  contactsView: true,
  contactsEdit: true,
  contactsDelete: true,
  costManagementView: true,
  costManagementEdit: true,
  costManagementDelete: true,
  projectManagementView: true,
  projectManagementEdit: true,
  projectManagementDelete: true,
  webView: true,
  webEdit: true,
  settingsView: true,
  dataBackupAccess: true,
};

const DEFAULT_PERMISSIONS: UserPermissions = {
  id: '',
  userId: '',
  submissionsView: true,
  submissionsEdit: false,
  submissionsDelete: false,
  contactsView: true,
  contactsEdit: false,
  contactsDelete: false,
  costManagementView: true,
  costManagementEdit: false,
  costManagementDelete: false,
  projectManagementView: true,
  projectManagementEdit: false,
  projectManagementDelete: false,
  webView: false,
  webEdit: false,
  settingsView: true,
  dataBackupAccess: false,
};

export interface ResolvedPermissions extends UserPermissions {
  role: UserRole | null;
  isSuperAdmin: boolean;
  canManageUsers: boolean;
}

export function usePermissions(): ResolvedPermissions {
  const { user } = useAuthStore();
  const role = (user?.role as UserRole) ?? null;

  if (!user || !role) {
    return { ...DEFAULT_PERMISSIONS, role: null, isSuperAdmin: false, canManageUsers: false };
  }

  if (role === 'SUPER_ADMIN') {
    return { ...SUPER_ADMIN_PERMISSIONS, role, isSuperAdmin: true, canManageUsers: true };
  }

  const perms = user.permissions ?? DEFAULT_PERMISSIONS;
  return { ...perms, role, isSuperAdmin: false, canManageUsers: false };
}
