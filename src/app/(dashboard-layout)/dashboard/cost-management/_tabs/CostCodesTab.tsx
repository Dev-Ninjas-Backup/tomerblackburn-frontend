"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Filter, X } from "lucide-react";
import {
  useCostCodes,
  useDeleteCostCode,
  useCostCodeCategories,
} from "@/hooks/useCostManagement";
import { useServices } from "@/hooks/useProjectManagement";
import CostCodeModal from "../_components/CostCodeModal";
import { QuestionType, UnitType } from "@/types/cost-management.types";

const QUESTION_TYPE_COLORS: Record<QuestionType, string> = {
  WHITE: "bg-gray-100 text-gray-800",
  BLUE: "bg-blue-100 text-blue-800",
  GREEN: "bg-green-100 text-green-800",
  ORANGE: "bg-orange-100 text-orange-800",
  YELLOW: "bg-yellow-100 text-yellow-800",
  RED: "bg-red-100 text-red-800",
  PURPLE: "bg-purple-100 text-purple-800",
};

interface CostCodeFilters {
  categoryId?: string;
  serviceId?: string;
  questionType?: QuestionType;
  unitType?: UnitType;
  isActive?: boolean;
  isIncludedInBase?: boolean;
}

const CostCodesTab = () => {
  const { data: categories } = useCostCodeCategories();
  const { data: services } = useServices();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<CostCodeFilters>({});

  const { data: costCodes, isLoading } = useCostCodes(filters);
  const deleteMutation = useDeleteCostCode();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedData, setSelectedData] = useState<any>(null);

  const handleFilterChange = (key: keyof CostCodeFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined,
  ).length;

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
    if (confirm("Are you sure you want to delete this cost code?")) {
      deleteMutation.mutate(id);
    }
  };

  // Build tree: parents first, then their children nested under them
  const buildTree = () => {
    if (!costCodes) return [];
    const parents = costCodes.filter((c) => !c.parentCostCodeId);
    const result: { item: any; isChild: boolean }[] = [];
    parents.forEach((parent) => {
      result.push({ item: parent, isChild: false });
      costCodes
        .filter((c) => c.parentCostCodeId === parent.id)
        .forEach((child) => result.push({ item: child, isChild: true }));
    });
    // Also add any children whose parent isn't in current list
    costCodes
      .filter(
        (c) =>
          c.parentCostCodeId &&
          !costCodes.find((p) => p.id === c.parentCostCodeId),
      )
      .forEach((c) => result.push({ item: c, isChild: true }));
    return result;
  };

  const treeRows = buildTree();

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Cost Codes</h2>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                {activeFilterCount}
              </span>
            )}
          </Button>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-gray-500"
            >
              <X size={16} className="mr-1" />
              Clear
            </Button>
          )}
        </div>
        <Button
          onClick={handleCreate}
          className="bg-[#2d4a8f] hover:bg-[#243a73]"
        >
          <Plus size={18} className="mr-2" />
          Add Cost Code
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={filters.categoryId || ""}
              onChange={(e) => handleFilterChange("categoryId", e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              aria-label="Filter by category"
              title="Filter by category"
            >
              <option value="">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Service</label>
            <select
              value={filters.serviceId || ""}
              onChange={(e) => handleFilterChange("serviceId", e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              aria-label="Filter by service"
              title="Filter by service"
            >
              <option value="">All Services</option>
              {services?.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {svc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Question Type
            </label>
            <select
              value={filters.questionType || ""}
              onChange={(e) =>
                handleFilterChange("questionType", e.target.value)
              }
              className="w-full border rounded px-3 py-2 text-sm"
              aria-label="Filter by question type"
              title="Filter by question type"
            >
              <option value="">All Types</option>
              <option value="WHITE">WHITE</option>
              <option value="BLUE">BLUE</option>
              <option value="GREEN">GREEN</option>
              <option value="ORANGE">ORANGE</option>
              <option value="PURPLE">PURPLE</option>
              <option value="YELLOW">YELLOW</option>
              <option value="RED">RED</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit Type</label>
            <select
              value={filters.unitType || ""}
              onChange={(e) => handleFilterChange("unitType", e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm"
              aria-label="Filter by unit type"
              title="Filter by unit type"
            >
              <option value="">All Units</option>
              <option value="FIXED">Fixed</option>
              <option value="PER_SQFT">Per Sq Ft</option>
              <option value="PER_EACH">Per Each</option>
              <option value="PER_LOT">Per Lot</option>
              <option value="PER_SET">Per Set</option>
              <option value="PER_UPGRADE">Per Upgrade</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={
                filters.isActive === undefined
                  ? ""
                  : filters.isActive.toString()
              }
              onChange={(e) =>
                handleFilterChange(
                  "isActive",
                  e.target.value === "" ? undefined : e.target.value === "true",
                )
              }
              className="w-full border rounded px-3 py-2 text-sm"
              aria-label="Filter by status"
              title="Filter by status"
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Base Price</label>
            <select
              value={
                filters.isIncludedInBase === undefined
                  ? ""
                  : filters.isIncludedInBase.toString()
              }
              onChange={(e) =>
                handleFilterChange(
                  "isIncludedInBase",
                  e.target.value === "" ? undefined : e.target.value === "true",
                )
              }
              className="w-full border rounded px-3 py-2 text-sm"
              aria-label="Filter by base price inclusion"
              title="Filter by base price inclusion"
            >
              <option value="">All</option>
              <option value="true">Included in Base</option>
              <option value="false">Not in Base</option>
            </select>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Question Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Base Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Step
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
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
            {treeRows.map(({ item, isChild }) => (
              <tr key={item.id} className={isChild ? "bg-gray-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span className={isChild ? "pl-6" : ""}>{item.code}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {isChild && (
                    <span className="text-gray-400 mr-1">↳</span>
                  )}
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.service?.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.category?.name || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${QUESTION_TYPE_COLORS[item.questionType as QuestionType]}`}
                  >
                    {item.questionType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.basePrice.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Step {item.step}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isChild
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {isChild ? "Child" : "Parent"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${item.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                    title="Edit cost code"
                    aria-label="Edit cost code"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-900"
                    title="Delete cost code"
                    aria-label="Delete cost code"
                  >
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
