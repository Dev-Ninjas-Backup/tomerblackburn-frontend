'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Bath, 
  DollarSign, 
  Globe, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Bath, label: 'Bathroom Types', href: '/dashboard/bathroom-types' },
  { icon: DollarSign, label: 'Cost Codes', href: '/dashboard/cost-codes' },
  { icon: Globe, label: 'Web', href: '/dashboard/web' },
  { icon: Users, label: 'All Contacts', href: '/dashboard/contacts' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image
            src="/images/BBurnBuilders_logo.svg"
            alt="BBurn Builders"
            width={24}
            height={24}
          />
          <div>
            <h2 className="text-sm font-semibold text-gray-900">BBurn Builders</h2>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                  transition-colors cursor-pointer
                  ${isActive 
                    ? 'bg-[#2d4a8f] text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200">
        <motion.button
          whileHover={{ x: 4 }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 w-full transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </motion.button>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[220px] bg-gray-50 border-r border-gray-200 h-screen flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween' }}
            className="lg:hidden fixed left-0 top-0 w-[280px] bg-gray-50 border-r border-gray-200 h-screen flex flex-col z-40"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
