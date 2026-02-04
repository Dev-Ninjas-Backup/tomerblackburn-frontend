'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Star, ListPlus, GripVertical } from 'lucide-react';
import { useCostCodes, useCostCodeOptions, useDeleteCostCodeOption, useSetDefaultCostCodeOption, useReorderCostCodeOptions } from '@/hooks/useCostManagement';
import CostCodeOptionModal from '../_components/CostCodeOptionModal';
import BulkCreateOptionsModal from '../_components/BulkCreateOptionsModal';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableRow = ({ item, handleSetDefault, handleEdit, handleDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr ref={setNodeRef} style={style} className="bg-white">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing" title="Drag to reorder" aria-label="Drag to reorder">
          <GripVertical size={18} className="text-gray-400" />
        </button>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {item.optionName}
        {item.isDefault && <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded">Default</span>}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {item.priceModifier >= 0 ? '+' : ''}{item.priceModifier.toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.optionValue || '-'}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.displayOrder}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {!item.isDefault && (
          <button onClick={() => handleSetDefault(item.id)} className="text-yellow-600 hover:text-yellow-900 mr-3" title="Set as default" aria-label="Set as default">
            <Star size={16} />
          </button>
        )}
        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3" title="Edit option" aria-label="Edit option">
          <Pencil size={16} />
        </button>
        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="Delete option" aria-label="Delete option">
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

const CostCodeOptionsTab = () => {
  const { data: costCodes } = useCostCodes();
  const [selectedCostCode, setSelectedCostCode] = useState<string>('');
  const { data: options, isLoading } = useCostCodeOptions(selectedCostCode);
  const deleteMutation = useDeleteCostCodeOption();
  const setDefaultMutation = useSetDefaultCostCodeOption();
  const reorderMutation = useReorderCostCodeOptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
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

  const handleBulkCreate = () => {
    if (!selectedCostCode) {
      alert('Please select a cost code first');
      return;
    }
    setIsBulkModalOpen(true);
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

  const handleSetDefault = (id: string) => {
    setDefaultMutation.mutate(id);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id || !options) return;

    const oldIndex = options.findIndex((item) => item.id === active.id);
    const newIndex = options.findIndex((item) => item.id === over.id);
    const reordered = arrayMove(options, oldIndex, newIndex);
    const optionIds = reordered.map((item) => item.id);
    reorderMutation.mutate({ costCodeId: selectedCostCode, optionIds });
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
        <div className="flex gap-2">
          <Button onClick={handleBulkCreate} variant="outline" disabled={!selectedCostCode}>
            <ListPlus size={18} className="mr-2" />
            Bulk Create
          </Button>
          <Button onClick={handleCreate} className="bg-[#2d4a8f] hover:bg-[#243a73]" disabled={!selectedCostCode}>
            <Plus size={18} className="mr-2" />
            Add Option
          </Button>
        </div>
      </div>

      {!selectedCostCode ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Please select a cost code to view and manage its options</p>
        </div>
      ) : isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase w-12"></th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price Modifier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Option Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Display Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {options?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No options found. Click "Add Option" to create one.
                    </td>
                  </tr>
                ) : (
                  <SortableContext items={options?.map(o => o.id) || []} strategy={verticalListSortingStrategy}>
                    {options?.map((item) => (
                      <SortableRow
                        key={item.id}
                        item={item}
                        handleSetDefault={handleSetDefault}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                      />
                    ))}
                  </SortableContext>
                )}
              </tbody>
            </table>
          </DndContext>
        </div>
      )}

      <CostCodeOptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        data={selectedData}
        costCodeId={selectedCostCode}
      />

      <BulkCreateOptionsModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        costCodeId={selectedCostCode}
      />
    </div>
  );
};

export default CostCodeOptionsTab;
