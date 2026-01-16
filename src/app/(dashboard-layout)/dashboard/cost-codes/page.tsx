'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/dashboard/Navbar'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'
import { CategorySidebar } from './_components/CategorySidebar'
import { CostCodeCard } from './_components/CostCodeCard'
import { CostCodeModal } from './_components/CostCodeModal'
import { EmptyState } from './_components/EmptyState'

const mockData = [
  {
    id: 1,
    code: 'FP-FL-1',
    title: 'Floor Tile Installation',
    description: 'Install tile flooring throughout bathroom',
    type: 'WHITE' as const,
    price: '$0',
    unit: 'Per Lot',
    category: 'Flooring',
    isActive: true
  },
  {
    id: 2,
    code: 'FP-D-1',
    title: 'Heated Floor',
    description: 'Add radiant floor heating system',
    type: 'BLUE' as const,
    price: '$0',
    unit: 'Per Sqft',
    category: 'Flooring',
    isActive: false
  },
  {
    id: 3,
    code: 'FP-D-1',
    title: 'Floor Tile Selection',
    description: 'Choose tile style and material',
    type: 'GREEN' as const,
    price: '$0',
    unit: 'Per Upgrade',
    category: 'Flooring',
    isActive: true
  },
  {
    id: 4,
    code: 'FP-D-1',
    title: 'Floor Tile Selection',
    description: 'Choose tile style and material',
    type: 'ORANGE' as const,
    price: '$0',
    unit: 'Per Upgrade',
    category: 'Flooring',
    isActive: true
  },
  {
    id: 5,
    code: 'FP-FL-4',
    title: 'Floor Area (sqft)',
    description: 'Enter bathroom floor area in square feet',
    type: 'YELLOW' as const,
    price: '$0',
    unit: 'Per Sqft',
    category: 'Flooring',
    isActive: true
  },
  {
    id: 6,
    code: 'FP-FL-4',
    title: 'Floor Area (sqft)',
    description: 'Enter bathroom floor area in square feet',
    type: 'RED' as const,
    price: '$0',
    unit: 'Per Sqft',
    category: 'Flooring',
    isActive: true
  },
  {
    id: 7,
    code: 'FP-FL-4',
    title: 'Floor Area (sqft)',
    description: 'Enter bathroom floor area in square feet',
    type: 'PURPLE' as const,
    price: '$0',
    unit: 'Per Sqft',
    category: 'Flooring',
    isActive: true
  }
]

const CostCodesPage = () => {
  const [selectedBathroomType, setSelectedBathroomType] = useState('FP')
  const [selectedCategory, setSelectedCategory] = useState('Flooring')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [costCodes, setCostCodes] = useState(mockData)
  const [categories, setCategories] = useState([
    'Demolition',
    'Flooring',
    'Vanity',
    'Shower',
    'Bathtub',
    'Lighting',
    'Fixtures & Hardware',
    'Walls & Ceiling'
  ])

  const filteredCostCodes = costCodes.filter(code => code.category === selectedCategory)
  const hasData = filteredCostCodes.length > 0

  const handleAddNew = () => {
    setModalMode('create')
    setIsModalOpen(true)
  }

  const handleEdit = () => {
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setCostCodes(costCodes.filter(code => code.id !== id))
  }

  const handleAddCategory = (name: string) => {
    setCategories([...categories, name])
  }

  const handleEditCategory = (oldName: string, newName: string) => {
    setCategories(categories.map(cat => cat === oldName ? newName : cat))
    if (selectedCategory === oldName) {
      setSelectedCategory(newName)
    }
  }

  const handleDeleteCategory = (name: string) => {
    setCategories(categories.filter(cat => cat !== name))
    if (selectedCategory === name) {
      setSelectedCategory(categories[0] || '')
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar title="Cost Codes" />
      
      <div className="flex flex-1 overflow-hidden">
        <CategorySidebar 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={categories}
          onAddCategory={handleAddCategory}
          onEditCategory={handleEditCategory}
          onDeleteCategory={handleDeleteCategory}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Select value={selectedBathroomType} onValueChange={setSelectedBathroomType}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FP">Four Piece</SelectItem>
                  <SelectItem value="TPS">Three Piece - Shower</SelectItem>
                  <SelectItem value="TPT">Three Piece - Tub</SelectItem>
                  <SelectItem value="TP">Two Piece</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={handleAddNew}
                className="bg-[#2d4a8f] hover:bg-[#243a73] text-white"
              >
                <Plus size={18} className="mr-2" />
                Add New Cost Code
              </Button>
            </div>

            {hasData ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{selectedCategory}</h2>
                <div className="space-y-3">
                  {filteredCostCodes.map((code) => (
                    <CostCodeCard
                      key={code.id}
                      code={code.code}
                      title={code.title}
                      description={code.description}
                      type={code.type}
                      price={code.price}
                      unit={code.unit}
                      isActive={code.isActive}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(code.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState onAddNew={handleAddNew} />
            )}
          </div>
        </main>
      </div>

      <CostCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
      />
    </div>
  )
}

export default CostCodesPage
