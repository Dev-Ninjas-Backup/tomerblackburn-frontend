'use client'

import React from 'react'
import { Navbar } from '@/components/dashboard/Navbar'
import { StatsCard } from '@/app/(dashboard-layout)/dashboard/_components/StatsCard'
import { RevenueChart } from '@/app/(dashboard-layout)/dashboard/_components/RevenueChart'
import { SubmissionsTable } from '@/app/(dashboard-layout)/dashboard/_components/SubmissionsTable'

const DashboardPage = () => {
  return (
    <div>
      <Navbar title="Dashboard" />
      
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Submission" value="10" delay={0} />
          <StatsCard title="Pending" value="10" color="text-orange-600" delay={0.1} />
          <StatsCard title="Processing" value="10" color="text-blue-600" delay={0.2} />
          <StatsCard title="Completed" value="10" color="text-green-600" delay={0.3} />
        </div>

        {/* Revenue Chart */}
        <RevenueChart />

        {/* Submissions Table */}
        <SubmissionsTable />
      </div>
    </div>
  )
}

export default DashboardPage
