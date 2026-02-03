'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useCostCodes, useCostCodeOptions, useDeleteCostCodeOption } from '@/hooks/useCostManagement';
import CostCodeOptionModal from '../_components/CostCodeOptionModal';

const CostCodeOptionsTab = () => {
  const { data: costCodes } = useCostCodes();
  const [selectedCostCode, setSelectedCostCode] = useState<string>('');
  const { data: options, isLoading } = useCostCodeOptions(selectedCostCode);
  const deleteMutation = useDeleteCostCodeOption();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleCreate = () => {
    if (!selectedCostCode) {
      alert('Please select a cost code first');
      return;
    }
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
    if (confirm('Are you sure you want to delete this option?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Cost Code Options</h2>
          <select
            value={selectedCostCode}
            onChange={(e) => setSelectedCostCode(e.target.value)}
            className="border rounded px-3 py-2 text-sm min-w-[300px]"
            title="Select cost code"
            aria-label="Select cost code"
          >
            <option value="">Select a Cost Code</option>
            {costCodes?.map((cc) => (
              <option key={cc.id} value={cc.id}>{cc.code} - {cc.name}</option>
            ))}
          </select>
        </div>
        <Button onClick={handleCreate} className="bg-[#2d4a8f] hover:bg-[#243a73]" disabled={!selectedCostCode}>
          <Plus size={18} className="mr-2" />
          Add Option
        </Button>
      </div>

      {!selectedCostCode ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Please select a cost code to view and manage its options</p>
        </div>
      ) : isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Modifier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tier Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Display Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {options?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No options found. Click "Add Option" to create one.
                  </td>
                </tr>
              ) : (
                options?.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.priceModifier >= 0 ? '+' : ''}{item.priceModifier.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.tierLevel || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.displayOrder}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3" title="Edit option" aria-label="Edit option">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="Delete option" aria-label="Delete option">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <CostCodeOptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        data={selectedData}
        costCodeId={selectedCostCode}
      />
    </div>
  );
};

export default CostCodeOptionsTab;
