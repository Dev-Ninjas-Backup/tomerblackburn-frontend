"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import {
  useCostCodeCategories,
  useDeleteCostCodeCategory,
  useCreateCostCodeCategory,
} from "@/hooks/useCostManagement";
import CostCodeCategoryModal from "../_components/CostCodeCategoryModal";
import ImportExportButtons from "@/components/ImportExportButtons";
import { exportToCSV } from "@/lib/csv";
import { toast } from "sonner";
import { usePermissions } from "@/hooks/usePermissions";

const CostCodeCategoriesTab = () => {
  const { data: categories, isLoading } = useCostCodeCategories();
  const deleteMutation = useDeleteCostCodeCategory();
  const createMutation = useCreateCostCodeCategory();
  const { costManagementEdit, costManagementDelete } = usePermissions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedData, setSelectedData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    if (!categories?.length) return toast.error('No data to export');
    exportToCSV('cost-code-categories.csv', categories.map((c) => ({
      name: c.name,
      slug: c.slug,
      description: c.description ?? '',
      stepNumber: c.stepNumber,
      displayOrder: c.displayOrder,
      isActive: c.isActive,
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
          slug: row.slug,
          description: row.description || undefined,
          stepNumber: row.stepNumber ? Number(row.stepNumber) : undefined,
          displayOrder: row.displayOrder ? Number(row.displayOrder) : 0,
          isActive: row.isActive === 'false' ? false : true,
        } as any);
        success++;
      } catch { failed++; }
    }
    setIsImporting(false);
    toast.success(`Imported ${success} categories${failed ? `, ${failed} failed` : ''}`);
  };

  const handleCreate = () => {
    setModalMode("create");
    setSelectedData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (data: any) => {
    setModalMode("edit");
    setSelectedData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const filteredCategories = categories?.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.slug.toLowerCase().includes(query) ||
      item.stepNumber.toString().includes(query)
    );
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <h2 className="text-xl font-semibold shrink-0">Cost Code Categories</h2>
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search by name, slug, or step number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        {costManagementEdit && (
          <div className="flex items-center gap-2 shrink-0">
            <ImportExportButtons onExport={handleExport} onImport={handleImport} isImporting={isImporting} />
            <Button onClick={handleCreate} className="bg-[#2d4a8f] hover:bg-[#243a73]">
              <Plus size={18} className="mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add Category</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Step Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Display Order
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              filteredCategories?.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Step {item.stepNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.displayOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {costManagementEdit && (
                      <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 mr-3" title="Edit category" aria-label="Edit category">
                        <Pencil size={16} />
                      </button>
                    )}
                    {costManagementDelete && (
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900" title="Delete category" aria-label="Delete category">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CostCodeCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        data={selectedData}
      />
    </div>
  );
};

export default CostCodeCategoriesTab;
