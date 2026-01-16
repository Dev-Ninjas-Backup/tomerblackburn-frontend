'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Plus, Edit2, Trash2, Check, MoreVertical } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface CategorySidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
  categories: string[]
  onAddCategory: (name: string) => void
  onEditCategory: (oldName: string, newName: string) => void
  onDeleteCategory: (name: string) => void
}

export const CategorySidebar = ({ 
  selectedCategory, 
  onSelectCategory,
  categories,
  onAddCategory,
  onEditCategory,
  onDeleteCategory
}: CategorySidebarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editCategoryName, setEditCategoryName] = useState('')
  const [openMenuCategory, setOpenMenuCategory] = useState<string | null>(null)

  const handleSelectCategory = (category: string) => {
    onSelectCategory(category)
    setIsOpen(false)
  }

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim())
      setNewCategoryName('')
      setIsAdding(false)
    }
  }

  const handleEditCategory = (oldName: string) => {
    if (editCategoryName.trim() && editCategoryName !== oldName) {
      onEditCategory(oldName, editCategoryName.trim())
    }
    setEditingCategory(null)
    setEditCategoryName('')
  }

  const startEdit = (category: string) => {
    setEditingCategory(category)
    setEditCategoryName(category)
  }

  const CategoryItem = ({ category, isMobile = false }: { category: string, isMobile?: boolean }) => {
    const isEditing = editingCategory === category
    const isMenuOpen = openMenuCategory === category

    if (isEditing) {
      return (
        <div className="flex items-center gap-2 px-2 py-2">
          <Input
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEditCategory(category)
              if (e.key === 'Escape') setEditingCategory(null)
            }}
            className="h-8 text-sm"
            autoFocus
          />
          <Button
            size="sm"
            onClick={() => handleEditCategory(category)}
            className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
          >
            <Check size={14} />
          </Button>
        </div>
      )
    }

    return (
      <div className="relative">
        <div className="flex items-center">
          <button
            onClick={() => handleSelectCategory(category)}
            className={`
              flex-1 text-left px-4 py-3 rounded-lg text-sm transition-colors
              ${selectedCategory === category 
                ? 'bg-blue-50 text-blue-900 font-medium' 
                : 'text-gray-700 hover:bg-gray-50'
              }
            `}
          >
            {category}
          </button>
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setOpenMenuCategory(isMenuOpen ? null : category)
              }}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label="Category options"
            >
              <MoreVertical size={16} className="text-gray-500" />
            </button>
            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setOpenMenuCategory(null)}
                />
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20 py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      startEdit(category)
                      setOpenMenuCategory(null)
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Edit2 size={14} className="text-blue-600" />
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setOpenMenuCategory(null)
                      if (confirm(`Delete "${category}" category?`)) {
                        onDeleteCategory(category)
                      }
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Trash2 size={14} className="text-red-600" />
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-[#2d4a8f] text-white rounded-full shadow-lg"
        aria-label={isOpen ? "Close menu" : "Open menu"}
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
      <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <div className="space-y-1">
          {categories.map((category) => (
            <CategoryItem key={category} category={category} />
          ))}
          
          {/* Add Category */}
          {isAdding ? (
            <div className="flex items-center gap-2 px-2 py-2">
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCategory()
                  if (e.key === 'Escape') setIsAdding(false)
                }}
                placeholder="Category name"
                className="h-8 text-sm"
                autoFocus
              />
              <Button
                size="sm"
                onClick={handleAddCategory}
                className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
              >
                <Check size={14} />
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full text-left px-4 py-3 rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Plus size={16} />
              Add Category
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'tween' }}
            className="lg:hidden fixed left-0 top-0 w-[280px] bg-white border-r border-gray-200 h-screen z-40 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Categories</h3>
                <button onClick={() => setIsOpen(false)} aria-label="Close sidebar">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="space-y-1">
                {categories.map((category) => (
                  <CategoryItem key={category} category={category} isMobile />
                ))}
                
                {/* Add Category */}
                {isAdding ? (
                  <div className="flex items-center gap-2 px-2 py-2">
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddCategory()
                        if (e.key === 'Escape') setIsAdding(false)
                      }}
                      placeholder="Category name"
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={handleAddCategory}
                      className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                    >
                      <Check size={14} />
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="w-full text-left px-4 py-3 rounded-lg text-sm text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Category
                  </button>
                )}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
