'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Trash2 } from 'lucide-react'

interface CostCodeModalProps {
  isOpen: boolean
  onClose: () => void
  mode: 'create' | 'edit'
}

export const CostCodeModal = ({ isOpen, onClose, mode }: CostCodeModalProps) => {
  const [formData, setFormData] = useState({
    costCode: '',
    bathroomType: '',
    category: '',
    title: '',
    description: '',
    questionType: '',
    unitCost: '',
    unit: 'Each',
    isActive: true
  })

  const [dropdownOptions, setDropdownOptions] = useState([
    { price: '0', label: 'Standard' },
    { price: '500', label: 'Mid-Range' },
    { price: '1200', label: 'Premium' }
  ])

  const addOption = () => {
    setDropdownOptions([...dropdownOptions, { price: '', label: '' }])
  }

  const removeOption = (index: number) => {
    setDropdownOptions(dropdownOptions.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData, dropdownOptions)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {mode === 'create' ? 'Add New Cost Code' : 'Edit Cost Code'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cost Code *</Label>
              <Input
                value={formData.costCode}
                onChange={(e) => setFormData({...formData, costCode: e.target.value})}
                placeholder="FP-001"
              />
            </div>

            <div className="space-y-2">
              <Label>Bathroom Type *</Label>
              <Select 
                value={formData.bathroomType}
                onValueChange={(value) => setFormData({...formData, bathroomType: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Bathroom Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FP">Four Piece</SelectItem>
                  <SelectItem value="TPS">Three Piece - Shower</SelectItem>
                  <SelectItem value="TPT">Three Piece - Tub</SelectItem>
                  <SelectItem value="TP">Two Piece</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Category *</Label>
            <Select 
              value={formData.category}
              onValueChange={(value) => setFormData({...formData, category: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Demolition">Demolition</SelectItem>
                <SelectItem value="Flooring">Flooring</SelectItem>
                <SelectItem value="Vanity">Vanity</SelectItem>
                <SelectItem value="Shower">Shower</SelectItem>
                <SelectItem value="Bathtub">Bathtub</SelectItem>
                <SelectItem value="Lighting">Lighting</SelectItem>
                <SelectItem value="Fixtures">Fixtures & Hardware</SelectItem>
                <SelectItem value="Walls">Walls & Ceiling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title *</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Install New Toilet"
            />
          </div>

          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Detailed description of the work..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Question Type *</Label>
            <Select 
              value={formData.questionType}
              onValueChange={(value) => setFormData({...formData, questionType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Question Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WHITE">WHITE (Base/Included)</SelectItem>
                <SelectItem value="BLUE">BLUE (Yes/No Toggle)</SelectItem>
                <SelectItem value="GREEN">GREEN (Data Input)</SelectItem>
                <SelectItem value="ORANGE">ORANGE (Dropdown Options)</SelectItem>
                <SelectItem value="YELLOW">YELLOW (Data Input)</SelectItem>
                <SelectItem value="RED">RED (Data Input)</SelectItem>
                <SelectItem value="PURPLE">PURPLE (Data Input)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown Options - Only show for ORANGE type */}
          {formData.questionType === 'ORANGE' && (
            <div className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Dropdown Options</Label>
                <Button type="button" onClick={addOption} size="sm" className="bg-[#2d4a8f]">
                  + Add Option
                </Button>
              </div>

              {dropdownOptions.map((option, index) => (
                <div key={index} className="grid grid-cols-[1fr_2fr_auto] gap-3 items-end">
                  <div className="space-y-1">
                    <Label className="text-xs">Price</Label>
                    <Input
                      type="number"
                      value={option.price}
                      onChange={(e) => {
                        const newOptions = [...dropdownOptions]
                        newOptions[index].price = e.target.value
                        setDropdownOptions(newOptions)
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Label</Label>
                    <Input
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...dropdownOptions]
                        newOptions[index].label = e.target.value
                        setDropdownOptions(newOptions)
                      }}
                      placeholder="Standard"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeOption(index)}
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Unit Cost *</Label>
              <Input
                type="number"
                value={formData.unitCost}
                onChange={(e) => setFormData({...formData, unitCost: e.target.value})}
                placeholder="0"
              />
            </div>

            <div className="space-y-2">
              <Label>Unit *</Label>
              <Select 
                value={formData.unit}
                onValueChange={(value) => setFormData({...formData, unit: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Each">Each</SelectItem>
                  <SelectItem value="Per Sqft">Per Sqft</SelectItem>
                  <SelectItem value="Per Lot">Per Lot</SelectItem>
                  <SelectItem value="Per Upgrade">Per Upgrade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between border rounded-lg p-4">
            <Label>Is Active</Label>
            <Switch 
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
            />
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
              {mode === 'create' ? 'Create Cost Code' : 'Update Cost Code'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
