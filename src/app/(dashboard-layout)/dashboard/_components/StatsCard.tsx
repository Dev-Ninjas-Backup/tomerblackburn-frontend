'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface StatsCardProps {
  title: string
  value: string | number
  color?: string
  delay?: number
}

export const StatsCard = ({ title, value, color = 'text-gray-900', delay = 0 }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardContent className="p-6">
          <p className="text-sm text-gray-600 mb-2">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
