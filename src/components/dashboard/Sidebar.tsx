"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePermissions, UserRole } from "@/hooks/usePermissions";
import type { ResolvedPermissions } from "@/hooks/usePermissions";
import {
  LayoutDashboard,
  Globe,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  FileText,
  LucideIcon,
  ExternalLink,
  FolderKanban,
  Calculator,
  DatabaseBackup,
  Activity,
} from "lucide-react";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  visible: (p: ResolvedPermissions) => boolean;
}

const menuItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
    visible: () => true,
  },
  {
    icon: FolderKanban,
    label: "Project Types",
    href: "/dashboard/project-management",
    visible: (p) => p.projectManagementView,
  },
  {
    icon: Calculator,
    label: "Cost Codes",
    href: "/dashboard/cost-management",
    visible: (p) => p.costManagementView,
  },
  {
    icon: FileText,
    label: "Submissions",
    href: "/dashboard/submissions",
    visible: (p) => p.submissionsView,
  },
  {
    icon: Users,
    label: "All Contacts",
    href: "/dashboard/contacts",
    visible: (p) => p.contactsView,
  },
  {
    icon: Globe,
    label: "Web",
    href: "/dashboard/web",
    visible: (p) => p.webView,
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
    visible: (p) => p.settingsView,
  },
  {
    icon: Activity,
    label: "Live Traffic",
    href: "/dashboard/traffic",
    visible: () => true,
  },
  {
    icon: DatabaseBackup,
    label: "Backup & Restore",
    href: "/dashboard/data-backup",
    visible: (p) => p.dataBackupAccess,
  },
];

const SidebarLogo = () => {
  const { data: settings } = useSiteSettings();
  const logoUrl = settings?.logoImage?.url;

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex flex-col items-center gap-2">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt="Logo"
            width={120}
            height={60}
            className="object-contain"
          />
        ) : (
          <Image
            src={"/images/BBurnBuilders_logo.svg"}
            alt="BBurn Builders"
            width={120}
            height={60}
            className="object-contain"
          />
        )}
        <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  isActive: boolean;
  onClick?: () => void;
  showHoverTranslate?: boolean;
}

const MenuItem = ({
  icon: Icon,
  label,
  href,
  isActive,
  onClick,
  showHoverTranslate = false,
}: MenuItemProps) => (
  <Link href={href} onClick={onClick}>
    <div
      className={`
        flex items-center gap-3 px-3 py-3 rounded-lg text-sm mb-2
        transition-all duration-200 cursor-pointer
        ${
          isActive
            ? "bg-[#2d4a8f] text-white"
            : `text-gray-700 hover:bg-gray-100 ${
                showHoverTranslate ? "hover:translate-x-1" : ""
              }`
        }
      `}
    >
      <Icon size={18} />
      <span>{label}</span>
    </div>
  </Link>
);

const RoleBadge = ({ role }: { role: UserRole | null }) => {
  if (!role) return null;
  const labels: Record<UserRole, string> = {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    VIEW_ONLY: 'View Only',
  };
  const colors: Record<UserRole, string> = {
    SUPER_ADMIN: 'bg-blue-100 text-blue-700',
    ADMIN: 'bg-green-100 text-green-700',
    VIEW_ONLY: 'bg-gray-100 text-gray-600',
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[role]}`}>
      {labels[role]}
    </span>
  );
};

const LogoutButton = ({
  showHoverTranslate = false,
}: {
  showHoverTranslate?: boolean;
}) => {
  const logout = useAuthStore((state) => state.logout);
  const { user } = useAuthStore();
  const { role } = usePermissions();

  return (
    <div className="p-3 border-t border-gray-200">
      {user && (
        <div className="flex items-center gap-2 px-3 py-2 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#2d4a8f] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {user.name?.charAt(0).toUpperCase() ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-800 truncate">{user.name}</p>
            <RoleBadge role={role} />
          </div>
        </div>
      )}
      <Link
        href="/"
        target="_blank"
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700
          hover:bg-gray-100 w-full transition-all duration-200 mb-2
          ${showHoverTranslate ? "hover:translate-x-1" : ""}
        `}
      >
        <ExternalLink size={18} />
        <span>View Site</span>
      </Link>
      <button
        onClick={logout}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700
          hover:bg-gray-100 w-full transition-all duration-200
          ${showHoverTranslate ? "hover:translate-x-1" : ""}
        `}
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const permissions = usePermissions();

  const closeSidebar = () => setIsOpen(false);

  const visibleItems = menuItems.filter((item) => item.visible(permissions));

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <div
        onClick={closeSidebar}
        className={`
          lg:hidden fixed inset-0 bg-black/50 z-40
          transition-opacity duration-300
          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[220px] bg-gray-50 border-r border-gray-200 h-screen flex-col">
        <SidebarLogo />

        <div className="flex-1 p-3">
          {visibleItems.map((item) => (
            <MenuItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
              showHoverTranslate
            />
          ))}
        </div>

        <LogoutButton showHoverTranslate />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
          lg:hidden fixed left-0 top-0 w-[280px] bg-gray-50 border-r border-gray-200
          h-screen flex flex-col z-40 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarLogo />

        <div className="flex-1 p-3">
          {visibleItems.map((item) => (
            <MenuItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isActive={pathname === item.href}
              onClick={closeSidebar}
            />
          ))}
        </div>

        <LogoutButton />
      </aside>
    </>
  );
};
