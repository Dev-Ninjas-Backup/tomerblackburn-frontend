'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

interface EmptyStateProps {
  onAddNew: () => void
}

export const EmptyState = ({ onAddNew }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="text-center space-y-4">
        <div className="w-64 h-64 mx-auto mb-4 relative">
          <Image
            src="/images/costcodeemptystate.svg"
            alt="No Results Found"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">No Results Found!</h2>
        <p className="text-gray-500">Start by adding your first cost code</p>
        <Button 
          onClick={onAddNew}
          className="bg-[#2d4a8f] hover:bg-[#243a73] text-white mt-4"
        >
          <Plus size={18} className="mr-2" />
          Add New Cost Code
        </Button>
      </div>
    </div>
  )
}
