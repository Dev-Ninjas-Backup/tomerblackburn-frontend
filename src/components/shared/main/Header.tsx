"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();

  // TODO: Replace with actual auth state
  const isLoggedIn = false;

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
      {/* Top Bar */}
      <div className="bg-[#283878] text-white py-2.5 px-4 text-sm ">
        <div className="container mx-auto flex justify-center items-center gap-8">
          <span>Contact us for a FREE Quote</span>
          <a
            href="tel:7734039950"
            className="hover:underline flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            (773) 403-9950
          </a>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-24 h-24 md:w-36 md:h-36">
                <Image
                  src="/images/BBurnBuilders_logo.svg"
                  alt="BBurn Builders Logo"
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
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* User Icon */}
            <div className="hidden md:flex items-center relative">
              <button
                aria-label="User account"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 rounded-full bg-[#283878] text-white flex items-center justify-center hover:bg-[#2d3f6c] transition-colors"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />

                  <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/login"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </div>
                </>
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

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t animate-in slide-in-from-top-5 duration-300">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-2 ${
                    isActive(link.href)
                      ? "text-[#283878] font-semibold"
                      : "text-gray-600 hover:text-[#283878]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile User Menu */}
              <div className="border-t mt-4 pt-4">
                <Link
                  href="/login"
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#283878]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 py-2 text-gray-700 hover:text-[#283878]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
