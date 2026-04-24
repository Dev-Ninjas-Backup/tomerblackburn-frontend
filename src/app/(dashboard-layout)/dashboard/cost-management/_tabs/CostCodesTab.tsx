"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Pencil,
  Trash2,
  Filter,
  X,
  ChevronUp,
  ChevronDown,
  Search,
} from "lucide-react";
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

type SortField =
  | "code"
  | "name"
  | "service"
  | "category"
  | "questionType"
  | "basePrice"
  | "step"
  | "status";
type SortOrder = "asc" | "desc";

const CostCodesTab = () => {
  const { data: categories } = useCostCodeCategories();
  const { data: services } = useServices();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<CostCodeFilters>({});

  // Pagination & Sorting states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortField, setSortField] = useState<SortField>("code");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Sort and paginate logic
  const { paginatedTreeRows, totalPages, totalParents } = useMemo(() => {
    if (!costCodes)
      return { paginatedTreeRows: [], totalPages: 0, totalParents: 0 };

    // Search filter: match against code, name, elies, service, category
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = (c: any) => {
      if (!query) return true;
      return (
        c.code?.toLowerCase().includes(query) ||
        c.name?.toLowerCase().includes(query) ||
        c.elies?.toLowerCase().includes(query) ||
        c.service?.name?.toLowerCase().includes(query) ||
        c.category?.name?.toLowerCase().includes(query)
      );
    };

    // When searching: show any matching item (parent or child) regardless of tree
    // When not searching: show only parents and paginate them
    let parents: any[];
    if (query) {
      // Collect parents that match OR have children that match
      const matchingIds = new Set(
        costCodes.filter(matchesSearch).map((c) => c.id),
      );
      // Walk up to find root parents of matching items
      const getRootParent = (c: any): any => {
        if (!c.parentCostCodeId) return c;
        const parent = costCodes.find((p) => p.id === c.parentCostCodeId);
        return parent ? getRootParent(parent) : c;
      };
      const rootParentIds = new Set(
        costCodes.filter(matchesSearch).map((c) => getRootParent(c).id),
      );
      parents = costCodes.filter(
        (c) => !c.parentCostCodeId && rootParentIds.has(c.id),
      );
    } else {
      parents = costCodes.filter((c) => !c.parentCostCodeId);
    }

    // Sort parents
    const sortedParents = [...parents].sort((a, b) => {
      let aVal: any, bVal: any;

      switch (sortField) {
        case "code":
          aVal = a.code;
          bVal = b.code;
          break;
        case "name":
          aVal = a.name;
          bVal = b.name;
          break;
        case "service":
          aVal = a.service?.name || "";
          bVal = b.service?.name || "";
          break;
        case "category":
          aVal = a.category?.name || "";
          bVal = b.category?.name || "";
          break;
        case "questionType":
          aVal = a.questionType;
          bVal = b.questionType;
          break;
        case "basePrice":
          aVal = a.basePrice;
          bVal = b.basePrice;
          break;
        case "step":
          aVal = a.step;
          bVal = b.step;
          break;
        case "status":
          aVal = a.isActive ? 1 : 0;
          bVal = b.isActive ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (typeof aVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    // Calculate pagination for parents only
    const totalParentsCount = sortedParents.length;
    const totalPagesCount =
      pageSize === -1 ? 1 : Math.ceil(totalParentsCount / pageSize);
    const startIdx = pageSize === -1 ? 0 : (currentPage - 1) * pageSize;
    const endIdx = pageSize === -1 ? totalParentsCount : startIdx + pageSize;
    const paginatedParents = sortedParents.slice(startIdx, endIdx);

    // Build tree with paginated parents and all their children
    const result: { item: any; depth: number }[] = [];

    const addWithChildren = (parentId: string, depth: number) => {
      const children = costCodes.filter((c) => c.parentCostCodeId === parentId);
      children.forEach((child) => {
        result.push({ item: child, depth });
        addWithChildren(child.id, depth + 1);
      });
    };

    paginatedParents.forEach((parent) => {
      result.push({ item: parent, depth: 0 });
      addWithChildren(parent.id, 1);
    });

    return {
      paginatedTreeRows: result,
      totalPages: totalPagesCount,
      totalParents: totalParentsCount,
    };
  }, [costCodes, currentPage, pageSize, sortField, sortOrder, searchQuery]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ChevronUp size={14} className="opacity-30" />;
    return sortOrder === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold shrink-0">Cost Codes</h2>

        {/* Search - full width */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search code, name, service..."
            className="w-full pl-9 pr-8 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter button + clear */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                {activeFilterCount}
              </span>
            )}
          </Button>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="text-gray-500 px-2"
            >
              <X size={16} />
            </Button>
          )}
          <Button
            onClick={handleCreate}
            className="bg-[#2d4a8f] hover:bg-[#243a73]"
          >
            <Plus size={18} className="mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Add Cost Code</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white shadow rounded-lg p-4 mb-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("code")}
              >
                <div className="flex items-center gap-1">
                  Code
                  <SortIcon field="code" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Name
                  <SortIcon field="name" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("service")}
              >
                <div className="flex items-center gap-1">
                  Service
                  <SortIcon field="service" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-1">
                  Category
                  <SortIcon field="category" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("questionType")}
              >
                <div className="flex items-center gap-1">
                  Question Type
                  <SortIcon field="questionType" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("basePrice")}
              >
                <div className="flex items-center gap-1">
                  Base Price
                  <SortIcon field="basePrice" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("step")}
              >
                <div className="flex items-center gap-1">
                  Step
                  <SortIcon field="step" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  <SortIcon field="status" />
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTreeRows.map(({ item, depth }) => (
              <tr key={item.id} className={depth > 0 ? "bg-gray-50" : ""}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <span style={{ paddingLeft: `${depth * 24}px` }}>
                    {item.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {depth > 0 && (
                    <span className="text-gray-400 mr-1">
                      {"↳".repeat(depth)}
                    </span>
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
                      depth > 0
                        ? "bg-purple-100 text-purple-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {depth > 0 ? `Child (L${depth})` : "Parent"}
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

      {/* Pagination Controls */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-4 sm:px-6 py-4 rounded-lg shadow">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-700">
            Showing{" "}
            {pageSize === -1
              ? totalParents
              : Math.min((currentPage - 1) * pageSize + 1, totalParents)}{" "}
            –{" "}
            {pageSize === -1
              ? totalParents
              : Math.min(currentPage * pageSize, totalParents)}{" "}
            of {totalParents}
          </span>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-700">Show:</label>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
              aria-label="Select page size"
              title="Select page size"
            >
              <option value={-1}>All</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {pageSize !== -1 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Prev
            </Button>
            <span className="text-sm text-gray-700 px-2">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        )}
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
