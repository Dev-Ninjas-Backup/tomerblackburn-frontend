'use client'

import React from 'react'
import { Navbar } from '@/components/dashboard/Navbar'
import { LiveTrafficWidget } from '@/app/(dashboard-layout)/dashboard/_components/LiveTrafficWidget'
import { SessionsTable } from './_components/SessionsTable'
import { useTrafficStats } from '@/hooks/useTraffic'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

const StatCard = ({
  label,
  value,
  color = 'text-gray-900',
  delay = 0,
}: {
  label: string
  value: string | number
  color?: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.3 }}
  >
    <Card className="bg-white">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500 mb-2">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </CardContent>
    </Card>
  </motion.div>
)

const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

const TrafficPage = () => {
  const { data: stats, isLoading } = useTrafficStats()

  return (
    <div>
      <Navbar title="Live Traffic" />

      <div className="p-6 space-y-6">
        {/* Live socket widget */}
        <LiveTrafficWidget />

        {/* DB-backed aggregate stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Total Sessions (All-time)"
            value={isLoading ? '…' : (stats?.totalSessions ?? 0).toLocaleString()}
            color="text-gray-900"
            delay={0}
          />
          <StatCard
            label="Sessions Today"
            value={isLoading ? '…' : (stats?.todaySessions ?? 0).toLocaleString()}
            color="text-blue-600"
            delay={0.1}
          />
          <StatCard
            label="Avg. Duration (All-time)"
            value={isLoading ? '…' : formatDuration(stats?.avgDurationSeconds ?? 0)}
            color="text-green-600"
            delay={0.2}
          />
        </div>

        {/* Top pages + top referrers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Top Pages</h3>
              {isLoading ? (
                <p className="text-sm text-gray-400">Loading…</p>
              ) : (stats?.topPages ?? []).length === 0 ? (
                <p className="text-sm text-gray-400">No data yet</p>
              ) : (
                <ul className="space-y-2">
                  {(stats?.topPages ?? []).map((p) => (
                    <li key={p.page} className="flex items-center justify-between text-sm">
                      <span className="font-mono text-gray-700 truncate max-w-[200px]">{p.page}</span>
                      <span className="text-gray-500 ml-2">{p.visits} visit{p.visits !== 1 ? 's' : ''}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardContent className="p-6">
              <h3 className="text-base font-semibold text-gray-800 mb-4">Top Referrers</h3>
              {isLoading ? (
                <p className="text-sm text-gray-400">Loading…</p>
              ) : (stats?.topReferrers ?? []).length === 0 ? (
                <p className="text-sm text-gray-400">No data yet</p>
              ) : (
                <ul className="space-y-2">
                  {(stats?.topReferrers ?? []).map((r) => (
                    <li key={r.referrer} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700 truncate max-w-[200px]">{r.referrer}</span>
                      <span className="text-gray-500 ml-2">{r.visits} visit{r.visits !== 1 ? 's' : ''}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Session history table */}
        <SessionsTable />
      </div>
    </div>
  )
}

export default TrafficPage
