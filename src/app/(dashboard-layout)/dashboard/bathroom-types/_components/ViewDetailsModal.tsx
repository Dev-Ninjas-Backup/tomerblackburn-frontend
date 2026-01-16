'use client'

import React from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface ViewDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    id: string
    name: string
    description: string
    basePrice: string
  } | null
}

export const ViewDetailsModal = ({ isOpen, onClose, data }: ViewDetailsModalProps) => {
  if (!data) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Bathroom Type Details</DialogTitle>
        </DialogHeader>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Image */}
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="/images/bathroom-hero.jpg"
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Code</p>
              <p className="text-lg font-semibold text-gray-900">{data.id}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Name</p>
              <p className="text-lg font-semibold text-gray-900">{data.name}</p>
            </div>

            <div className="col-span-2">
              <p className="text-sm text-gray-500 mb-1">Description</p>
              <p className="text-base text-gray-700">{data.description}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Base Price</p>
              <p className="text-2xl font-bold text-[#2d4a8f]">{data.basePrice}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Display Order</p>
              <p className="text-base text-gray-700">1</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Created Date</p>
              <p className="text-base text-gray-700">12 Feb 2025</p>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
