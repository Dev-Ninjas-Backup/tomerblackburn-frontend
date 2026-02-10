'use client'

import React from 'react'
import { Navbar } from '@/components/dashboard/Navbar'
import { StatsCard } from '@/app/(dashboard-layout)/dashboard/_components/StatsCard'
import { RevenueChart } from '@/app/(dashboard-layout)/dashboard/_components/RevenueChart'
import { SubmissionsTable } from '@/app/(dashboard-layout)/dashboard/_components/SubmissionsTable'
import { RecentContactsTable } from '@/app/(dashboard-layout)/dashboard/_components/RecentContactsTable'
import { useDashboardSummary } from '@/hooks/useDashboard'

const DashboardPage = () => {
  const { data: summary, isLoading } = useDashboardSummary();

  return (
    <div>
      <Navbar title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Submissions" 
            value={isLoading ? '...' : summary?.totalSubmissions.toString() || '0'} 
            delay={0} 
          />
          <StatsCard 
            title="Pending" 
            value={isLoading ? '...' : summary?.pending.toString() || '0'} 
            color="text-orange-600" 
            delay={0.1} 
          />
          <StatsCard 
            title="Processing" 
            value={isLoading ? '...' : summary?.processing.toString() || '0'} 
            color="text-blue-600" 
            delay={0.2} 
          />
          <StatsCard 
            title="Completed" 
            value={isLoading ? '...' : summary?.completed.toString() || '0'} 
            color="text-green-600" 
            delay={0.3} 
          />
        </div>

        {/* Revenue Chart */}
        <RevenueChart />

        {/* Submissions Table */}
        <SubmissionsTable />

        {/* Recent Contacts Table */}
        <RecentContactsTable />
      </div>
    </div>
  )
}

export default DashboardPage
