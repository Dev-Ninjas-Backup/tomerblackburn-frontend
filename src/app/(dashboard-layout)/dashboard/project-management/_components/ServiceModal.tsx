'use client';

import React, { useEffect, useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateService, useUpdateService, useProjectTypes, useServiceCategoriesByProjectType } from '@/hooks/useProjectManagement';
import { CreateServiceDto } from '@/types/project-management.types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
}

const ServiceModal = ({ isOpen, onClose, mode, data }: ServiceModalProps) => {
  const createMutation = useCreateService();
  const updateMutation = useUpdateService();
  const { data: projectTypes } = useProjectTypes();
  const [selectedProjectType, setSelectedProjectType] = useState('');
  const { data: categories } = useServiceCategoriesByProjectType(selectedProjectType);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  const [formData, setFormData] = useState<CreateServiceDto>({
    serviceCategoryId: '',
    code: '',
    name: '',
    shortDescription: '',
    fullDescription: '',
    basePrice: 0,
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (mode === 'edit' && data) {
      setFormData({
        serviceCategoryId: data.serviceCategoryId,
        code: data.code,
        name: data.name,
        shortDescription: data.shortDescription || '',
        fullDescription: data.fullDescription || '',
        basePrice: data.basePrice,
        displayOrder: data.displayOrder,
        isActive: data.isActive,
      });
      if (data.imageFile) {
        setImagePreview(data.imageFile.url);
      }
    } else {
      setFormData({ serviceCategoryId: '', code: '', name: '', shortDescription: '', fullDescription: '', basePrice: 0, displayOrder: 0, isActive: true });
      setImagePreview('');
    }
    setImage(null);
  }, [mode, data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      await createMutation.mutateAsync({ data: formData, image: image || undefined });
    } else {
      await updateMutation.mutateAsync({ id: data.id, data: formData, image: image || undefined });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{mode === 'create' ? 'Create' : 'Edit'} Service</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Type *</label>
              <select
                value={selectedProjectType}
                onChange={(e) => {
                  setSelectedProjectType(e.target.value);
                  setFormData({ ...formData, serviceCategoryId: '' });
                }}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select Project Type</option>
                {projectTypes?.map((pt) => (
                  <option key={pt.id} value={pt.id}>{pt.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Service Category *</label>
              <select
                value={formData.serviceCategoryId}
                onChange={(e) => setFormData({ ...formData, serviceCategoryId: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
                disabled={!selectedProjectType}
              >
                <option value="">Select Category</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Code *</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., FP"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Four Piece"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Base Price *</label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                required
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

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Short Description</label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Brief description"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Full Description</label>
              <textarea
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Detailed description..."
                rows={3}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Image</label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />
                )}
                <label className="cursor-pointer border rounded px-4 py-2 hover:bg-gray-50 flex items-center gap-2">
                  <Upload size={16} />
                  <span className="text-sm">Choose Image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
            </div>

            <div className="col-span-2 flex items-center">
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

export default ServiceModal;
