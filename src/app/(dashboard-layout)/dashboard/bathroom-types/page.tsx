'use client'

import React, { useState } from 'react'
import { Navbar } from '@/components/dashboard/Navbar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { BathroomTypesTable } from './_components/BathroomTypesTable'
import { BathroomTypeModal } from './_components/BathroomTypeModal'
import { ViewDetailsModal } from './_components/ViewDetailsModal'

const BathroomTypesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedData, setSelectedData] = useState<any>(null)

  const handleAddNew = () => {
    setModalMode('create')
    setSelectedData(null)
    setIsModalOpen(true)
  }

  const handleEdit = (data: any) => {
    setModalMode('edit')
    setSelectedData(data)
    setIsModalOpen(true)
  }

  const handleViewDetails = (data: any) => {
    setSelectedData(data)
    setIsViewModalOpen(true)
  }

  return (
    <div>
      <Navbar title="Bathroom Types" />
      
      <div className="p-6">
        <div className="flex justify-end mb-6">
          <Button 
            onClick={handleAddNew}
            className="bg-[#2d4a8f] hover:bg-[#243a73] text-white"
          >
            <Plus size={18} className="mr-2" />
            Add New Type
          </Button>
        </div>

        <BathroomTypesTable onEdit={handleEdit} onViewDetails={handleViewDetails} />
      </div>

      <BathroomTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        data={selectedData}
      />

      <ViewDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        data={selectedData}
      />
    </div>
  )
}

export default BathroomTypesPage
