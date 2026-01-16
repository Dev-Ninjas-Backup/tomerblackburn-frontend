"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, Search, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { PortfolioModal } from "./PortfolioModal";
import { PortfolioDetailsModal } from "./PortfolioDetailsModal";

interface Portfolio {
  id: number;
  name: string;
  date: string;
  images: string[];
}

export const PortfolioTab = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    { id: 123, name: "Lakeview", date: "12 Feb 2025", images: ["/images/portfolio/lakeview-1.jpg", "/images/portfolio/lakeview-2.jpg"] },
    { id: 124, name: "Lakeview", date: "12 Feb 2025", images: ["/images/portfolio/lakeview-3.jpg"] },
    { id: 125, name: "Lakeview", date: "12 Feb 2025", images: ["/images/portfolio/lakeview-4.jpg"] },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPortfolios = portfolios.filter(portfolio =>
    portfolio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    portfolio.id.toString().includes(searchTerm)
  );

  const handleAddPortfolio = (data: { name: string; images: File[] }) => {
    const newPortfolio: Portfolio = {
      id: Date.now(),
      name: data.name,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      images: data.images.map(file => URL.createObjectURL(file))
    };
    setPortfolios(prev => [newPortfolio, ...prev]);
  };

  const handleViewDetails = (portfolio: Portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsDetailsModalOpen(true);
    setActiveDropdown(null);
  };

  const handleDelete = (id: number) => {
    setPortfolios(prev => prev.filter(p => p.id !== id));
    setActiveDropdown(null);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Portfolio</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} />
          <span>Add New Portfolio</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 space-y-4 md:space-y-0">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by name and id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <span className="text-sm text-gray-500">{filteredPortfolios.length} results</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPortfolios.map((portfolio) => (
                <tr key={portfolio.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">{portfolio.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{portfolio.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{portfolio.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === portfolio.id ? null : portfolio.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="More actions"
                        aria-label="More actions"
                      >
                        <MoreVertical size={16} />
                      </button>
                      {activeDropdown === portfolio.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                          <button
                            onClick={() => handleViewDetails(portfolio)}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDelete(portfolio.id)}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
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
            <select className="border border-gray-300 rounded px-2 py-1 text-sm" title="Rows per page" aria-label="Rows per page">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Page 1 of 1</span>
            <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled title="Previous page" aria-label="Previous page">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled title="Next page" aria-label="Next page">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <PortfolioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddPortfolio}
      />

      <PortfolioDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        portfolio={selectedPortfolio}
      />
    </div>
  );
};