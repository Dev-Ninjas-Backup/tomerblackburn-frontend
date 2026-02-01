"use client";

import React, { useState } from "react";
import { Plus, Grid3x3, Loader2, Image as ImageIcon } from "lucide-react";
import { usePortfolios } from "@/hooks/usePortfolio";
import { PortfolioCategoryCard } from "../_components/PortfolioCategoryCard";
import { CreateCategoryModal } from "../_components/CreateCategoryModal";
import { PortfolioTabSkeleton } from "./_skeleton/PortfolioTabSkeleton";

export const PortfolioTabNew = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: portfolios = [], isLoading } = usePortfolios(true);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-[#2d4a8f] to-[#3461c9] rounded-lg p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Grid3x3 className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Portfolio Gallery</h2>
            </div>
            <p className="text-purple-100">
              Manage your portfolio categories and showcase your work
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-white text-[#2d4a8f] font-medium rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            New Category
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Grid3x3 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {portfolios.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Images</p>
              <p className="text-2xl font-bold text-gray-900">
                {portfolios.reduce(
                  (acc: number, p: any) => acc + (p.images?.length || 0),
                  0,
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Grid3x3 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {portfolios.filter((p: any) => p.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <PortfolioTabSkeleton />
      ) : portfolios.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Grid3x3 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Portfolio Categories Yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first portfolio category to start showcasing your work
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-[#2d4a8f] text-white font-medium rounded-lg hover:bg-[#3461c9] transition-colors inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create First Category
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {portfolios.map((portfolio: any) => (
            <PortfolioCategoryCard key={portfolio.id} category={portfolio} />
          ))}
        </div>
      )}

      {/* Create Category Modal */}
      <CreateCategoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
