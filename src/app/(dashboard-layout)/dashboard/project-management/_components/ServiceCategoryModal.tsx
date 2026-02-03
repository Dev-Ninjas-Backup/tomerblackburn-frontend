'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateServiceCategory, useUpdateServiceCategory } from '@/hooks/useProjectManagement';
import { CreateServiceCategoryDto, ProjectType } from '@/types/project-management.types';

interface ServiceCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
  projectTypes: ProjectType[];
}

const ServiceCategoryModal = ({ isOpen, onClose, mode, data, projectTypes }: ServiceCategoryModalProps) => {
  const createMutation = useCreateServiceCategory();
  const updateMutation = useUpdateServiceCategory();
  const [formData, setFormData] = useState<CreateServiceCategoryDto>({
    projectTypeId: '',
    name: '',
    description: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (mode === 'edit' && data) {
      setFormData({
        projectTypeId: data.projectTypeId,
        name: data.name,
        description: data.description || '',
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      });
    } else {
      setFormData({ projectTypeId: '', name: '', description: '', displayOrder: 0, isActive: true });
    }
  }, [mode, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      await createMutation.mutateAsync(formData);
    } else {
      await updateMutation.mutateAsync({ id: data.id, data: formData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{mode === 'create' ? 'Create' : 'Edit'} Service Category</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Type *</label>
              <select
                value={formData.projectTypeId}
                onChange={(e) => setFormData({ ...formData, projectTypeId: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Project Type</option>
                {projectTypes.map((pt) => (
                  <option key={pt.id} value={pt.id}>{pt.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Full Bathroom"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Brief description..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Display Order</label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                className="w-full border rounded px-3 py-2"
                min="0"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="mr-2"
              />
              <label className="text-sm font-medium">Active</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#2d4a8f] hover:bg-[#243a73]">
              {mode === 'create' ? 'Create' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCategoryModal;
