'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'

interface CostCodeCardProps {
  code: string
  title: string
  description: string
  type: 'WHITE' | 'BLUE' | 'GREEN' | 'ORANGE' | 'YELLOW' | 'RED' | 'PURPLE'
  price: string
  unit: string
  isActive: boolean
  onEdit: () => void
  onDelete: () => void
}

const typeColors = {
  WHITE: 'bg-white border-gray-200',
  BLUE: 'bg-blue-50 border-blue-200',
  GREEN: 'bg-green-50 border-green-200',
  ORANGE: 'bg-orange-50 border-orange-200',
  YELLOW: 'bg-yellow-50 border-yellow-200',
  RED: 'bg-red-50 border-red-200',
  PURPLE: 'bg-purple-50 border-purple-200'
}

const typeBadgeColors = {
  WHITE: 'bg-gray-100 text-gray-700',
  BLUE: 'bg-blue-100 text-blue-700',
  GREEN: 'bg-green-100 text-green-700',
  ORANGE: 'bg-orange-100 text-orange-700',
  YELLOW: 'bg-yellow-100 text-yellow-700',
  RED: 'bg-red-100 text-red-700',
  PURPLE: 'bg-purple-100 text-purple-700'
}

export const CostCodeCard = ({ 
  code, 
  title, 
  description, 
  type, 
  price, 
  unit, 
  isActive,
  onEdit,
  onDelete 
}: CostCodeCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-4 border-2 ${typeColors[type]}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-gray-900">{title}</h3>
              <Badge className={`text-xs ${typeBadgeColors[type]}`}>{type}</Badge>
              <span className="text-xs text-gray-500">{code}</span>
              {isActive && (
                <Badge className="bg-green-100 text-green-700 text-xs">● Active</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{description}</p>
            {type === 'WHITE' && (
              <p className="text-xs text-gray-500 italic">Included in base price</p>
            )}
            {type === 'ORANGE' && (
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-white rounded border">Standard</span>
                <span className="text-xs px-2 py-1 bg-white rounded border">Mid-Range (+$500)</span>
                <span className="text-xs px-2 py-1 bg-white rounded border">Premium (+$1200)</span>
              </div>
            )}
          </div>
          
          <div className="flex items-start gap-4 ml-4">
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">{price}</p>
              <p className="text-xs text-gray-500">{unit}</p>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" onClick={onEdit}>
                <Edit size={16} className="text-blue-600" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onDelete}>
                <Trash2 size={16} className="text-red-600" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
