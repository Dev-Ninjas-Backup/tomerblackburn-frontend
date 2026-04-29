'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useProjectTypes, useDeleteProjectType, useCreateProjectType } from '@/hooks/useProjectManagement';
import ProjectTypeModal from '../_components/ProjectTypeModal';
import ImportExportButtons from '@/components/ImportExportButtons';
import { exportToCSV } from '@/lib/csv';
import { toast } from 'sonner';
import { usePermissions } from '@/hooks/usePermissions';

const ProjectTypesTab = () => {
  const { data: projectTypes, isLoading } = useProjectTypes();
  const deleteMutation = useDeleteProjectType();
  const createMutation = useCreateProjectType();
  const { projectManagementEdit, projectManagementDelete } = usePermissions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    if (!projectTypes?.length) return toast.error('No data to export');
    exportToCSV('project-types.csv', projectTypes.map((pt) => ({
      name: pt.name,
      description: pt.description ?? '',
      displayOrder: pt.displayOrder,
      isActive: pt.isActive,
    })));
  };

  const handleImport = async (rows: Record<string, string>[]) => {
    if (!rows.length) return toast.error('No valid rows found in CSV');
    setIsImporting(true);
    let success = 0, failed = 0;
    for (const row of rows) {
      try {
        await createMutation.mutateAsync({
          name: row.name,
          description: row.description || undefined,
          displayOrder: row.displayOrder ? Number(row.displayOrder) : 0,
          isActive: row.isActive === 'false' ? false : true,
        } as any);
        success++;
      } catch { failed++; }
    }
    setIsImporting(false);
    toast.success(`Imported ${success} project types${failed ? `, ${failed} failed` : ''}`);
  };

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
    if (confirm('Are you sure you want to delete this project type?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Project Types</h2>
        {projectManagementEdit && (
          <div className="flex items-center gap-2">
            <ImportExportButtons onExport={handleExport} onImport={handleImport} isImporting={isImporting} />
            <Button onClick={handleCreate} className="bg-[#2d4a8f] hover:bg-[#243a73]">
              <Plus size={18} className="mr-2" />
              Add Project Type
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Display Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projectTypes?.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.image?.url ? (
                    <img src={item.image.url} alt={item.name} className="h-12 w-12 object-cover rounded" />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No Image</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.description || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.displayOrder}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {projectManagementEdit && (
                    <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3" title="Edit project type" aria-label="Edit project type">
                      <Pencil size={16} />
                    </button>
                  )}
                  {projectManagementDelete && (
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="Delete project type" aria-label="Delete project type">
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProjectTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        data={selectedData}
      />
    </div>
  );
};

export default ProjectTypesTab;
