'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useServices, useDeleteService, useProjectTypes, useServiceCategoriesByProjectType, useCreateService } from '@/hooks/useProjectManagement';
import ServiceModal from '../_components/ServiceModal';
import ImportExportButtons from '@/components/ImportExportButtons';
import { exportToCSV } from '@/lib/csv';
import { toast } from 'sonner';

const ServicesTab = () => {
  const { data: services, isLoading } = useServices();
  const { data: projectTypes } = useProjectTypes();
  const deleteMutation = useDeleteService();
  const createMutation = useCreateService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [filterProjectType, setFilterProjectType] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [isImporting, setIsImporting] = useState(false);

  const { data: categories } = useServiceCategoriesByProjectType(filterProjectType);

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
    if (confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleExport = () => {
    const data = filterCategory
      ? services?.filter((s) => s.serviceCategoryId === filterCategory)
      : services;
    if (!data?.length) return toast.error('No data to export');
    exportToCSV('services.csv', data.map((s) => ({
      code: s.code,
      name: s.name,
      fullDescription: s.fullDescription ?? '',
      basePrice: s.basePrice,
      markup: s.markup ?? 0,
      clientPrice: s.clientPrice ?? 0,
      displayOrder: s.displayOrder,
      isActive: s.isActive,
      serviceCategoryName: s.serviceCategory?.name ?? '',
    })));
  };

  const handleImport = async (rows: Record<string, string>[]) => {
    if (!rows.length) return toast.error('No valid rows found in CSV');
    // Need all categories to match by name
    const { data: allCategories } = await import('@/services/service-category.service').then(
      async (m) => m.serviceCategoryService.getAll()
    ).then((res) => res.data);

    setIsImporting(true);
    let success = 0, failed = 0;
    for (const row of rows) {
      const cat = (allCategories as any[])?.find((c: any) => c.name === row.serviceCategoryName);
      if (!cat) { failed++; continue; }
      try {
        await createMutation.mutateAsync({
          data: {
            code: row.code,
            name: row.name,
            fullDescription: row.fullDescription || undefined,
            basePrice: Number(row.basePrice) || 0,
            displayOrder: Number(row.displayOrder) || 0,
            isActive: row.isActive === 'false' ? false : true,
            serviceCategoryId: cat.id,
          },
        });
        success++;
      } catch { failed++; }
    }
    setIsImporting(false);
    toast.success(`Imported ${success} services${failed ? `, ${failed} failed` : ''}`);
  };

  const filteredServices = filterCategory
    ? services?.filter((s) => s.serviceCategoryId === filterCategory)
    : services;

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Services</h2>
          <select
            value={filterProjectType}
            onChange={(e) => { setFilterProjectType(e.target.value); setFilterCategory(''); }}
            className="border rounded px-3 py-2 text-sm"
            title="Filter by project type"
            aria-label="Filter by project type"
          >
            <option value="">All Project Types</option>
            {projectTypes?.map((pt) => (
              <option key={pt.id} value={pt.id}>{pt.name}</option>
            ))}
          </select>
          {filterProjectType && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
              title="Filter by service category"
              aria-label="Filter by service category"
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ImportExportButtons onExport={handleExport} onImport={handleImport} isImporting={isImporting} />
          <Button onClick={handleCreate} className="bg-[#2d4a8f] hover:bg-[#243a73]">
            <Plus size={18} className="mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Display Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredServices?.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.imageFile ? (
                    <img src={item.imageFile.url} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No img</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.code}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.basePrice.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.displayOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3" title="Edit service" aria-label="Edit service">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="Delete service" aria-label="Delete service">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        data={selectedData}
      />
    </div>
  );
};

export default ServicesTab;
