'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateCostCode, useUpdateCostCode, useCostCodes } from '@/hooks/useCostManagement';
import { useProjectTypes, useServiceCategories, useServiceCategoriesByProjectType, useServicesByCategory } from '@/hooks/useProjectManagement';
import { CreateCostCodeDto, CostCodeCategory, QuestionType, UnitType } from '@/types/cost-management.types';

interface CostCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  data?: any;
  categories: CostCodeCategory[];
}

const CostCodeModal = ({ isOpen, onClose, mode, data, categories }: CostCodeModalProps) => {
  const createMutation = useCreateCostCode();
  const updateMutation = useUpdateCostCode();
  const { data: projectTypes } = useProjectTypes(true);
  const { data: allServiceCategories } = useServiceCategories(true);
  const [selectedProjectType, setSelectedProjectType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const { data: serviceCategories } = useServiceCategoriesByProjectType(selectedProjectType);
  const { data: services } = useServicesByCategory(selectedCategory);
  const { data: allCostCodes } = useCostCodes({ serviceId: selectedServiceId, isActive: true });
  
  const [formData, setFormData] = useState<CreateCostCodeDto>({
    categoryId: '',
    code: '',
    name: '',
    description: '',
    basePrice: 0,
    markup: 0,
    clientPrice: 0,
    unitType: 'FIXED',
    questionType: 'WHITE',
    step: 1,
    displayOrder: 0,
    isIncludedInBase: false,
    requiresQuantity: false,
    isOptional: false,
    isActive: true,
    parentCostCodeId: '',
    showWhenParentValue: '',
    nestedInputType: 'NONE',
  });

  useEffect(() => {
    if (mode === 'edit' && data && data.service?.serviceCategoryId && allServiceCategories) {
      // Find service category and get projectTypeId
      const matchedCategory = allServiceCategories.find(sc => sc.id === data.service.serviceCategoryId);
      if (matchedCategory?.projectTypeId) {
        setSelectedProjectType(matchedCategory.projectTypeId);
        setSelectedCategory(data.service.serviceCategoryId);
      }
      
      setFormData({
        categoryId: data.categoryId,
        serviceId: data.serviceId || '',
        code: data.code,
        name: data.name,
        description: data.description || '',
        basePrice: data.basePrice,
        markup: data.markup || 0,
        clientPrice: data.clientPrice || 0,
        unitType: data.unitType,
        questionType: data.questionType,
        step: data.step,
        displayOrder: data.displayOrder,
        isIncludedInBase: data.isIncludedInBase,
        requiresQuantity: data.requiresQuantity,
        isOptional: data.isOptional,
        isActive: data.isActive,
        parentCostCodeId: data.parentCostCodeId || '',
        showWhenParentValue: data.showWhenParentValue || '',
        nestedInputType: data.nestedInputType || 'NONE',
      });
      setSelectedServiceId(data.serviceId || '');
    } else if (mode === 'create') {
      setFormData({
        categoryId: '',
        serviceId: '',
        code: '',
        name: '',
        description: '',
        basePrice: 0,
        markup: 0,
        clientPrice: 0,
        unitType: 'FIXED',
        questionType: 'WHITE',
        step: 1,
        displayOrder: 0,
        isIncludedInBase: false,
        requiresQuantity: false,
        isOptional: false,
        isActive: true,
        parentCostCodeId: '',
        showWhenParentValue: '',
        nestedInputType: 'NONE',
      });
      setSelectedProjectType('');
      setSelectedCategory('');
      setSelectedServiceId('');
    }
  }, [mode, data, allServiceCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceId) {
      alert('Please select a service');
      return;
    }
    const submitData = { ...formData };
    if (!submitData.serviceId) delete submitData.serviceId;
    if (!submitData.parentCostCodeId) delete submitData.parentCostCodeId;
    if (!submitData.showWhenParentValue) delete submitData.showWhenParentValue;
    if (mode === 'create') {
      await createMutation.mutateAsync(submitData);
    } else {
      await updateMutation.mutateAsync({ id: data.id, data: submitData });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{mode === 'create' ? 'Create' : 'Edit'} Cost Code</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" title="Close modal" aria-label="Close modal">
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
                  setSelectedCategory('');
                  setFormData({ ...formData, serviceId: '' });
                }}
                className="w-full border rounded px-3 py-2"
                required
                title="Select project type"
                aria-label="Select project type"
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
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setFormData({ ...formData, serviceId: '' });
                }}
                className="w-full border rounded px-3 py-2"
                required
                disabled={!selectedProjectType}
                title="Select service category"
                aria-label="Select service category"
              >
                <option value="">Select Category</option>
                {serviceCategories?.map((sc) => (
                  <option key={sc.id} value={sc.id}>{sc.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Service *</label>
              <select
                value={formData.serviceId}
                onChange={(e) => {
                  setFormData({ ...formData, serviceId: e.target.value });
                  setSelectedServiceId(e.target.value);
                }}
                className="w-full border rounded px-3 py-2"
                required
                disabled={!selectedCategory}
                title="Select service"
                aria-label="Select service"
              >
                <option value="">Select Service</option>
                {services?.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
                title="Select category"
                aria-label="Select category"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
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
                placeholder="e.g., FP-D-1"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="e.g., Floor Tile Installation"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-3 py-2"
                placeholder="Detailed description..."
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Base Price *</label>
              <input
                type="number"
                value={formData.basePrice}
                onChange={(e) => {
                  const basePrice = parseFloat(e.target.value) || 0;
                  const calculatedClientPrice = basePrice + (basePrice * (formData.markup || 0) / 100);
                  setFormData({ ...formData, basePrice, clientPrice: calculatedClientPrice });
                }}
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                required
                placeholder="0.00"
                title="Base price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Markup (%)</label>
              <input
                type="number"
                value={formData.markup}
                onChange={(e) => {
                  const markup = parseFloat(e.target.value) || 0;
                  const calculatedClientPrice = formData.basePrice + (formData.basePrice * markup / 100);
                  setFormData({ ...formData, markup, clientPrice: calculatedClientPrice });
                }}
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                placeholder="0"
                title="Markup percentage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Client Price</label>
              <input
                type="number"
                value={formData.clientPrice}
                onChange={(e) => setFormData({ ...formData, clientPrice: parseFloat(e.target.value) || 0 })}
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
                placeholder="0.00"
                title="Client price (can be manually overridden)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Unit Type</label>
              <select
                value={formData.unitType}
                onChange={(e) => setFormData({ ...formData, unitType: e.target.value as UnitType })}
                className="w-full border rounded px-3 py-2"
                title="Select unit type"
                aria-label="Select unit type"
              >
                <option value="FIXED">Fixed</option>
                <option value="PER_SQFT">Per Sq Ft</option>
                <option value="PER_EACH">Per Each</option>
                <option value="PER_LOT">Per Lot</option>
                <option value="PER_SET">Per Set</option>
                <option value="PER_UPGRADE">Per Upgrade</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Question Type</label>
              <select
                value={formData.questionType}
                onChange={(e) => setFormData({ ...formData, questionType: e.target.value as QuestionType })}
                className="w-full border rounded px-3 py-2"
                title="Select question type"
                aria-label="Select question type"
              >
                <option value="WHITE">WHITE - Assumed scope (cannot be changed)</option>
                <option value="BLUE">BLUE - Yes/No Toggle (default: No)</option>
                <option value="GREEN">GREEN - Data Input (numbers only)</option>
                <option value="ORANGE">ORANGE - Dropdown list (preset options)</option>
                <option value="PURPLE">PURPLE - Uses data from previous questions</option>
                <option value="YELLOW">YELLOW - Conditional Yes/No (appears after previous Yes)</option>
                <option value="RED">RED - Inactive/Hidden (placeholder)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Step Number</label>
              <input
                type="number"
                value={formData.step}
                onChange={(e) => setFormData({ ...formData, step: parseInt(e.target.value) })}
                className="w-full border rounded px-3 py-2"
                min="1"
                placeholder="1"
                title="Step number"
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
                placeholder="0"
                title="Display order"
              />
            </div>

            <div className="col-span-2 border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">🔗 Nested Question Settings (Optional)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Parent Question</label>
                  <select
                    value={formData.parentCostCodeId}
                    onChange={(e) => setFormData({ ...formData, parentCostCodeId: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    title="Select parent question"
                    disabled={!formData.serviceId}
                  >
                    <option value="">None (Top-level question)</option>
                    {allCostCodes?.map((cc) => (
                      <option key={cc.id} value={cc.id}>{cc.code} - {cc.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">This question will appear after parent is answered</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Show When Parent Value</label>
                  <input
                    type="text"
                    value={formData.showWhenParentValue}
                    onChange={(e) => setFormData({ ...formData, showWhenParentValue: e.target.value })}
                    className="w-full border rounded px-3 py-2"
                    placeholder="true / false / optionId / ANY"
                    disabled={!formData.parentCostCodeId}
                    title="Condition to show this question"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use: true, false, optionId, or ANY</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nested Input Type</label>
                  <select
                    value={formData.nestedInputType}
                    onChange={(e) => setFormData({ ...formData, nestedInputType: e.target.value as any })}
                    className="w-full border rounded px-3 py-2"
                    disabled={!formData.parentCostCodeId}
                    title="Type of nested input"
                  >
                    <option value="NONE">None</option>
                    <option value="QUANTITY">Quantity Input</option>
                    <option value="DROPDOWN">Dropdown</option>
                    <option value="CUSTOM_PRICE">Custom Price</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">How user will interact with this nested question</p>
                </div>
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isIncludedInBase}
                  onChange={(e) => setFormData({ ...formData, isIncludedInBase: e.target.checked })}
                  className="mr-2"
                  title="Included in base"
                  aria-label="Included in base"
                />
                <label className="text-sm font-medium">Included in Base</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.requiresQuantity}
                  onChange={(e) => setFormData({ ...formData, requiresQuantity: e.target.checked })}
                  className="mr-2"
                  title="Requires quantity"
                  aria-label="Requires quantity"
                />
                <label className="text-sm font-medium">Requires Quantity</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isOptional}
                  onChange={(e) => setFormData({ ...formData, isOptional: e.target.checked })}
                  className="mr-2"
                  title="Optional"
                  aria-label="Optional"
                />
                <label className="text-sm font-medium">Optional</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                  title="Active status"
                  aria-label="Active status"
                />
                <label className="text-sm font-medium">Active</label>
              </div>
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

export default CostCodeModal;
