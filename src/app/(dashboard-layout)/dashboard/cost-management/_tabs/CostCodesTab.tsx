'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Settings } from 'lucide-react';
import { useCostCodes, useDeleteCostCode, useCostCodeCategories } from '@/hooks/useCostManagement';
import { useServices } from '@/hooks/useProjectManagement';
import CostCodeModal from '../_components/CostCodeModal';
import { QuestionType } from '@/types/cost-management.types';

const QUESTION_TYPE_COLORS: Record<QuestionType, string> = {
  WHITE: 'bg-gray-100 text-gray-800',
  BLUE: 'bg-blue-100 text-blue-800',
  GREEN: 'bg-green-100 text-green-800',
  ORANGE: 'bg-orange-100 text-orange-800',
  YELLOW: 'bg-yellow-100 text-yellow-800',
  RED: 'bg-red-100 text-red-800',
  PURPLE: 'bg-purple-100 text-purple-800',
};

const CostCodesTab = () => {
  const { data: categories } = useCostCodeCategories();
  const { data: services } = useServices();
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [filterService, setFilterService] = useState<string>('');
  const { data: costCodes, isLoading } = useCostCodes({ 
    categoryId: filterCategory || undefined,
    serviceId: filterService || undefined 
  });
  const deleteMutation = useDeleteCostCode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleCreate = () => {
    setModalMode('create');
    setSelectedData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (data: any) => {
    setModalMode('edit');
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this cost code?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Cost Codes</h2>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            title="Filter by category"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
            title="Filter by service"
            aria-label="Filter by service"
          >
            <option value="">All Services</option>
            {services?.map((svc) => (
              <option key={svc.id} value={svc.id}>{svc.name}</option>
            ))}
          </select>
        </div>
        <Button onClick={handleCreate} className="bg-[#2d4a8f] hover:bg-[#243a73]">
          <Plus size={18} className="mr-2" />
          Add Cost Code
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Question Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Step</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {costCodes?.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.code}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.service?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category?.name || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${QUESTION_TYPE_COLORS[item.questionType]}`}>
                    {item.questionType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.basePrice.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Step {item.step}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3" title="Edit cost code" aria-label="Edit cost code">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="Delete cost code" aria-label="Delete cost code">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CostCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        data={selectedData}
        categories={categories || []}
      />
    </div>
  );
};

export default CostCodesTab;
