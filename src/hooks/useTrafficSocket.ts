'use client'

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface TrafficStats {
  liveVisitors: number
  avgDuration: number
  totalVisitors: number
  totalTracked: number
}

const DEFAULT_STATS: TrafficStats = { liveVisitors: 0, avgDuration: 0, totalVisitors: 0, totalTracked: 0 }

export const useTrafficSocket = (role: 'visitor' | 'admin' = 'admin') => {
  const [stats, setStats] = useState<TrafficStats>(DEFAULT_STATS)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const socket: Socket = io(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/traffic`,
      {
        query: { role },
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      },
    )

    socket.on('connect', () => setConnected(true))
    socket.on('disconnect', () => setConnected(false))
    socket.on('traffic:update', (data: TrafficStats) => setStats(data))

    return () => {
      socket.disconnect()
    }
  }, [role])

  return { stats, connected }
}
