'use client'

import React from 'react'
import { Bell } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavbarProps {
  title: string
}

export const Navbar = ({ title }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell size={20} className="text-gray-700" />
      </motion.button>
    </header>
  )
}
