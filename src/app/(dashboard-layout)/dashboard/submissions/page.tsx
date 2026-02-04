'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/dashboard/Navbar';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, FileText, Download } from 'lucide-react';
import { useSubmissions, useDeleteSubmission, useUpdateSubmissionStatus } from '@/hooks/useSubmissions';
import { SubmissionStatus } from '@/types/submission.types';
import SubmissionDetailModal from './_components/SubmissionDetailModal';

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PROCESSING: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

const SubmissionsPage = () => {
  const [filterStatus, setFilterStatus] = useState<SubmissionStatus | ''>('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data: response, isLoading } = useSubmissions(filterStatus || undefined, page, limit);
  const deleteMutation = useDeleteSubmission();
  const updateStatusMutation = useUpdateSubmissionStatus();
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null);

  const submissions = response?.data;
  const pagination = response?.pagination;

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (id: string, status: SubmissionStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleViewDetails = (id: string) => {
    setSelectedSubmission(id);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar title="Submissions" />
        <div className="p-6 text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Submissions" />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold">Customer Submissions</h2>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as SubmissionStatus | '')}
              className="border rounded px-3 py-2 text-sm"
              title="Filter by status"
              aria-label="Filter by status"
            >
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="text-sm text-gray-600">
            Total: {pagination?.total || 0} submissions
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No submissions found
                  </td>
                </tr>
              ) : (
                submissions?.map((submission) => (
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
                      <select
                        value={submission.status}
                        onChange={(e) => handleStatusChange(submission.id, e.target.value as SubmissionStatus)}
                        className={`px-2 py-1 text-xs rounded-full border-0 ${STATUS_COLORS[submission.status]}`}
                        title="Change status"
                        aria-label="Change status"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(submission.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="View details"
                        aria-label="View details"
                      >
                        <Eye size={16} />
                      </button>
                      {submission.pdfFile && (
                        <a
                          href={submission.pdfFile.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900 mr-3"
                          title="Download PDF"
                          aria-label="Download PDF"
                        >
                          <Download size={16} />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete submission"
                        aria-label="Delete submission"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={!pagination.hasPreviousPage}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Previous page"
              aria-label="Previous page"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={!pagination.hasNextPage}
              className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
              title="Next page"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {selectedSubmission && (
        <SubmissionDetailModal
          submissionId={selectedSubmission}
          isOpen={!!selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default SubmissionsPage;
