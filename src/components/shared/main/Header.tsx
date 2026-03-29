"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogIn,
  UserCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { formatRole } from "@/utils/formatRole";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { isAuthenticated, user, logout, fetchCurrentUser } = useAuthStore();
  const { data: settings } = useSiteSettings();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch fresh user data on mount
  React.useEffect(() => {
    if (isAuthenticated) {
      fetchCurrentUser();
    }
  }, [isAuthenticated, fetchCurrentUser]);

  const loggedIn = mounted && isAuthenticated;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Estimator", href: "/estimator" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact Us", href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* CTA Banner */}
      {settings?.ctaBannerEnabled && (
        <Link href="/estimator">
          <div className="bg-[#283878] text-white py-3 px-4 text-sm hover:bg-[#1f2d5f] transition-colors cursor-pointer">
            <div className="container mx-auto flex justify-center items-center gap-2">
              <span className="font-medium">
                {settings?.ctaBannerText || "Get Your Free Live Estimate Now!"}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </Link>
      )}

      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-8 md:h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-24 h-24 md:w-36 md:h-36">
                <Image
                  src={
                    settings?.logoImage?.url || "/images/BBurnBuilders_logo.svg"
                  }
                  alt={settings?.siteTitle || "BBurn Builders Logo"}
                  fill
                  className="object-contain"
                />
              </div>
              {/* <span className="text-xs font-medium text-[#283878] uppercase tracking-wide">
                BBURN BUILDERS
              </span> */}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 lg:space-x-14">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lg transition-colors relative ${
                    isActive(link.href)
                      ? "text-[#283878] font-semibold"
                      : "text-gray-600 font-light hover:text-[#283878]"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-[#283878] rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="hidden md:flex items-center relative">
              {loggedIn ? (
                <>
                  <button
                    aria-label="User account"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#283878] text-white flex items-center justify-center font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatRole(user?.role)}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown Menu - Logged In */}
                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      />

                      <div className="absolute right-0 top-14 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {user?.email}
                          </p>
                        </div>

                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>

                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors w-full"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 bg-[#283878] text-white rounded-lg hover:bg-[#2d3f6c] transition-colors font-medium"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-60 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 left-0 z-70 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#283878]">
          <div className="relative w-20 h-20">
            <Image
              src={settings?.logoImage?.url || "/images/BBurnBuilders_logo.svg"}
              alt={settings?.siteTitle || "BBurn Builders Logo"}
              fill
              className="object-contain brightness-0 invert"
            />
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={18} className="text-white" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-[#283878] text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#283878]"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* User section at bottom */}
        <div className="border-t border-gray-100 px-4 py-4">
          {loggedIn ? (
            <>
              <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-[#283878] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {formatRole(user?.role)}
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-gray-100 hover:text-[#283878] transition-colors mb-1"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#283878] text-white rounded-xl text-sm font-medium hover:bg-[#2d3f6c] transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
