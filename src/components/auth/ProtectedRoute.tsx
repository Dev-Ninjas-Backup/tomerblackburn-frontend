"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { usePermissions, UserRole } from "@/hooks/usePermissions";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const { role } = usePermissions();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    checkAuth();
    setIsInitialized(true);
  }, [checkAuth]);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (requiredRoles && role && !requiredRoles.includes(role)) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isInitialized, role, requiredRoles, router]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  if (requiredRoles && role && !requiredRoles.includes(role)) return null;

  return <>{children}</>;
}
