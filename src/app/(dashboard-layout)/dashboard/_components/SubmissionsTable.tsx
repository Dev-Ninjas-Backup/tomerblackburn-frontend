'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Trash2, FileText, ArrowRight } from 'lucide-react'
import { useSubmissions, useDeleteSubmission } from '@/hooks/useSubmissions'
import { SubmissionStatus } from '@/types/submission.types'
import SubmissionDetailModal from '@/app/(dashboard-layout)/dashboard/submissions/_components/SubmissionDetailModal'
import { useRouter } from 'next/navigation'

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

export const SubmissionsTable = () => {
  const router = useRouter();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);
  const { data: response, isLoading } = useSubmissions(undefined, 1, 5);
  const deleteMutation = useDeleteSubmission();

  const submissions = response?.data || [];

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleViewDetails = (id: string) => {
    setSelectedSubmission(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recent Submissions</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/dashboard/submissions')}
              className="flex items-center gap-2"
            >
              View All
              <ArrowRight size={16} />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission #</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">Loading...</td>
                  </tr>
                ) : submissions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No submissions found</td>
                  </tr>
                ) : (
                  submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {submission.submissionNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div>{submission.clientName}</div>
                        <div className="text-xs text-gray-500">{submission.clientEmail}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.service?.name || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${submission.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${STATUS_COLORS[submission.status]}`}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleViewDetails(submission.id)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                          {submission.pdfUrl && (
                            <a
                              href={submission.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:text-red-900"
                              title="Download PDF"
                            >
                              <FileText size={16} />
                            </a>
                          )}
                          <button
                            onClick={() => handleDelete(submission.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedSubmission && (
        <SubmissionDetailModal
          submissionId={selectedSubmission}
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </motion.div>
  )
}
