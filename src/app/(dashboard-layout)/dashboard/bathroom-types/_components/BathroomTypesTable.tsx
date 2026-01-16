'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
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
  { id: 'FP', name: 'Four Piece', description: 'Toilet + Sink + Shower + Tub', basePrice: '$18,500' },
  { id: 'TPS', name: 'Three Piece - Shower', description: 'Toilet + Sink + Shower', basePrice: '$18,500' },
  { id: 'TPT', name: 'Three Piece - Tub', description: 'Toilet + Sink + Tub', basePrice: '$18,500' },
  { id: 'TP', name: 'Two Piece (Powder Room)', description: 'Toilet + Sink', basePrice: '$18,500' },
]

interface BathroomTypesTableProps {
  onEdit: (data: typeof mockData[0]) => void
  onViewDetails: (data: typeof mockData[0]) => void
}

export const BathroomTypesTable = ({ onEdit, onViewDetails }: BathroomTypesTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search by name and Id"
              className="pl-10"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              12 results
            </span>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-gray-600">{row.description}</TableCell>
                    <TableCell className="font-semibold">{row.basePrice}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewDetails(row)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rows per page</span>
              <select className="border rounded px-2 py-1 text-sm" aria-label="Rows per page">
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
