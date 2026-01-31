"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Power,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PortfolioModal } from "../_components/PortfolioModal";
import { EditPortfolioModal } from "../_components/EditPortfolioModal";
import { PortfolioDetailsModal } from "../_components/PortfolioDetailsModal";
import { DeleteConfirmModal } from "../_components/DeleteConfirmModal";
import {
  usePortfolios,
  useCreatePortfolio,
  useUpdatePortfolio,
  useDeletePortfolio,
  useTogglePortfolioStatus,
} from "@/hooks/usePortfolio";
import { showToast, toastMessages } from "@/lib/toast";

interface Portfolio {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  images?: Array<{
    id: string;
    caption?: string;
    displayOrder: number;
    file?: {
      id: string;
      url: string;
      filename: string;
    };
  }>;
}

export const PortfolioTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
    null,
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [portfolioToDelete, setPortfolioToDelete] = useState<string | null>(
    null,
  );

  const { data: portfolios = [], isLoading } = usePortfolios(true);
  const createMutation = useCreatePortfolio();
  const updateMutation = useUpdatePortfolio();
  const deleteMutation = useDeletePortfolio();
  const toggleStatusMutation = useTogglePortfolioStatus();

  const filteredPortfolios = portfolios.filter(
    (portfolio: Portfolio) =>
      portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      portfolio.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddPortfolio = async (data: {
    name: string;
    slug: string;
    description?: string;
    images: File[];
  }) => {
    try {
      await createMutation.mutateAsync({
        name: data.name,
        slug: data.slug,
        description: data.description,
      });
      setIsModalOpen(false);
      showToast.success(
        "Portfolio created successfully",
        `${data.name} has been added to your portfolio.`,
      );
    } catch (error) {
      console.error("Failed to create portfolio:", error);
      showToast.error("Failed to create portfolio", "Please try again later.");
    }
  };

  const handleViewDetails = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (
    id: string,
    data: { name: string; slug: string; description?: string },
  ) => {
    try {
      await updateMutation.mutateAsync({ id, data });
      setIsEditModalOpen(false);
      showToast.success(
        "Portfolio updated successfully",
        `${data.name} has been updated.`,
      );
    } catch (error) {
      console.error("Failed to update portfolio:", error);
      showToast.error("Failed to update portfolio", "Please try again later.");
    }
  };

  const handleDelete = async (id: string) => {
    setPortfolioToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!portfolioToDelete) return;

    try {
      await deleteMutation.mutateAsync(portfolioToDelete);
      showToast.success("Portfolio deleted successfully");
      setIsDeleteModalOpen(false);
      setPortfolioToDelete(null);
    } catch (error) {
      console.error("Failed to delete portfolio:", error);
      showToast.error("Failed to delete portfolio", "Please try again later.");
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleStatusMutation.mutateAsync(id);
      showToast.success("Status updated successfully");
    } catch (error) {
      console.error("Failed to toggle status:", error);
      showToast.error("Failed to update status", "Please try again later.");
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          Portfolio
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-[#2D4A8F] text-white rounded-md hover:bg-[#3461c9]"
        >
          <Plus size={16} />
          <span>Add New Portfolio</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-4 md:space-y-0">
        <div className="relative flex-1 md:max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search by name and slug"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-gray-500">
          {filteredPortfolios.length} results
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Slug
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Images
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredPortfolios.map((portfolio: Portfolio) => (
                    <tr key={portfolio.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {portfolio.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {portfolio.slug}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {portfolio.images?.length || 0}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            portfolio.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {portfolio.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {new Date(portfolio.createdAt).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(portfolio)}
                            className="p-1.5 hover:bg-blue-50 text-blue-600 rounded"
                            title="View Details"
                            aria-label="View Details"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => handleEdit(portfolio)}
                            className="p-1.5 hover:bg-green-50 text-green-600 rounded"
                            title="Edit"
                            aria-label="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(portfolio.id)}
                            className="p-1.5 hover:bg-gray-100 text-gray-600 rounded"
                            title={
                              portfolio.isActive ? "Deactivate" : "Activate"
                            }
                            aria-label={
                              portfolio.isActive ? "Deactivate" : "Activate"
                            }
                            disabled={toggleStatusMutation.isPending}
                          >
                            <Power size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(portfolio.id)}
                            className="p-1.5 hover:bg-red-50 text-red-600 rounded"
                            title="Delete"
                            aria-label="Delete"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Rows per page</span>
                <select
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                  title="Rows per page"
                  aria-label="Rows per page"
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Page 1 of 1</span>
                <button
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  disabled
                  title="Previous page"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50"
                  disabled
                  title="Next page"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddPortfolio}
      />

      <EditPortfolioModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdate}
        portfolio={selectedPortfolio}
      />

      <PortfolioDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        portfolio={selectedPortfolio}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPortfolioToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Portfolio"
        message="Are you sure you want to delete this portfolio? This action cannot be undone and will remove all associated images."
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
