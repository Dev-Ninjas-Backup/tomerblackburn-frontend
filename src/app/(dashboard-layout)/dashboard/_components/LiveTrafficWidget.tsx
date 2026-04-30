'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTrafficSocket } from '@/hooks/useTrafficSocket'

const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

export const LiveTrafficWidget = () => {
  const { stats, connected } = useTrafficSocket('admin')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-800">
              Live Traffic
            </CardTitle>
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}
              />
              <span className="text-xs text-gray-500">
                {connected ? 'Live' : 'Connecting…'}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Visitors Online</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.liveVisitors}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Visitors</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.totalVisitors.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Avg. Duration</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatDuration(stats.avgDuration)}
              </p>
            </div>
          </div>
          {stats.totalTracked > 0 && (
            <p className="text-xs text-gray-400 mt-3">
              Based on {stats.totalTracked} session{stats.totalTracked !== 1 ? 's' : ''}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
