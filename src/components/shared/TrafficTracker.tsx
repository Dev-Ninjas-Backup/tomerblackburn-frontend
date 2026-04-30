'use client'

import { useEffect } from 'react'
import { io } from 'socket.io-client'

export const TrafficTracker = () => {
  useEffect(() => {
    const socket = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}/traffic`, {
      query: {
        role: 'visitor',
        page: window.location.pathname,
      },
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 3,
    })
    return () => {
      socket.disconnect()
    }
  }, [])

  return null
}
