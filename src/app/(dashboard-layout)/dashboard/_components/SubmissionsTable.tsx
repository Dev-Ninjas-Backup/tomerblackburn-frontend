'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MoreVertical, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const mockData = [
  { id: 'EST-2025-001', name: 'John Doe', phone: '+8801787939177', address: 'Address\nZip-1230', type: 'Four Piece', amount: '$18,500', status: 'Processing', date: '12 Feb 2025' },
  { id: 'EST-2025-001', name: 'John Doe', phone: '+8801787939177', address: 'Address\nZip-1230', type: 'Four Piece', amount: '$18,500', status: 'Pending', date: '12 Feb 2025' },
  { id: 'EST-2025-001', name: 'John Doe', phone: '+8801787939177', address: 'Address\nZip-1230', type: 'Four Piece', amount: '$18,500', status: 'Completed', date: '12 Feb 2025' },
  { id: 'EST-2025-001', name: 'John Doe', phone: '+8801787939177', address: 'Address\nZip-1230', type: 'Four Piece', amount: '$18,500', status: 'Completed', date: '12 Feb 2025' },
  { id: 'EST-2025-001', name: 'John Doe', phone: '+8801787939177', address: 'Address\nZip-1230', type: 'Four Piece', amount: '$18,500', status: 'Completed', date: '12 Feb 2025' },
]

export const SubmissionsTable = () => {
  const [activeTab, setActiveTab] = useState('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'text-blue-600 bg-blue-50'
      case 'Pending': return 'text-orange-600 bg-orange-50'
      case 'Completed': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardContent className="p-6">
          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All (6)</TabsTrigger>
              <TabsTrigger value="processing">Processing (6)</TabsTrigger>
              <TabsTrigger value="pending">Pending (6)</TabsTrigger>
              <TabsTrigger value="completed">Completed (6)</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name, phone, address and Id"
              className="pl-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              12 results
            </span>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Id</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{row.name}</p>
                        <p className="text-sm text-gray-500">{row.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-pre-line text-sm">{row.address}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell className="font-semibold">{row.amount}</TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page</span>
              < select className="border rounded px-2 py-1 text-sm" aria-label="Rows per page">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Page 1 of 7</span>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm"><ChevronsLeft size={16} /></Button>
                <Button variant="ghost" size="sm"><ChevronLeft size={16} /></Button>
                <Button variant="ghost" size="sm"><ChevronRight size={16} /></Button>
                <Button variant="ghost" size="sm"><ChevronsRight size={16} /></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
