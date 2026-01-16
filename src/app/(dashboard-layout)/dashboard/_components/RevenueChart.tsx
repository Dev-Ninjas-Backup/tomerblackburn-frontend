'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { month: 'Jan', value: 4000 },
  { month: 'Feb', value: 4500 },
  { month: 'Mar', value: 5000 },
  { month: 'Apr', value: 5500 },
  { month: 'May', value: 6000 },
  { month: 'Jun', value: 6500 },
  { month: 'Jul', value: 7000 },
  { month: 'Aug', value: 7500 },
  { month: 'Sep', value: 7000 },
  { month: 'Oct', value: 6500 },
  { month: 'Nov', value: 6000 },
  { month: 'Dec', value: 5500 },
]

export const RevenueChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">$12,500</p>
              <p className="text-sm text-gray-500 mt-1">
                Last 30 Days <span className="text-green-600 ml-2">+12%</span>
              </p>
            </div>
            <Select defaultValue="monthly">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <div className="absolute top-0 right-1/2 transform translate-x-1/2 bg-[#2d4a8f] text-white px-4 py-2 rounded-lg text-sm z-10">
              Total Earned<br />
              <span className="font-bold">80.1% Overall</span>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#999"
                  style={{ fontSize: '12px' }}
                />
                <YAxis hide />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
