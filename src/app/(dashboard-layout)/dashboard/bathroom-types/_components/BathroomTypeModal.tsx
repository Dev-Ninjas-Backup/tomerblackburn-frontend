'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Upload } from 'lucide-react'

interface BathroomTypeModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  data?: {
    id: string
    name: string
    description: string
    basePrice: string
  }
}

export const BathroomTypeModal = ({ isOpen, onClose, mode, data }: BathroomTypeModalProps) => {
  const [formData, setFormData] = useState({
    code: data?.id || '',
    name: data?.name || '',
    description: data?.description || '',
    basePrice: data?.basePrice?.replace('$', '').replace(',', '') || '',
    displayOrder: '1',
    active: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === 'create' ? 'Add New Bathroom Type' : 'Edit Bathroom Type'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">Code *</Label>
              <Select 
                value={formData.code} 
                onValueChange={(value) => setFormData({...formData, code: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="FP-Four Piece" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FP">FP-Four Piece</SelectItem>
                  <SelectItem value="TPS">TPS-Three Piece Shower</SelectItem>
                  <SelectItem value="TPT">TPT-Three Piece Tub</SelectItem>
                  <SelectItem value="TP">TP-Two Piece</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name*</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Four Piece"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Toilet + Sink + Shower + Tub"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="basePrice">Base Price *</Label>
              <Input
                id="basePrice"
                type="number"
                value={formData.basePrice}
                onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order *</Label>
              <Input
                id="displayOrder"
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({...formData, displayOrder: e.target.value})}
                placeholder="1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload Image URL *</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-sm text-gray-600">
                Drag and drop or <span className="text-blue-600 underline">browse</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="active" 
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({...formData, active: checked as boolean})}
            />
            <Label htmlFor="active" className="cursor-pointer">Active</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-[#2d4a8f] hover:bg-[#243a73] text-white"
            >
              {mode === 'create' ? 'Create Bathroom Type' : 'Update Bathroom Type'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
