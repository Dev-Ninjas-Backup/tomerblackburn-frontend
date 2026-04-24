'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useRevenueTrend } from '@/hooks/useDashboard'

export const RevenueChart = () => {
  const [months, setMonths] = useState(12);
  const { data: revenueTrend, isLoading } = useRevenueTrend(months);

  const chartData = revenueTrend?.labels.map((label, index) => ({
    month: label,
    value: revenueTrend.totals[index],
  })) || [];

  const totalRevenue = revenueTrend?.totals.reduce((sum, val) => sum + val, 0) || 0;

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
              <p className="text-3xl font-bold text-gray-900">
                {isLoading ? '...' : `$${totalRevenue.toLocaleString()}`}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Last {months} {months === 1 ? 'Month' : 'Months'}
              </p>
            </div>
            <Select value={months.toString()} onValueChange={(val) => setMonths(Number(val))}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Month</SelectItem>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
                <SelectItem value="24">2 Years</SelectItem>
                <SelectItem value="36">3 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            {isLoading ? (
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-gray-500">Loading chart...</div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#999"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#999"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${(Number(value) || 0).toLocaleString()}`, 'Revenue']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
