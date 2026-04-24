"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Trash2,
  FileText,
  Download,
  FileSpreadsheet,
  Paperclip,
  Search,
  Archive,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  useSubmissions,
  useAllSubmissions,
  useDeleteSubmission,
  useUpdateSubmissionStatus,
  useExportSubmissions,
  useExportSubmissionsByIds,
} from "@/hooks/useSubmissions";
import { SubmissionStatus } from "@/types/submission.types";
import SubmissionDetailModal from "./_components/SubmissionDetailModal";
import { MediaGalleryModal } from "@/components/dashboard/MediaGalleryModal";
import { useDebounce } from "@/hooks/useDebounce";
import { searchSubmission } from "@/utils/search";
import { useMemo } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { submissionService } from "@/services/submission.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const STATUS_COLORS: Record<SubmissionStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PROCESSING: "bg-blue-100 text-blue-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const SubmissionsPage = () => {
  const [filterStatus, setFilterStatus] = useState<SubmissionStatus | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<"date" | "name" | "total" | "status">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [dateFilter, setDateFilter] = useState<"" | "30" | "60" | "90">("");
  const queryClient = useQueryClient();

  // Fetch all data when searching, paginated data otherwise
  const { data: allResponse, isLoading: isLoadingAll } = useAllSubmissions(
    filterStatus || undefined,
    debouncedSearch.length > 0,
  );
  const { data: paginatedResponse, isLoading: isLoadingPaginated } =
    useSubmissions(filterStatus || undefined, page, limit);

  const isSearching = debouncedSearch.length > 0;
  const response = isSearching ? allResponse : paginatedResponse;
  const isLoading = isSearching ? isLoadingAll : isLoadingPaginated;
  const deleteMutation = useDeleteSubmission();
  const updateStatusMutation = useUpdateSubmissionStatus();
  const exportMutation = useExportSubmissions();
  const exportByIds = useExportSubmissionsByIds();
  const archiveMutation = useMutation({
    mutationFn: submissionService.archiveMany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Submissions archived successfully");
      setSelectedIds([]);
    },
    onError: () => {
      toast.error("Failed to archive submissions");
    },
  });

  const bulkDeleteMutation = useMutation({
    mutationFn: submissionService.deleteMany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      toast.success("Submissions deleted successfully");
      setSelectedIds([]);
    },
    onError: () => {
      toast.error("Failed to delete submissions");
    },
  });

  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(
    null,
  );
  const [mediaModalSubmission, setMediaModalSubmission] = useState<any>(null);

  const submissions = response?.data;
  const pagination = response?.pagination;

  const filteredSubmissions = useMemo(() => {
    if (!submissions) return [];
    let result = [...submissions];
    
    if (debouncedSearch) {
      result = result.filter((submission) =>
        searchSubmission(submission, debouncedSearch),
      );
    }

    // Client-side sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortField === "name") {
        comparison = a.clientName.localeCompare(b.clientName);
      } else if (sortField === "total") {
        comparison = a.totalAmount - b.totalAmount;
      } else if (sortField === "status") {
        comparison = a.status.localeCompare(b.status);
      } else {
        comparison = new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [submissions, debouncedSearch, sortField, sortOrder]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleStatusChange = (id: string, status: SubmissionStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleViewDetails = (id: string) => {
    setSelectedSubmission(id);
  };

  const handleExport = () => {
    exportMutation.mutate(filterStatus || undefined);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSubmissions?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredSubmissions?.map((s) => s.id) || []);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleExportSelected = () => {
    if (selectedIds.length > 0) {
      exportByIds.mutate(selectedIds);
    }
  };

  const handleArchiveSelected = () => {
    if (selectedIds.length > 0 && confirm(`Archive ${selectedIds.length} submission(s)?`)) {
      archiveMutation.mutate(selectedIds);
    }
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0 && confirm(`Delete ${selectedIds.length} submission(s)? This cannot be undone.`)) {
      bulkDeleteMutation.mutate(selectedIds);
    }
  };

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field: typeof sortField) => {
    if (sortField !== field) return <ArrowUpDown size={14} className="inline ml-1" />;
    return sortOrder === "asc" ? <ArrowUp size={14} className="inline ml-1" /> : <ArrowDown size={14} className="inline ml-1" />;
  };

  const handleExportSingle = (id: string) => {
    exportByIds.mutate([id]);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar title="Submissions" />
        <div className="p-4 md:p-6">
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">Customer Submissions</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, email, number..."
                    disabled
                    className="border rounded pl-10 pr-4 py-2 text-sm w-full bg-gray-50"
                  />
                </div>
                <select
                  disabled
                  className="border rounded px-3 py-2 text-sm bg-gray-50"
                  title="Filter by status"
                  aria-label="Filter by status"
                >
                  <option value="">All Status</option>
                </select>
              </div>
            </div>
          </div>
          <TableSkeleton rows={10} columns={9} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title="Submissions" />

      <div className="p-4 md:p-6">
        {/* Header Section - Mobile Responsive */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col gap-4">
            {/* Title and Total */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-xl font-semibold">Customer Submissions</h2>
              <div className="text-sm text-gray-600">
                Total: {pagination?.total || 0} submissions
              </div>
            </div>

            {/* Search, Filter and Export Row - Desktop: same row, Mobile: stacked */}
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              {/* Search and Filter Group */}
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="Search by name, email, number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded pl-10 pr-4 py-2 text-sm w-full"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(e.target.value as SubmissionStatus | "")
                  }
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
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value as "" | "30" | "60" | "90")}
                  className="border rounded px-3 py-2 text-sm"
                  title="Filter by date"
                  aria-label="Filter by date"
                >
                  <option value="">All Time</option>
                  <option value="30">Last 30 Days</option>
                  <option value="60">Last 60 Days</option>
                  <option value="90">Last 90 Days</option>
                </select>
              </div>

              {/* Export Buttons Group */}
              <div className="flex flex-col sm:flex-row gap-2 md:shrink-0">
                {selectedIds.length > 0 && (
                  <>
                    <Button
                      onClick={handleArchiveSelected}
                      disabled={archiveMutation.isPending}
                      variant="outline"
                      className="flex items-center justify-center gap-2"
                    >
                      <Archive size={18} />
                      Archive ({selectedIds.length})
                    </Button>
                    <Button
                      onClick={handleBulkDelete}
                      disabled={bulkDeleteMutation.isPending}
                      variant="outline"
                      className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                      Delete ({selectedIds.length})
                    </Button>
                    <Button
                      onClick={handleExportSelected}
                      disabled={exportByIds.isPending}
                      className="flex items-center justify-center gap-2 bg-[#2D4A8F] hover:bg-[#1B2A5A]"
                    >
                      <Download size={18} />
                      Export ({selectedIds.length})
                    </Button>
                  </>
                )}
                <Button
                  onClick={handleExport}
                  variant="outline"
                  disabled={exportMutation.isPending}
                  className="flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet size={18} />
                  Export All
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={
                      selectedIds.length === filteredSubmissions?.length &&
                      filteredSubmissions?.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300"
                    aria-label="Select all"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Submission #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => toggleSort("name")}>
                  Client {getSortIcon("name")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => toggleSort("total")}>
                  Total Amount {getSortIcon("total")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Media
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => toggleSort("status")}>
                  Status {getSortIcon("status")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100" onClick={() => toggleSort("date")}>
                  Date {getSortIcon("date")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions?.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    {searchQuery
                      ? "No submissions found matching your search"
                      : "No submissions found"}
                  </td>
                </tr>
              ) : (
                filteredSubmissions?.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(submission.id)}
                        onChange={() => toggleSelect(submission.id)}
                        className="w-4 h-4 rounded border-gray-300"
                        aria-label="Select submission"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.submissionNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>{submission.clientName}</div>
                      <div className="text-xs text-gray-500">
                        {submission.clientEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.service?.name || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${submission.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.submissionMedia &&
                      submission.submissionMedia.length > 0 ? (
                        <button
                          onClick={() => setMediaModalSubmission(submission)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-900"
                          title="View media files"
                          aria-label="View media files"
                        >
                          <Paperclip size={16} />
                          <span className="text-xs">
                            {submission.submissionMedia.length}
                          </span>
                        </button>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={submission.status}
                        onChange={(e) =>
                          handleStatusChange(
                            submission.id,
                            e.target.value as SubmissionStatus,
                          )
                        }
                        className={`px-3 py-1.5 pr-8 text-xs rounded-full border-0 appearance-none cursor-pointer ${STATUS_COLORS[submission.status]}`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: 'right 0.5rem center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: '1.25em 1.25em',
                        }}
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
                      {submission.submittedAt
                        ? new Date(submission.submittedAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleExportSingle(submission.id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                        title="Export"
                        aria-label="Export"
                        disabled={exportByIds.isPending}
                      >
                        <FileSpreadsheet size={16} />
                      </button>
                      <button
                        onClick={() => handleViewDetails(submission.id)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="View details"
                        aria-label="View details"
                      >
                        <Eye size={16} />
                      </button>
                      {submission.pdfUrl && (
                        <a
                          href={submission.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-600 hover:text-red-900 mr-3"
                          title="Download PDF"
                          aria-label="Download PDF"
                        >
                          <FileText size={16} />
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
              onClick={() => setPage((p) => Math.max(1, p - 1))}
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
              onClick={() => setPage((p) => p + 1)}
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

      {mediaModalSubmission && (
        <MediaGalleryModal
          isOpen={!!mediaModalSubmission}
          onClose={() => setMediaModalSubmission(null)}
          media={mediaModalSubmission.submissionMedia || []}
          submissionNumber={mediaModalSubmission.submissionNumber}
        />
      )}
    </div>
  );
};

export default SubmissionsPage;
